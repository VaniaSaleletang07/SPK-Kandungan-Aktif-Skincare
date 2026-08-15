"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: "jenis_kulit",
    title: "Apa jenis kulit wajah Anda secara umum?",
    description: "Pilih kondisi yang paling sering Anda alami setiap harinya.",
    options: [
      { id: "normal", label: "Normal", desc: "Seimbang, tidak terlalu kering/berminyak" },
      { id: "kering", label: "Kering", desc: "Sering terasa ketarik atau bersisik" },
      { id: "berminyak", label: "Berminyak", desc: "Mengkilap, terutama di area T-zone" },
      { id: "kombinasi", label: "Kombinasi", desc: "Berminyak di T-zone, kering di pipi" }
    ]
  },
  {
    id: "sensitivitas",
    title: "Bagaimana tingkat sensitivitas kulit Anda?",
    description: "Seberapa mudah kulit Anda bereaksi terhadap produk baru?",
    options: [
      { id: "rendah", label: "Rendah (Tangguh)", desc: "Jarang iritasi saat mencoba produk baru" },
      { id: "sedang", label: "Sedang", desc: "Kadang merah atau gatal jika produk tidak cocok" },
      { id: "tinggi", label: "Tinggi (Sangat Sensitif)", desc: "Sangat mudah merah, panas, atau *breakout*" }
    ]
  },
  {
    id: "keparahan_jerawat",
    title: "Bagaimana kondisi jerawat Anda saat ini?",
    description: "Pilih yang paling menggambarkan kondisi jerawat Anda.",
    options: [
      { id: "ringan", label: "Ringan", desc: "Hanya komedo atau beruntusan kecil" },
      { id: "sedang", label: "Sedang", desc: "Beberapa jerawat merah (papula/pustula)" },
      { id: "parah", label: "Parah", desc: "Banyak jerawat merah meradang / jerawat batu" }
    ]
  },
  {
    id: "skin_barrier",
    title: "Bagaimana kondisi Skin Barrier Anda?",
    description: "Kondisi lapisan pelindung kulit saat ini.",
    options: [
      { id: "sehat", label: "Sehat", desc: "Kulit terasa kenyal dan tidak ada keluhan" },
      { id: "terganggu_ringan", label: "Terganggu Ringan", desc: "Kadang terasa kering atau sedikit kusam" },
      { id: "rusak", label: "Rusak", desc: "Sering mengelupas, perih saat cuci muka, kemerahan" }
    ]
  }
];

export default function KonsultasiPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: optionId });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Selesai, mulai proses analisis
      setIsAnalyzing(true);
      
      // Simulasi loading analisa ke backend
      setTimeout(() => {
        // Disini harusnya POST ke /api/recommendation
        // Untuk mock UI, langsung redirect
        router.push("/hasil");
      }, 2500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const hasAnsweredCurrent = !!answers[currentQuestion.id];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden py-12 px-4">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2 font-medium">
            <span>Langkah {currentStep + 1} dari {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-soft"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{currentQuestion.title}</h2>
              <p className="text-gray-500 mb-8 font-medium">{currentQuestion.description}</p>

              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`flex items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      answers[currentQuestion.id] === option.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-gray-100 hover:border-primary/30 hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <div className="flex-1">
                      <div className={`font-bold ${answers[currentQuestion.id] === option.id ? 'text-primary' : 'text-gray-900'}`}>{option.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
                    </div>
                    {answers[currentQuestion.id] === option.id && (
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 ml-4" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <Button 
                  variant="ghost" 
                  onClick={handlePrev} 
                  disabled={currentStep === 0}
                  className="px-6 text-gray-500 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  disabled={!hasAnsweredCurrent}
                  className="px-8 rounded-full shadow-glow"
                >
                  {currentStep === questions.length - 1 ? "Analisis Sekarang" : "Selanjutnya"} 
                  {currentStep !== questions.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-3xl border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center h-[500px]"
            >
              <div className="relative mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-gray-100 border-t-primary rounded-full"
                />
                <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Menganalisis Kondisi Kulit...</h2>
              <p className="text-gray-500 max-w-sm">
                Sistem SMART sedang menghitung kecocokan kandungan aktif terbaik berdasarkan profil kulit Anda.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
