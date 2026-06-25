import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView?: 'home' | 'booth';
  onBack?: () => void;
  companyName?: string;
}

export default function Header({ currentView = 'home', onBack, companyName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المزايا', href: '#why-us' },
    { label: 'كيف يعمل', href: '#how-it-works' },
    { label: 'الأجنحة', href: '#booth-showcase' },
    { label: 'التسجيل', href: '#register-section' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 85;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#040e24] border border-[#8B5E3C]/30 flex items-center justify-center shrink-0">
              <img src="/assets/images/icon.png" alt="اكسبو مصر" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold text-[#8B5E3C] bg-[#8B5E3C]/10 px-1.5 py-0.5 rounded-full">اكسبو مصر 2026</span>
                <span className="text-[8px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  نشط الآن
                </span>
              </div>
              <h1 className={`text-xs sm:text-sm font-extrabold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                <span className="text-[#8B5E3C]">اكسبو</span> مصر
              </h1>
            </div>
          </div>

          {currentView === 'booth' ? (
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
                {companyName}
              </span>
            </div>
          ) : (
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    isScrolled ? 'text-slate-600 hover:text-[#8B5E3C] hover:bg-amber-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {currentView === 'booth' ? (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5E3C] text-white rounded-full font-bold text-xs hover:bg-[#7a5234] transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة</span>
              </button>
            ) : (
              <>
                <a
                  href="#register-section"
                  onClick={(e) => scrollTo(e, '#register-section')}
                  className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                    isScrolled
                      ? 'bg-[#8B5E3C] text-white hover:bg-[#7a5234]'
                      : 'bg-white text-slate-900 hover:bg-amber-50'
                  }`}
                >
                  احجز جناحك الآن
                </a>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`inline-flex lg:hidden items-center justify-center p-2 rounded-xl transition-all ${
                    isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && currentView !== 'booth' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', bounce: 0.05, duration: 0.4 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 + 0.1 }}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#8B5E3C] hover:bg-amber-50 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.03 + 0.15 }}
                className="pt-4 mt-3 border-t border-slate-100"
              >
                <a
                  href="#register-section"
                  onClick={(e) => scrollTo(e, '#register-section')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#8B5E3C] text-white font-bold text-sm hover:bg-[#7a5234] transition-all"
                >
                  احجز جناحك الآن
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
