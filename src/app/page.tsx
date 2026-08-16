"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Activity, FileCheck, Stethoscope, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F8F9FA] relative font-sans overflow-x-hidden pt-24 px-4 pb-20">
      
      {/* Hero Section (Card-like layout as in reference) */}
      <section className="w-full max-w-[1400px] mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-stretch gap-8 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-between z-10 py-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-[5.5rem] font-medium tracking-tighter text-[#1A1A1A] leading-[1.05] mb-6"
            >
              SmartCare <br/>
              Clinic
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-500 max-w-md mb-12 font-medium leading-relaxed"
            >
              Kami menganalisis secara presisi kondisi kulit <br/> 
              dan tingkat jerawat untuk rekomendasi terbaik.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/konsultasi" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-glow"
              >
                Mulai Konsultasi <User className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Bottom Left Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 flex items-center gap-12"
          >
            <div>
              <div className="text-3xl font-medium text-primary mb-1">98%</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Akurasi</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-primary mb-1">100%</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Berbasis Sains</div>
            </div>
          </motion.div>
        </div>

        {/* Right Image Content */}
        <div className="flex-1 relative min-h-[500px] md:min-h-0 bg-primary/5 rounded-[2rem] overflow-hidden flex items-end justify-center">
          <Image 
            src="/hero.png" 
            alt="Doctor" 
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
            className="z-0"
            priority
          />
          
          {/* Blue Overlay Gradient like reference */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-multiply" />

          {/* Floating Badges simulating the reference */}
          <div className="absolute top-1/4 -left-6 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Reliability
          </div>
          
          <div className="absolute top-1/2 -right-6 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft text-gray-700 flex items-center gap-2">
            Experience
          </div>

          <div className="absolute bottom-1/4 left-1/4 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft text-gray-700 flex items-center gap-2">
            Professional <Play className="w-3 h-3 text-primary ml-1" />
          </div>

          {/* Top Right Card overlay */}
          <div className="absolute top-8 right-8 text-white max-w-[200px] text-right drop-shadow-md">
            <h3 className="font-semibold text-xl mb-1 leading-tight">With Advanced<br/>Technologies</h3>
            <p className="text-xs text-white/80 leading-relaxed">The latest generation analysis, digital diagnostics for your skin health.</p>
          </div>
        </div>

      </section>

      {/* Middle Banner text */}
      <section className="w-full max-w-[1000px] mx-auto text-center py-24 px-4">
        <h2 className="text-3xl md:text-5xl font-medium text-[#1A1A1A] leading-[1.3] tracking-tight">
          Kami memadukan algoritma inovatif dengan analisis <span className="text-primary font-serif italic">SMART</span> untuk membuat setiap rekomendasi akurat dan aman.
        </h2>
        <p className="text-gray-500 mt-6 max-w-lg mx-auto">
          Sistem pakar kami adalah ruang terpercaya, berbasis obat medis dan perawatan yang didasarkan pada perhitungan empiris.
        </p>
      </section>

      {/* Medical Services (Features) Grid matching the reference */}
      <section className="w-full max-w-[1400px] mx-auto px-4 mb-20">
        <div className="flex justify-between items-end mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A1A]">Layanan Analisis <span className="text-gray-400 text-lg ml-2">[apa yang Anda dapatkan]</span></h2>
          <a href="#" className="text-primary text-sm font-semibold hover:underline hidden md:block">Lihat semua</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Main big blue card */}
          <div className="md:col-span-2 bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[40px] pointer-events-none" />
            <div>
              <div className="text-[100px] font-medium leading-none text-white/20 mb-2">01</div>
              <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2"><Stethoscope className="w-6 h-6" /> Konsultasi Personalisasi</h3>
              <p className="text-white/80 text-sm max-w-sm">Komprehensif mendiagnosis tingkat keparahan jerawat dan sensitivitas kulit Anda.</p>
            </div>
            <div className="flex justify-between items-end mt-12">
              <Link href="/konsultasi" className="text-sm font-semibold underline underline-offset-4 hover:text-white/80">Mulai Analisis</Link>
              <span className="text-xs uppercase tracking-widest font-bold">Gratis</span>
            </div>
          </div>

          {/* Standard white cards */}
          {[
            { num: "02", icon: <Activity className="w-5 h-5"/>, title: "Deteksi Barrier", desc: "Menganalisis kerusakan skin barrier secara mendalam." },
            { num: "03", icon: <FileCheck className="w-5 h-5"/>, title: "Kandungan Aktif", desc: "Pemilihan active ingredients yang diuji klinis." },
            { num: "04", icon: <User className="w-5 h-5"/>, title: "Rekomendasi Nyata", desc: "Mendapatkan produk riil di pasaran yang sesuai." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-soft flex flex-col justify-between min-h-[300px] group hover:border-primary/20 transition-all">
              <div>
                <div className="text-[80px] font-medium leading-none text-gray-100 mb-4 group-hover:text-primary/10 transition-colors">{item.num}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A] flex items-center gap-2">{item.icon} {item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
              <div className="flex justify-between items-end mt-12">
                <span className="text-sm text-primary font-semibold hover:underline cursor-pointer">Pelajari</span>
              </div>
            </div>
          ))}
          
        </div>
      </section>
    </div>
  );
}
