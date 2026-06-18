import { Mail, Phone, MessageSquare, ShieldCheck, MapPin, Globe, Facebook, Instagram, Linkedin, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#050C16] border-t border-brand-blue-light/70 text-slate-400 text-xs sm:text-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: App Brand Card (md:5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="relative w-11 h-11 bg-gradient-to-br from-[#071329] to-[#030b1a] border-2 border-brand-gold/50 rounded-xl flex items-center justify-center font-black text-brand-gold text-lg shadow-[0_4px_12px_rgba(212,175,55,0.25)] overflow-hidden">
                <span className="font-extrabold tracking-tighter italic">EM</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent pointer-events-none"></div>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white leading-none">
                إكسبو مصر <span className="text-brand-gold font-black">expomasr.online</span>
              </h1>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed text-justify">
              منصتنا التفاعلية معتمدة ورسمية — نربط شركات المطابخ والأثاث والديكور بأكثر من 5,000 عميل ومستثمر حقيقي. نوفر بيئة عرض افتراضية احترافية توفر عليك تكاليف المعارض التقليدية وتعرض منتجاتك على مدار الساعة لجمهور يبحث ويشتري.
            </p>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#social-fb" className="w-8 h-8 rounded-lg bg-brand-blue-light/30 border border-brand-blue-light/60 hover:border-brand-gold hover:text-white flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#social-inst" className="w-8 h-8 rounded-lg bg-brand-blue-light/30 border border-brand-blue-light/60 hover:border-brand-gold hover:text-white flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social-linkedin" className="w-8 h-8 rounded-lg bg-brand-blue-light/30 border border-brand-blue-light/60 hover:border-brand-gold hover:text-white flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#social-web" className="w-8 h-8 rounded-lg bg-brand-blue-light/30 border border-brand-blue-light/60 hover:border-brand-gold hover:text-white flex items-center justify-center transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Sectors directory (md:3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white">القطاعات الرئيسية</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#sectors" className="hover:text-brand-gold transition-colors">المقاولات العامة والإنشاءات</a></li>
              <li><a href="#sectors" className="hover:text-brand-gold transition-colors">التطوير والاستثمار العقاري</a></li>
              <li><a href="#sectors" className="hover:text-brand-gold transition-colors">التشطيبات والأسقف والدهانات</a></li>
              <li><a href="#sectors" className="hover:text-brand-gold transition-colors">المطابخ والأجهزة والرخام الفاخر</a></li>
              <li><a href="#sectors" className="hover:text-brand-gold transition-colors">الأثاث والديكور والتصميم الداخلي</a></li>
            </ul>
          </div>

          {/* Column 3: Direct contact (md:4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold text-white">وسائل التواصل والاعتماد</h4>
            
            <ul className="space-y-3 text-xs">
              
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-gold">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">البريد الإلكتروني للمعرض:</span>
                  <a href="mailto:info@expomasr.online" className="text-slate-200 hover:text-brand-gold font-mono block">info@expomasr.online</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-gold">
                  <Phone className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">الهاتف والدعم التجاري:</span>
                  <a href="tel:+201145425207" className="text-slate-200 hover:text-brand-gold font-mono block">01145425207</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">قناة حجز الواتساب الفورية:</span>
                  <a href="https://wa.me/201033607749" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-brand-gold font-mono block">+20 10 33607749</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">مقر الإدارة الفنية:</span>
                  <span className="text-slate-200 block">التجمع الخامس، القاهرة الجديدة، مصر</span>
                </div>
              </li>

            </ul>

          </div>

        </div>

        {/* Lower copyright row */}
        <div className="border-t border-brand-blue-light/40 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          
          <div className="text-xs text-slate-500 leading-tight">
            <span>© {currentYear} إكسبو مصر - expomasr.online. جميع الحقوق الفكرية والتسويقية محفوظة.</span>
            <span className="block mt-1 sm:inline sm:mt-0 sm:mr-1">مرخص ومعتمد من الهيئة المصرية للمعارض والمؤتمرات الرقمية.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button 
              onClick={scrollToTop} 
              className="text-brand-gold hover:text-brand-gold-bright transition-colors cursor-pointer"
            >
              الرجوع لأعلى الصفحة ↑
            </button>
            <span className="text-slate-700">|</span>
            <a href="#terms" className="text-slate-500 hover:text-slate-300">الشروط والأحكام</a>
            <span className="text-slate-700">|</span>
            <a href="#privacy" className="text-slate-500 hover:text-slate-300">سياسة الخصوصية</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
