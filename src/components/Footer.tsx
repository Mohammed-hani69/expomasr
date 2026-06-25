export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-500 text-xs sm:text-sm pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#040e24] border border-[#8B5E3C]/30 flex items-center justify-center shrink-0">
                <img src="/assets/images/icon.png" alt="اكسبو مصر" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-black text-slate-800 text-sm">اكسبو مصر</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              منصة رقمية تربط شركات المطابخ والأثاث والديكور بآلاف العملاء والمستثمرين. نوفر بيئة عرض افتراضية احترافية توفر عليك تكاليف المعارض التقليدية.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#8B5E3C] transition-colors">الرئيسية</a></li>
              <li><a href="#why-us" className="hover:text-[#8B5E3C] transition-colors">المزايا</a></li>
              <li><a href="#booth-showcase" className="hover:text-[#8B5E3C] transition-colors">الأجنحة</a></li>
              <li><a href="#register-section" className="hover:text-[#8B5E3C] transition-colors">التسجيل</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm mb-3">تواصل معنا</h4>
            <ul className="space-y-2 text-xs">
              <li>info@expomasr.online</li>
              <li>+20 100 000 0000</li>
              <li>القاهرة الجديدة، مصر</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {2026} اكسبو مصر — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
