import { useState } from 'react';
import { PACKAGES } from '../data';
import { Package } from '../types';
import { Check, Info, ArrowLeft, ShieldCheck, Tag, Sparkles } from 'lucide-react';

interface PriceCalculatorProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PriceCalculator({ onSelectPackage }: PriceCalculatorProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('professional');
  
  // Custom interactive add-ons state
  const [addons, setAddons] = useState({
    geoTargeting: false, // +1500 EGP
    threeDRender: false, // +2000 EGP
    copywriting: false,   // +800 EGP
  });

  const selectedPackage = PACKAGES.find(p => p.id === selectedPkgId) || PACKAGES[1];

  // Calculate prices
  const basePrice = selectedPackage.price;
  const geoTargetingPrice = addons.geoTargeting ? 1500 : 0;
  const threeDRenderPrice = addons.threeDRender ? 2000 : 0;
  const copywritingPrice = addons.copywriting ? 800 : 0;
  const totalPrice = basePrice + geoTargetingPrice + threeDRenderPrice + copywritingPrice;

  const handleBookNow = () => {
    // Invoke handler
    onSelectPackage(selectedPkgId);
    
    // Smooth scroll down to registration form
    const registerEl = document.querySelector('#register-section');
    if (registerEl) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = registerEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-12">
      
      {/* 4 Columns base Packages comparison with responsive support */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg: Package) => (
          <div
            id={`package-card-${pkg.id}`}
            key={pkg.id}
            onClick={() => setSelectedPkgId(pkg.id)}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border-2 ${
              selectedPkgId === pkg.id
                ? 'bg-brand-blue-medium border-brand-gold shadow-2xl shadow-brand-gold/10 -translate-y-2'
                : 'bg-brand-blue-medium/40 border-brand-blue-light/60 hover:border-brand-blue-light hover:-translate-y-1'
            }`}
          >
            {/* Recommended banner */}
            {pkg.recommended && (
              <div className="absolute -top-4 right-6 bg-gradient-to-l from-brand-gold to-brand-gold-bright text-brand-blue-dark font-black text-xs px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-blue-dark" />
                <span>الخيار المقترح والمفضل للشركاء</span>
              </div>
            )}

            <div>
              {/* Badge/Target */}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                {pkg.badge}
              </span>

              {/* Title & Price */}
              <div className="flex items-baseline justify-between border-b border-brand-blue-light/60 pb-5 mb-5">
                <h4 className="text-xl sm:text-2xl font-black text-white">{pkg.name}</h4>
                <div className="text-left font-mono">
                  <div className="text-2xl sm:text-3xl font-black text-brand-gold">
                    {pkg.price.toLocaleString('ar-EG')} <span className="text-xs font-bold text-slate-300 font-sans">جنيه</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">{pkg.period}</div>
                </div>
              </div>

              {/* Feature lists */}
              <ul className="space-y-3.5">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center mt-0.5 border border-brand-gold/25">
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Select action trigger */}
            <div className="mt-8 pt-4 border-t border-brand-blue-light/40">
              <button
                type="button"
                className={`w-full py-3 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  selectedPkgId === pkg.id
                    ? 'bg-gradient-to-l from-brand-gold to-brand-gold-bright text-brand-blue-dark shadow-md shadow-brand-gold/15'
                    : 'bg-brand-blue-dark border border-brand-blue-light text-slate-300 hover:text-white hover:bg-brand-blue-light/60'
                }`}
              >
                {selectedPkgId === pkg.id ? 'تم تحديد هذه الباقة لجدول التكلفة' : 'تحديد واختبار هذه الباقة'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Custom upgrade calculation segment */}
      <div className="max-w-4xl mx-auto bg-brand-blue-medium border border-brand-blue-light/70 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Upgrade choices (Left md:7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-brand-gold" />
                <h4 className="text-lg font-black text-white">ترقيات وميزات مخصصة إضافية</h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                يمكنك تحسين مخرجات اشتراكك ودمج خدمات إعلان ومحاكاة متطورة لطلبك لتعظيم فرصة اغلاق المبيعات الفائقة.
              </p>
            </div>

            <div className="space-y-3">
              
              {/* Option 1 */}
              <div 
                id="addon-geoTargeting-card"
                onClick={() => setAddons({ ...addons, geoTargeting: !addons.geoTargeting })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  addons.geoTargeting 
                    ? 'bg-brand-blue-dark/80 border-brand-gold/60 text-white' 
                    : 'bg-brand-blue-dark/30 border-brand-blue-light/50 text-slate-300 hover:border-brand-blue-light'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={addons.geoTargeting} 
                    onChange={() => {}} // toggled via parent card click
                    className="accent-brand-gold w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">زيادة الاستهداف الإعلاني الجغرافي</h5>
                    <p className="text-[10px] text-slate-400">توجيه حملات فيسبوك وجوجل الممولة لمدن ومناطق محددة مهتمة بنوع نشاطك بدقة.</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-brand-gold shrink-0 pl-1">
                  +1,500 ج.م
                </div>
              </div>

              {/* Option 2 */}
              <div 
                id="addon-threeDRender-card"
                onClick={() => setAddons({ ...addons, threeDRender: !addons.threeDRender })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  addons.threeDRender 
                    ? 'bg-brand-blue-dark/80 border-brand-gold/60 text-white' 
                    : 'bg-brand-blue-dark/30 border-brand-blue-light/50 text-slate-300 hover:border-brand-blue-light'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={addons.threeDRender} 
                    onChange={() => {}}
                    className="accent-brand-gold w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">تخطيط الجناح الرقمي ثلاثي الأبعاد 3D</h5>
                    <p className="text-[10px] text-slate-400">تحويل كتالوج وتصاميم شركتك لبيئة معمارية وواجهة ثلاثية الأبعاد تفاعلية تثير الاندهاش.</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-brand-gold shrink-0 pl-1">
                  +2,000 ج.م
                </div>
              </div>

              {/* Option 3 */}
              <div 
                id="addon-copywriting-card"
                onClick={() => setAddons({ ...addons, copywriting: !addons.copywriting })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  addons.copywriting 
                    ? 'bg-brand-blue-dark/80 border-brand-gold/60 text-white' 
                    : 'bg-brand-blue-dark/30 border-brand-blue-light/50 text-slate-300 hover:border-brand-blue-light'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={addons.copywriting} 
                    onChange={() => {}}
                    className="accent-brand-gold w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">كتابة إعلانية ومقالات ترويجية للكتالوج</h5>
                    <p className="text-[10px] text-slate-400">توليف نصوص تسويقية بليغة لتعريف مشاريعك تزيد من المبيعات ونسبة الرواج التجاري.</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-brand-gold shrink-0 pl-1">
                  +800 ج.م
                </div>
              </div>

            </div>
          </div>

          {/* Dynamic Billing Box (Right md:5 cols) */}
          <div className="md:col-span-5 bg-brand-blue-dark border border-brand-blue-light/80 rounded-2xl p-5 shadow-inner">
            <h5 className="text-slate-400 text-xs font-bold tracking-wider mb-3">حساب وتفصيل فاتورة الاشتراك</h5>
            
            <div className="space-y-2.5 text-xs pb-4 border-b border-brand-blue-light/60">
              
              <div className="flex justify-between items-center text-slate-200">
                <span>{selectedPackage.name}:</span>
                <span className="font-mono text-slate-200">{basePrice.toLocaleString('ar-EG')} ج.م</span>
              </div>

              {addons.geoTargeting && (
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>الاستهداف الجغرافي:</span>
                  <span className="font-mono text-brand-gold">+1,500 ج.م</span>
                </div>
              )}

              {addons.threeDRender && (
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>تخطيط ثلاثي الأبعاد 3D:</span>
                  <span className="font-mono text-brand-gold">+2,000 ج.m</span>
                </div>
              )}

              {addons.copywriting && (
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>الصياغة والكتابة الاحترافية:</span>
                  <span className="font-mono text-brand-gold">+800 ج.م</span>
                </div>
              )}

            </div>

            {/* Total */}
            <div className="py-4 flex justify-between items-baseline">
              <span className="text-xs font-extrabold text-white">التكلفة الإجمالية التقديرية:</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-brand-gold">
                {totalPrice.toLocaleString('ar-EG')} ج.م
              </span>
            </div>

            {/* Booking trigger */}
            <button
              onClick={handleBookNow}
              className="w-full py-3.5 rounded-xl bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold text-brand-blue-dark font-black text-sm hover:shadow-xl hover:shadow-brand-gold/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-brand-blue-dark" />
              <span>احجز جناح شركتك بهذا العرض</span>
            </button>
            <div className="text-[10px] text-slate-500 text-center mt-1.5">
              سيتم تمرير الباقة المحددة وخدمات الترقية تلقائياً لنموذج التسجيل لسرعة إتمام الحجز.
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
