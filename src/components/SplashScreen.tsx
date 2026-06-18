import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Flame, Award } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('جاري بدء تشغيل المعرض...');

  useEffect(() => {
    // Elegant progressing texts in Arabic
    const textIntervals = [
      { percentage: 15, text: 'جاري تحميل الأجنحة الرقمية للمطابخ...' },
      { percentage: 40, text: 'تكامل بروتوكول قواعد بيانات Google Sheets...' },
      { percentage: 65, text: 'تحميل العناصر التفاعلية والصور...' },
      { percentage: 85, text: 'تهيئة قاعات العرض وتأمين الخوادم...' },
      { percentage: 100, text: 'أهلاً بك في معرض المطابخ الحديثة 2026 ✨' }
    ];

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.floor(Math.random() * 4) + 2;
        
        // Find matching text based on current percentage
        const matchingText = textIntervals.find(item => nextProgress <= item.percentage);
        if (matchingText) {
          setLoadingText(matchingText.text);
        }

        if (nextProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600); // Small delay to let user enjoy the 100% complete state
          return 100;
        }
        return nextProgress;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div id="splash-screen" className="fixed inset-0 z-[9999] bg-[#030b1a] flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Absolute Ambient Glow FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5E3C]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[100px]" />
        
        {/* Animated Blueprint Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8B5E3C_1px,transparent_1px),linear-gradient(to_bottom,#8B5E3C_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Floating Sparkles inside splash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] text-[#8B5E3C]/30 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-[35%] right-[20%] text-[#8B5E3C]/20 animate-bounce">
          <Award className="w-6 h-6" />
        </div>
        <div className="absolute bottom-[25%] left-[25%] text-[#8B5E3C]/20">
          <ShieldCheck className="w-5 h-5 animate-pulse" />
        </div>
        <div className="absolute bottom-[30%] right-[15%] text-[#8B5E3C]/30">
          <Flame className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* main Container */}
      <div className="relative text-center max-w-md px-6 flex flex-col items-center">
        
        {/* Animated Logo Container with Golden Pulse Rings */}
        <div className="relative mb-8">
          {/* Pulsing Outer Radiance */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5E3C] to-amber-500 rounded-[35px] blur-xl opacity-30 animate-pulse" />
          
          {/* Rotating borders */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#8B5E3C] via-transparent to-[#8B5E3C] rounded-[32px] animate-spin" style={{ animationDuration: '6s' }} />

          {/* Core EM Logo container */}
          <div className="relative w-28 h-28 bg-[#040e24] rounded-[30px] border-2 border-[#8B5E3C] flex flex-col items-center justify-center shadow-2xl">
            <span className="text-[#8B5E3C] font-serif text-5xl font-black italic tracking-wider leading-none select-none">
              EM
            </span>
            <div className="absolute bottom-3 text-[8px] tracking-[0.25em] text-slate-400 font-bold uppercase mr-[-0.25em]">
              Expo Masr
            </div>
          </div>
        </div>

        {/* Title & Brand Slogan */}
        <div className="space-y-2 mb-12">
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white via-slate-100 to-amber-200 tracking-tight">
            معرض المطابخ الحديثة 2026
          </h1>
          <p className="text-xs sm:text-sm text-[#8B5E3C] font-medium tracking-wide">
            المنصة الافتراضية والمعرض الرقمي الأكبر بمصر والخليج
          </p>
        </div>

        {/* Customized Progress Bar Panel */}
        <div className="w-72 sm:w-80 bg-brand-blue-dark/50 backdrop-blur rounded-2xl p-4 border border-[#8B5E3C]/15 shadow-2xl relative">
          
          {/* Progress Percent Counter */}
          <div className="flex items-center justify-between mb-2 text-xs font-bold font-mono">
            <span className="text-[#8B5E3C]">{progress}%</span>
            <span className="text-slate-400 font-sans">تجهيز الفعاليات</span>
          </div>

          {/* Outer bar */}
          <div className="h-2 w-full bg-[#05142e] rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#8B5E3C] via-amber-500 to-[#8B5E3C] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(212,175,55,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Loaded Description Texts with fade-in-out */}
          <div className="mt-3.5 h-4 flex items-center justify-center">
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium animate-pulse text-center">
              {loadingText}
            </p>
          </div>
        </div>

        {/* Bottom micro-copy */}
        <div className="absolute bottom-[-150px] whitespace-nowrap text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold select-none flex items-center gap-2">
          <span>Virtual Digital Presence</span>
          <span className="text-[#8B5E3C]">•</span>
          <span>Next-Gen Architecture</span>
        </div>

      </div>
    </div>
  );
}
