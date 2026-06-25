import React, { useState, useEffect } from 'react';
import { DIGITAL_BOOTHS, PACKAGES } from './data';

import Header from './components/Header';
import InteractiveBooth from './components/InteractiveBooth';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence, motion } from 'motion/react';
import {
  ShieldCheck, ArrowRight, Play, Star, TrendingUp,
  DollarSign, Target, Clock, Smartphone, BarChart3,
  Eye, Users, Building2, CheckCircle, ChevronLeft,
  Crown, Gem, LayoutList, Medal, Phone, MessageCircle,
  Image, Layers, Sparkles, Zap
} from 'lucide-react';

const PACKAGE_IMAGES: Record<string, string> = {
  basic: '/assets/images/مطابخ-مودرن-صغيرة.webp',
  professional: '/assets/images/مطابخ-مودرن.webp',
  premium: '/assets/images/Ultra-Modern-Kitchen_01.jpg',
  sponsor: '/assets/images/cairo_expo_bg_1781526370175.jpg',
};

const PACKAGE_BOOTHS: Record<string, ('contracting' | 'realestate' | 'decor')[]> = {
  basic: ['contracting'],
  professional: ['contracting', 'realestate'],
  premium: ['contracting', 'realestate', 'decor'],
  sponsor: ['contracting', 'realestate', 'decor'],
};

const problems = [
  {
    icon: DollarSign,
    title: 'تكاليف المشاركة في المعارض التقليدية مرتفعة جداً؟',
    desc: 'وفر حتى 90% من ميزانية المعارض التقليدية. جناحك الرقمي يعمل 24 ساعة طوال أيام العام — بتكلفة رمزية لا تُضاهى.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Target,
    title: 'لا تصل للعميل المستهدف بدقة؟',
    desc: 'حملاتنا الإعلانية المدعومة بالذكاء الاصطناعي تستهدف بدقة متناهية الباحثين الجادين عن مطابخ فاخرة في مصر والسعودية والإمارات.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Eye,
    title: 'منتجاتك لا تظهر بشكل احترافي؟',
    desc: 'جناح افتراضي تفاعلي يعرض منتجاتك وصور مشاريعك وفيديوهاتك بجودة سينمائية فائقة تأسر انتباه الزوار وتحقق انطباعاً لا يُنسى.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: 'لا يتوفر لديك وقت لمتابعة العملاء؟',
    desc: 'نظام آلي متكامل يجمع لك بيانات كل عميل استفسر عن خدماتك — الاسم، رقم الهاتف، الاهتمامات — وتصلك مباشرة على واتساب.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    title: 'تريد التفوق على منافسيك في السوق؟',
    desc: 'ظهور علامتك التجارية بجوار كبرى شركات المطابخ في المنطقة يمنحك مصداقية فورية وثقة هائلة في السوق.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: BarChart3,
    title: 'لا تعرف العائد الفعلي على استثمارك؟',
    desc: 'لوحة تحليلية احترافية ترصد بدقة عدد المشاهدات، الاستفسارات، الصفقات المغلقة — تعرف بدقة عائد استثمارك الحقيقي.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

const steps = [
  {
    num: '١', icon: Building2,
    title: 'اختر باقتك واحجز جناحك',
    desc: 'تصفح الباقات المتاحة واختر الأنسب لشركتك. املأ نموذج الحجز — فريقنا يؤكد اشتراكك ويبدأ التجهيز الفوري خلال 24 ساعة.',
  },
  {
    num: '٢', icon: Smartphone,
    title: 'نسلم ملفاتك ونصمم الجناح',
    desc: 'نستلم شعار شركتك، صور المطابخ المنفذة، والفيديوهات الترويجية. نصمم لك جناحاً رقمياً يعبر عن هوية علامتك التجارية.',
  },
  {
    num: '٣', icon: Target,
    title: 'الحملات التسويقية تنطلق',
    desc: 'نطلق حملات إعلانية ممولة على جوجل وفيسبوك تستهدف بدقة الباحثين عن مطابخ فاخرة في مصر والخليج.',
  },
  {
    num: '٤', icon: Users,
    title: 'العملاء المستهدفون يتوافدون',
    desc: 'استقبل استفسارات، طلبات تصميم، ورسائل واتساب مباشرة من عملاء جادين — دون أي مجهود إضافي من فريقك.',
  },
  {
    num: '٥', icon: BarChart3,
    title: 'التقرير التحليلي الختامي',
    desc: 'نرسل لك تقريراً شاملاً بقاعدة بيانات العملاء المهتمين، إحصائيات الزيارات، والمبيعات المحققة.',
  },
];

type BoothKey = 'contracting' | 'realestate' | 'decor';

function PackageBoothsBasic({ boothKeys, openBooth }: { boothKeys: BoothKey[]; openBooth: (k: BoothKey) => void }) {
  return (
    <div className="space-y-3">
      {boothKeys.map((key) => {
        const b = DIGITAL_BOOTHS[key];
        if (!b) return null;
        return (
          <button
            key={key}
            onClick={() => openBooth(key)}
            className="w-full group flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-right"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img src={b.bannerUrl} alt={b.companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm truncate">{b.companyName}</h4>
                <span className="text-[10px] text-slate-400 shrink-0">| {b.tagline}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{b.about}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Image className="w-3 h-3" />{b.gallery.length} صورة</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />واتساب</span>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-[#8B5E3C] group-hover:-translate-x-1 transition-all shrink-0" />
          </button>
        );
      })}
    </div>
  );
}

function PackageBoothsProfessional({ boothKeys, openBooth }: { boothKeys: BoothKey[]; openBooth: (k: BoothKey) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {boothKeys.map((key) => {
        const b = DIGITAL_BOOTHS[key];
        if (!b) return null;
        return (
          <div key={key} className="group bg-white border-2 border-amber-100 rounded-2xl overflow-hidden hover:border-[#8B5E3C]/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg">
            <div className="h-40 overflow-hidden relative">
              <img src={b.bannerUrl} alt={b.companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <span className="bg-white/90 backdrop-blur-sm text-[#8B5E3C] text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <Medal className="w-3 h-3" /> {key === 'contracting' ? 'مقاولات' : key === 'realestate' ? 'تطوير عقاري' : 'ديكور'}
                </span>
                <span className="bg-[#8B5E3C] text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {b.projects.length} مشاريع
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-slate-900 text-sm">{b.companyName}</h3>
              <p className="text-[#8B5E3C] text-xs font-bold mt-0.5">{b.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">صور وفيديو</span>
                <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">واتساب مباشر</span>
                <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">كتالوج</span>
              </div>
              <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">{b.about}</p>
              <button
                onClick={() => openBooth(key)}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-l from-[#8B5E3C] to-[#a0704a] text-white font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>دخول الجناح</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PackageBoothsPremium({ boothKeys, openBooth }: { boothKeys: BoothKey[]; openBooth: (k: BoothKey) => void }) {
  const [featured, ...rest] = boothKeys;
  return (
    <div className="space-y-6">
      {featured && (() => {
        const b = DIGITAL_BOOTHS[featured];
        if (!b) return null;
        return (
          <div
            onClick={() => openBooth(featured)}
            className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 hover:border-[#8B5E3C]/40 transition-all"
          >
            <img src={b.bannerUrl} alt={b.companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 mb-3">
                <Gem className="w-3 h-3" /> جناح مميز
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{b.companyName}</h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium mt-1">{b.tagline}</p>
              <p className="text-white/60 text-xs mt-2 max-w-lg line-clamp-2">{b.about}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-white/70 text-xs flex items-center gap-1"><Image className="w-3.5 h-3.5" />{b.gallery.length} معرض</span>
                <span className="text-white/70 text-xs flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{b.projects.length} مشروع</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-amber-50 transition-all">
                <span>دخول الجناح</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        );
      })()}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((key) => {
            const b = DIGITAL_BOOTHS[key];
            if (!b) return null;
            return (
              <button
                key={key}
                onClick={() => openBooth(key)}
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-[#8B5E3C]/30 hover:-translate-y-0.5 transition-all cursor-pointer text-right"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img src={b.bannerUrl} alt={b.companyName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{b.companyName}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{b.tagline}</p>
                  <span className="text-[10px] font-bold text-[#8B5E3C] flex items-center gap-1 mt-1">
                    <span>دخول</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PackageBoothsSponsor({ boothKeys, openBooth }: { boothKeys: BoothKey[]; openBooth: (k: BoothKey) => void }) {
  return (
    <div className="space-y-5">
      {boothKeys.map((key) => {
        const b = DIGITAL_BOOTHS[key];
        if (!b) return null;
        return (
          <div
            key={key}
            onClick={() => openBooth(key)}
            className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border-2 border-[#C49A6C]/30 hover:border-[#C49A6C]/60 transition-all"
          >
            <img src={b.bannerUrl} alt={b.companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Crown className="w-3 h-3" />
                <span>راعي رسمي</span>
              </span>
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg sm:text-2xl font-black text-white">{b.companyName}</h3>
                <span className="hidden sm:inline-flex items-center gap-1 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-bold px-2 py-1 rounded-full border border-white/10">
                  <Zap className="w-3 h-3" /> شريك معتمد
                </span>
              </div>
              <p className="text-[#C49A6C] text-xs sm:text-sm font-bold">{b.tagline}</p>
              <p className="text-white/60 text-xs mt-1 max-w-xl line-clamp-1">{b.about}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-white/60 text-[10px] flex items-center gap-1"><Phone className="w-3 h-3" />{b.phoneNumber}</span>
                <span className="text-white/60 text-[10px] flex items-center gap-1"><MessageCircle className="w-3 h-3" />{b.whatsappNumber}</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C] text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-black/20">
                <span>دخول الجناح</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PackageHeaderIcon({ pkgId }: { pkgId: string }) {
  if (pkgId === 'basic') return <LayoutList className="w-4 h-4" />;
  if (pkgId === 'professional') return <Medal className="w-4 h-4" />;
  if (pkgId === 'premium') return <Gem className="w-4 h-4" />;
  if (pkgId === 'sponsor') return <Crown className="w-4 h-4" />;
  return null;
}

const PACKAGE_VISUALS: Record<string, { icon: React.ElementType; accent: string; lightBg: string; border: string; label: string }> = {
  basic: { icon: LayoutList, accent: 'text-slate-600', lightBg: 'bg-slate-50', border: 'border-slate-200', label: 'باقة اقتصادية' },
  professional: { icon: Medal, accent: 'text-amber-700', lightBg: 'bg-amber-50', border: 'border-amber-200', label: 'الأكثر مبيعاً' },
  premium: { icon: Gem, accent: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'border-indigo-200', label: 'باقة مميزة' },
  sponsor: { icon: Crown, accent: 'text-[#C49A6C]', lightBg: 'bg-[#C49A6C]/10', border: 'border-[#C49A6C]/30', label: 'الراعي الرسمي' },
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedPkgId, setSelectedPkgId] = useState('professional');
  const [currentView, setCurrentView] = useState<'home' | 'package' | 'booth'>('home');
  const [selectedBoothId, setSelectedBoothId] = useState<BoothKey>('contracting');
  const [lastPackageId, setLastPackageId] = useState<string | null>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  const heroVideos = [
    '/static/uploads/24e6ee8415fedc165da58b9d89e5f2ba_720w.mp4',
    '/static/uploads/94ab7b320c4fef6b838063a9047e4996_720w.mp4',
    '/static/uploads/5b852614aea2bf37ad4b64487218254b_720w.mp4',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex(i => (i + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSplash) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openPackage = (pkgId: string) => {
    setSelectedPkgId(pkgId);
    setCurrentView('package');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentView('home');
    setTimeout(() => scrollTo('booth-showcase'), 100);
  };

  const openBooth = (boothKey: BoothKey) => {
    setLastPackageId(selectedPkgId);
    setSelectedBoothId(boothKey);
    setCurrentView('booth');
    window.scrollTo({ top: 0 });
  };

  const backToPackage = () => {
    const pkgId = lastPackageId || selectedPkgId;
    setSelectedPkgId(pkgId);
    setCurrentView('package');
    window.scrollTo({ top: 0 });
  };

  const selectedPackage = PACKAGES.find(p => p.id === selectedPkgId);
  const packageBoothKeys = PACKAGE_BOOTHS[selectedPkgId] || [];
  const visual = PACKAGE_VISUALS[selectedPkgId];

  const renderPackageBooths = () => {
    switch (selectedPkgId) {
      case 'basic':
        return <PackageBoothsBasic boothKeys={packageBoothKeys} openBooth={openBooth} />;
      case 'professional':
        return <PackageBoothsProfessional boothKeys={packageBoothKeys} openBooth={openBooth} />;
      case 'premium':
        return <PackageBoothsPremium boothKeys={packageBoothKeys} openBooth={openBooth} />;
      case 'sponsor':
        return <PackageBoothsSponsor boothKeys={packageBoothKeys} openBooth={openBooth} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, filter: 'blur(10px)', transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999]"
          >
            <SplashScreen onComplete={() => setShowSplash(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white text-slate-800 overflow-hidden">
        <Header
          currentView={currentView === 'booth' ? 'booth' : 'home'}
          onBack={currentView === 'booth' ? backToPackage : backToHome}
          companyName={currentView === 'booth' ? DIGITAL_BOOTHS[selectedBoothId]?.companyName : undefined}
        />

        {currentView === 'package' ? (
          <div className={`pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-[85vh] ${visual?.lightBg}`}>
            <div className="max-w-6xl mx-auto">
              <button
                onClick={backToHome}
                className="text-slate-500 text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:text-[#8B5E3C] transition-colors mb-6 group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>العودة للباقات</span>
              </button>

              {selectedPackage && visual && (
                <>
                  <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-8 border-b ${visual.border}`}>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${visual.accent} ${visual.lightBg} px-3 py-1 rounded-full`}>
                        <PackageHeaderIcon pkgId={selectedPkgId} />
                        {visual.label}
                      </span>
                      <h1 className={`text-2xl sm:text-4xl font-black mt-3 ${selectedPkgId === 'sponsor' ? 'text-[#8B5E3C]' : 'text-slate-900'}`}>
                        {selectedPackage.name}
                      </h1>
                      <p className={`text-xs sm:text-sm font-bold mt-1 ${visual.accent}`}>{selectedPackage.badge}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedPackage.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className={`text-3xl sm:text-4xl font-black ${visual.accent}`}>{selectedPackage.price.toLocaleString()} ج.م</div>
                      <div className="text-xs text-slate-400 font-medium">{selectedPackage.period}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <Building2 className={`w-4 h-4 ${visual.accent}`} />
                      <span>الأجنحة المشتركة في هذه الباقة ({packageBoothKeys.length})</span>
                    </h2>
                  </div>

                  {renderPackageBooths()}

                  {packageBoothKeys.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                      <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p className="font-bold text-sm">لا توجد أجنحة متاحة في هذه الباقة حالياً</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : currentView === 'booth' ? (
          <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh]">
            <button
              onClick={backToPackage}
              className="text-[#8B5E3C] text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:underline mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>العودة للباقة</span>
            </button>
            <InteractiveBooth
              initialSector={selectedBoothId}
              isStandalonePage
              onBackToMain={backToPackage}
              packageId={lastPackageId || selectedPkgId}
            />
          </div>
        ) : (
          <>
            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
              {heroVideos.map((src, i) => (
                <video
                  key={src}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === videoIndex ? 'opacity-100' : 'opacity-0'}`}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-bold mb-6 border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-current text-[#C49A6C]" />
                  <span>أكبر منصة رقمية لعرض وتسويق المطابخ الفاخرة في الشرق الأوسط — اكسبو مصر 2026</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
                  المنصة المتخصصة التي تجمع
                  <br />
                  <span className="text-[#C49A6C]">نخبة شركات المطابخ تحت سقف رقمي واحد</span>
                </h1>
                <p className="text-white/80 text-sm sm:text-lg max-w-3xl mx-auto mb-6 leading-relaxed drop-shadow">
                  نوفر لعلامتك التجارية جناحاً افتراضياً احترافياً، وحملات تسويقية مدفوعة تستهدف العملاء الأكثر اهتماماً، 
                  وصولاً مباشراً إلى <strong className="text-white">آلاف المشترين الجادين</strong> — 
                  نساعد شركاءنا على زيادة المبيعات وتعزيز حضورهم في السوق.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> آلاف الزوار المستهدفين شهرياً
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> عملاء جادون وطلبات تسعير حقيقية
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> انتشار واسع في مصر والخليج
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => scrollTo('register-section')}
                    className="px-8 py-4 bg-[#8B5E3C] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#7a5234] transition-all flex items-center gap-2 shadow-black/30"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>احجز جناح شركتك الآن واجلب آلاف العملاء</span>
                  </button>
                  <button
                    onClick={() => scrollTo('booth-showcase')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>اكتشف مزايا المعرض الإلكتروني</span>
                  </button>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-white/50 text-[10px]">نحن لا ننافسك في التصنيع... بل نصبح أقوى قناة تسويق رقمية لعلامتك التجارية</span>
                </div>
              </div>
            </section>

            {/* PROBLEM → SOLUTION */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full">
                  التحديات التي تواجه شركات المطابخ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-3">
                  كل تحدٍ في سوق المطابخ له حل رقمي
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  معرض إلكتروني متكامل يجلب لشركتك آلاف الزوار والعملاء المحتملين — نوصل منتجك للمشتري الجاد 
                  في مصر والخليج من خلال جناح افتراضي وحملات تسويقية ذكية.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {problems.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#8B5E3C]/30 hover:-translate-y-1 transition-all duration-300">
                      <div className={`w-11 h-11 rounded-xl ${p.bg} ${p.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm mb-2">{p.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  <span className="text-xs font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full">
                    آلية العمل خطوة بخطوة
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-3">
                    من الاشتراك إلى تحقيق المبيعات — 5 مراحل فقط
                  </h2>
                  <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                    عملية احترافية واضحة ومباشرة. فريقنا المتخصص يتولى كل التفاصيل — من تصميم الجناح الرقمي وإطلاق الحملات 
                    إلى تسليمك تقارير شاملة بالنتائج والعملاء المحتملين.
                  </p>
                </div>
                <div className="relative">
                  <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-slate-200"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {steps.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={i} className="relative text-center bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#8B5E3C]/30 hover:-translate-y-1 transition-all duration-300">
                          <div className="w-14 h-14 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8B5E3C]/20 relative z-10">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] flex items-center justify-center text-xs font-black">
                            {step.num}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1">{step.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* PACKAGES SHOWCASE */}
            <section id="booth-showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full">
                  الباقات والأسعار
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-3">
                  أربع باقات تسويقية متكاملة لشركتك
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  نقدم أربع باقات مرنة تناسب جميع شركات المطابخ — من الشركات الناشئة إلى العلامات التجارية الكبرى. 
                  كل باقة تتضمن مجموعة من الأجنحة الرقمية والمزايا التسويقية المصممة لتعزيز تواجدك الرقمي وجذب العملاء.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PACKAGES.map((pkg) => {
                  const boothCount = PACKAGE_BOOTHS[pkg.id]?.length || 0;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => openPackage(pkg.id)}
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#8B5E3C]/30 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md text-right w-full cursor-pointer"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <img src={PACKAGE_IMAGES[pkg.id]} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 right-3 left-3">
                          <h3 className="font-black text-white text-sm drop-shadow">{pkg.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-white/90 backdrop-blur-sm text-[#8B5E3C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {boothCount} أجنحة
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{pkg.badge}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-bold text-[#8B5E3C] flex items-center gap-1 group-hover:gap-2 transition-all">
                            <span>تصفح الأجنحة</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                          <span className="font-black text-slate-900 text-sm">{pkg.price.toLocaleString()} ج.م</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STATS BANNER */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#8B5E3C]">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {[
                    { value: '١٠,٠٠٠+', label: 'مشتري محتمل شهرياً' },
                    { value: '٨٠+', label: 'شركة مطابخ مشاركة' },
                    { value: '٥٠٠+', label: 'صفقة متوقعة سنوياً' },
                    { value: '٩٠٪', label: 'توفير في تكاليف التسويق' },
                  ].map((s, i) => (
                    <div key={i} className="text-white">
                      <div className="text-3xl sm:text-4xl font-black">{s.value}</div>
                      <div className="text-white/80 text-xs sm:text-sm font-bold mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* REGISTRATION */}
            <section id="register-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full">
                  سجل الآن — العرض محدود
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-3">
                  انضم إلى كبرى شركات المطابخ في المنطقة
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  املأ بيانات شركتك — فريقنا المتخصص يتولى تجهيز جناحك الرقمي بالكامل، إطلاق الحملات التسويقية، 
                  وتوصيل العملاء المحتملين إليك مباشرة. فرص مشاركة محدودة لضمان الجودة والتميز.
                </p>
              </div>
              <RegistrationSection preSelectedPackageId={selectedPkgId} />
            </section>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}
