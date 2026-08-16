"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FlaskConical, ShoppingBag, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data untuk Hasil Analisis SMART
const mockResults = [
  {
    id: "salicylic-acid",
    rank: 1,
    name: "Salicylic Acid (BHA)",
    score: 0.85,
    description: "Sangat efektif untuk mengeksfoliasi hingga ke dalam pori-pori dan mengurangi produksi sebum berlebih. Cocok untuk jerawat komedonal dan kulit berminyak.",
    reference: "Berdasar studi literatur, BHA adalah standar emas untuk eksfoliasi kulit berminyak tanpa merusak skin barrier sehat."
  },
  {
    id: "niacinamide",
    rank: 2,
    name: "Niacinamide 5%",
    score: 0.72,
    description: "Membantu meredakan inflamasi jerawat dan memperkuat skin barrier sekaligus memudarkan bekas jerawat kemerahan (PIE).",
    reference: "Jurnal Dermatologi merekomendasikan konsentrasi 2-5% untuk mengurangi produksi sebum dan inflamasi secara aman."
  },
  {
    id: "centella",
    rank: 3,
    name: "Centella Asiatica",
    score: 0.64,
    description: "Menghidrasi dan menenangkan kulit yang meradang akibat jerawat. Sangat aman bagi kulit sensitif.",
    reference: "Dikenal memiliki sifat anti-inflamasi dan wound healing yang kuat."
  }
];

// Mock Data untuk Produk Rekomendasi
const mockProducts = [
  {
    id: "prod-1",
    name: "Skintific 2% Salicylic Acid Anti Acne Serum",
    brand: "Skintific",
    price: "Rp 129.000",
    tags: ["Salicylic Acid", "Centella", "Ceramide"],
    url: "#"
  },
  {
    id: "prod-2",
    name: "Avoskin Your Skin Bae Salicylic Acid 2% + Zinc",
    brand: "Avoskin",
    price: "Rp 139.000",
    tags: ["Salicylic Acid", "Zinc"],
    url: "#"
  },
  {
    id: "prod-3",
    name: "Somethinc 5% Niacinamide + Moisture Sabi Beet",
    brand: "Somethinc",
    price: "Rp 115.000",
    tags: ["Niacinamide", "Beet Extract"],
    url: "#"
  }
];

export default function HasilPage() {
  const topRecommendation = mockResults[0];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="w-full bg-white pt-32 pb-16 px-4 flex flex-col items-center text-center border-b border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm z-10"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight z-10"
        >
          Analisis Selesai
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-lg text-lg z-10"
        >
          Berdasarkan perhitungan metode SMART dengan mempertimbangkan kondisi kulit Anda, berikut adalah rekomendasi ilmiah terbaik.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        
        {/* Left Column: Rekomendasi Kandungan */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FlaskConical className="w-6 h-6" />
            </div> 
            Kandungan Aktif Pilihan
          </h2>

          {/* Top 1 Recommendation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 relative overflow-hidden shadow-soft"
          >
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-5 py-2 rounded-bl-2xl flex items-center gap-1 shadow-md">
              <Star className="w-4 h-4 fill-current" /> Rekomendasi Utama
            </div>
            
            <div className="flex items-end justify-between mb-6 mt-4">
              <div>
                <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">Peringkat 1 • Skor: {topRecommendation.score}</p>
                <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{topRecommendation.name}</h3>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              {topRecommendation.description}
            </p>
            
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex gap-4 items-start">
              <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Referensi Ilmiah</p>
                <p className="text-sm text-gray-500 italic leading-relaxed">{topRecommendation.reference}</p>
              </div>
            </div>
          </motion.div>

          {/* Other Recommendations */}
          <h3 className="text-xl font-bold text-gray-900 mt-4">Alternatif Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResults.slice(1).map((res, idx) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 1) * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-soft hover:border-primary/30 transition-all cursor-default"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg text-gray-900">{res.name}</h4>
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Rank {res.rank}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{res.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Rekomendasi Produk */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-4">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <ShoppingBag className="w-6 h-6" />
            </div> 
            Produk Terkait
          </h2>

          <div className="flex flex-col gap-5">
            {mockProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-soft transition-all group flex flex-col"
              >
                <p className="text-xs text-primary mb-2 uppercase tracking-widest font-extrabold">{product.brand}</p>
                <h4 className="font-bold text-lg text-gray-900 leading-tight mb-4 group-hover:text-primary transition-colors">{product.name}</h4>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-bold px-2 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="font-extrabold text-xl text-gray-900">{product.price}</span>
                  <Button size="sm" className="rounded-full shadow-glow font-bold px-4">
                    Beli <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-20">
        <Button variant="ghost" className="rounded-full text-gray-500 hover:text-gray-900 font-bold px-6" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
