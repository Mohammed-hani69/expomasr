import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Set target date for the digital exhibition (e.g. June 28, 2026)
  const targetDate = new Date('2026-06-28T10:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 15,
    minutes: 42,
    seconds: 30,
    isEnded: false
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isEnded: false });
      }
    };

    // Run once initially to prevent delay
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'يوم', subtext: 'Days' },
    { value: timeLeft.hours, label: 'ساعة', subtext: 'Hours' },
    { value: timeLeft.minutes, label: 'دقيقة', subtext: 'Minutes' },
    { value: timeLeft.seconds, label: 'ثانية', subtext: 'Seconds' }
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl xs:rounded-3xl bg-[#d4af37] text-[#030b1a] p-4 xs:p-6 md:p-8 shadow-2xl max-w-3xl mx-auto border border-white/20">
      {/* Visual background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#030b1a]/10 border border-[#030b1a]/20 rounded-full text-[#030b1a] text-[10px] sm:text-xs font-bold mb-4 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#030b1a]"></span>
          <span>فرصة رقمية محدودة — متبقي نسبة قليلة من الأجنحة المتاحة</span>
        </div>

        <h3 className="text-sm xs:text-base sm:text-lg md:text-2xl font-black text-[#030b1a] mb-5 sm:mb-6 tracking-tight leading-normal">
          العد التنازلي لإطلاق فعاليات المعرض والضخ الإعلاني العملاق خلال:
        </h3>

        {timeLeft.isEnded ? (
          <div className="py-4 text-center">
            <span className="text-xl font-black text-[#030b1a]">فعاليات المعرض والضغوط الإشهارية جارية حالياً!</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div 
                id={`countdown-unit-${index}`}
                key={unit.label} 
                className="flex flex-col items-center"
              >
                <div className="relative w-11 h-11 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-[#030b1a] border border-white/10 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg overflow-hidden group">
                  {/* Glowing line indicators */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#d4af37]"></div>
                  
                  <span className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-[#d4af37] tracking-wider leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold text-[#030b1a]">{unit.label}</div>
                <div className="text-[8px] sm:text-[9px] text-[#030b1a]/60 font-mono tracking-wider uppercase mt-px">{unit.subtext}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 sm:mt-6 text-[10px] sm:text-xs text-[#030b1a]/70 font-semibold max-w-lg mx-auto font-sans leading-relaxed">
          <span>يتم فرز طلبات حجز غرف العرض تلقائياً عند الوصول إلى 50 شركة رائدة بمصر تجنباً للتضخم الإعلاني والمبيعات.</span>
        </div>
      </div>
    </div>
  );
}
