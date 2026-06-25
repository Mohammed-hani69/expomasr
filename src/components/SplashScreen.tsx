import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 5) + 2;
        if (next >= 30 && phase === 0) setPhase(1);
        if (next >= 65 && phase === 1) setPhase(2);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030b1a] flex flex-col items-center justify-center overflow-hidden select-none">

      {/* Gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.06) 0%, transparent 70%)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(to right, #C49A6C 1px, transparent 1px), linear-gradient(to bottom, #C49A6C 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      <div className="relative text-center max-w-sm px-6 flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[#C49A6C]/25 shadow-2xl shadow-black/50 bg-[#040e24] flex items-center justify-center">
              <img src="/assets/images/logo.png" alt="اكسبو مصر" className="w-full h-full object-contain p-2.5" />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-3xl border border-[#C49A6C]/10"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 mb-10"
        >
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            اكسبو مصر
          </h1>
          <p className="text-xs text-[#C49A6C]/60 font-medium">
            المنصة الرقمية الأولى لتسويق المطابخ الفاخرة
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-56 sm:w-64"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#C49A6C] font-mono">{progress}%</span>
            <span className="text-[10px] text-slate-600 font-medium">تجهيز المنصة</span>
          </div>
          <div className="h-[3px] w-full bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: 'linear-gradient(to left, #C49A6C, #8B5E3C)' }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-[9px] text-slate-700 mt-3 text-center">
            {phase === 0 && 'جاري تحميل الأجنحة الرقمية...'}
            {phase === 1 && 'تجهيز الحملات التسويقية...'}
            {phase === 2 && 'تهيئة منصة التواصل مع العملاء...'}
          </p>
        </motion.div>

      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-8 text-[7px] tracking-[0.35em] text-slate-700 font-bold select-none"
      >
        WWW.EXPOMASR.ONLINE
      </motion.div>
    </div>
  );
}
