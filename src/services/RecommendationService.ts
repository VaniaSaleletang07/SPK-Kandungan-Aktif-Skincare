import prisma from '@/lib/prisma';
import { SmartCalculator, SmartAlternativeValue, SmartCriteria } from './smart/SmartCalculator';

export class RecommendationService {
  private calculator: SmartCalculator;

  constructor() {
    this.calculator = new SmartCalculator();
  }

  /**
   * Mendapatkan rekomendasi berdasarkan metode SMART
   * Menyimpan snapshot ke database
   * @param userId Optional userId if logged in
   * @returns Hasil ranking rekomendasi
   */
  public async getRecommendations(userId?: string) {
    // 1. Ambil data kriteria dan bobotnya dari DB
    const criteriaData = await prisma.criteria.findMany();
    const smartCriteria: SmartCriteria[] = criteriaData.map(c => ({
      id: c.id,
      weight: c.weight,
      type: c.type,
    }));

    // 2. Ambil seluruh data alternatif (kandungan aktif) beserta nilai kecocokannya
    const alternativesData = await prisma.alternative.findMany({
      include: {
        suitabilityValues: true
      }
    });

    const smartAlternatives: SmartAlternativeValue[] = alternativesData.map(alt => {
      const values: Record<string, number> = {};
      alt.suitabilityValues.forEach(sv => {
        values[sv.criteriaId] = sv.value;
      });
      return {
        alternativeId: alt.id,
        values,
      };
    });

    // 3. Lakukan Perhitungan SMART
    const results = this.calculator.calculate(smartCriteria, smartAlternatives);

    // 4. Siapkan Data untuk Dikembalikan (Gabungkan dengan detail Alternatif)
    const detailedResults = results.map(res => {
      const alternativeDetails = alternativesData.find(a => a.id === res.alternativeId);
      return {
        ...res,
        alternativeName: alternativeDetails?.name || 'Unknown',
        description: alternativeDetails?.description,
        reference: alternativeDetails?.reference,
      };
    });

    // 5. Simpan ke Riwayat (Consultation & Snapshot)
    const consultation = await prisma.consultation.create({
      data: {
        userId: userId || null,
        snapshot: {
          create: {
            criteriaData: smartCriteria.map(({ id, weight, type }) => ({ id, weight, type })),
            alternativeData: smartAlternatives.map(({ alternativeId, values }) => ({
              alternativeId,
              values,
            })),
            score: results.map(({ alternativeId, score, rank }) => ({ alternativeId, score, rank })),
            rank: detailedResults.map((result) => ({
              ...result,
              description: result.description ?? null,
              reference: result.reference ?? null,
            })),
          }
        }
      },
      include: {
        snapshot: true,
      }
    });

    return {
      consultationId: consultation.id,
      results: detailedResults,
    };
  }

  /**
   * Mengambil riwayat konsultasi berdasarkan ID snapshot
   */
  public async getConsultationHistory(consultationId: string) {
    return prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { snapshot: true },
    });
  }
}
