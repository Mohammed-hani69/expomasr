import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'لماذا تشارك؟', href: '#why-us' },
    { label: 'كيف يعمل؟', href: '#how-it-works' },
    { label: 'القطاعات', href: '#sectors' },
    { label: 'لوحة التحكم والمزامنة', href: '#leads-overview-panel' },
    { label: 'نموذج الجناح', href: '#booth-showcase' },
    { label: 'أرقام وحقائق', href: '#stats' },
    { label: 'الباقات والأسعار', href: '#pricing' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 85; // header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-blue-dark/95 backdrop-blur-md border-b border-brand-blue-light/50 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand ID */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#aa8a2e] rounded-lg flex items-center justify-center font-bold text-[#030b1a] text-xl italic shadow-lg shadow-brand-gold/10">
              E
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-white/10 xs:inline-block hidden">حدث 2026 Virtual</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  نشط الآن
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-[#d4af37] tracking-tight leading-none mt-1">
                المعرض الرقمي للبناء والتشطيبات
              </h1>
              <p className="text-[9px] text-white/50 tracking-widest uppercase">Digital Expo Egypt 2026</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {menuItems.map((item) => (
              <a
                id={`nav-${item.href.replace('#', '')}`}
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-[#d4af37] transition-colors duration-200 hover:bg-white/5 rounded-full border border-transparent hover:border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Box & Mobile Toggle */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Bento date badge on desktop */}
            <div className="hidden xl:flex flex-col items-end px-4 border-r border-[#d4af37]/20">
              <span className="text-[9px] text-white/60 uppercase">الموعد القادم للضخ</span>
              <span className="text-xs font-bold text-[#d4af37]">سبتمبر 2026</span>
            </div>

            <a
              id="header-cta-button"
              href="#register-section"
              onClick={(e) => scrollToSection(e, '#register-section')}
              className="hidden md:inline-flex items-center bg-white text-[#030b1a] px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#d4af37] transition-all duration-300 shadow-md shadow-white/5 cursor-pointer"
            >
              <span>احجز جناحك الآن</span>
            </a>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-brand-blue-light/70 focus:outline-none transition-all duration-200 border border-slate-700/50"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isOpen && (
        <div className="lg:hidden bg-brand-blue-dark/98 border-b border-brand-blue-light/80" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                id={`mobile-nav-${item.href.replace('#', '')}`}
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-brand-gold hover:bg-brand-blue-light/50 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-white/10 px-4">
              <a
                id="mobile-header-cta"
                href="#register-section"
                onClick={(e) => scrollToSection(e, '#register-section')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white text-[#030b1a] hover:bg-[#d4af37] text-center font-bold text-sm"
              >
                <span>احجز جناحك الآن</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
