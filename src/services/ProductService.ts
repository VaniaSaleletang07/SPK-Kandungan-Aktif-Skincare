import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class ProductService {
  /**
   * Mengambil daftar produk berdasarkan ID kandungan aktif (Alternative)
   * dan mereturn produk yang difilter dengan rentang harga jika diberikan.
   *
   * @param alternativeId ID dari kandungan aktif (Alternatif)
   * @param minPrice Batas harga minimum (opsional)
   * @param maxPrice Batas harga maksimum (opsional)
   */
  public async getProductsByActiveIngredient(
    alternativeId: string,
    minPrice?: number,
    maxPrice?: number
  ) {
    const whereClause: Prisma.ProductWhereInput = {
      activeIngredients: {
        some: {
          alternativeId: alternativeId,
        },
      },
    };

    // Tambahkan filter harga jika diberikan
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        price: 'asc', // Urutkan dari termurah
      },
      include: {
        activeIngredients: {
          include: {
            alternative: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });

    return products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      url: p.url,
      imageUrl: p.imageUrl,
      activeIngredients: p.activeIngredients.map(ai => ai.alternative.name),
    }));
  }
}
