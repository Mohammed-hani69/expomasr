import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const targetDate = new Date('2026-06-28T10:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: false });

  useEffect(() => {
    const update = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        isEnded: false,
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'يوم' },
    { value: timeLeft.hours, label: 'ساعة' },
    { value: timeLeft.minutes, label: 'دقيقة' },
    { value: timeLeft.seconds, label: 'ثانية' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-w-lg mx-auto">
      <p className="text-xs font-bold text-slate-500 mb-3 text-center">
        {timeLeft.isEnded ? 'المعرض بدأ الآن!' : 'الموعد المتبقي لانطلاق المعرض:'}
      </p>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div key={u.label} className="text-center">
            <div className="w-14 h-14 bg-[#8B5E3C]/10 rounded-xl flex items-center justify-center font-black text-lg text-[#8B5E3C]">
              {String(u.value).padStart(2, '0')}
            </div>
            <p className="text-[10px] font-bold text-slate-500 mt-1">{u.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
