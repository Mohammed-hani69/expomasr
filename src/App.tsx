import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { SECTORS, DIGITAL_BOOTHS } from './data';
// @ts-ignore
import heroBg from './assets/images/Ultra-Modern-Kitchen_01.jpg';
// @ts-ignore
import skylineBg from './assets/images/مطابخ-مودرن.webp';
// @ts-ignore
import blueprintBg from './assets/images/استبدل-مطابخ-الوميتال-ب-مطابخ-حديثة-2025-1024x768.webp';

// Import our custom responsive components
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import InteractiveBooth from './components/InteractiveBooth';
import LeadDashboard from './components/LeadDashboard';
import PriceCalculator from './components/PriceCalculator';
import RegistrationSection from './components/RegistrationSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence, motion } from 'motion/react';

// Review rating icons helper
import { Star, ShieldCheck, Flame, Users, Calendar, TrendingUp, CheckCircle, ArrowLeft, ArrowUpRight, Award, Zap, HelpCircle, ArrowRight, Sparkles, LayoutGrid, Share2 } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [selectedPkgId, setSelectedPkgId] = useState<string>('professional');
  const [currentView, setCurrentView] = useState<'home' | 'booth'>('home');
  const [selectedBoothId, setSelectedBoothId] = useState<'contracting' | 'realestate' | 'decor'>('contracting');
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/videos')
      .then(r => r.json())
      .then(d => { if (d.success) setVideos(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPkgId(packageId);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Why Participate details with premium descriptions
  const advantages = [
    {
      title: "وصول فوري لآلاف العملاء",
      description: "نستقطب لك آلاف الباحثين الجادين عن المطابخ العصرية والفاخرة عبر حملات إعلانية ممولة بدقة، لتكون شركتك أمام جمهور يشتري ولا يتفرج فقط.",
      icon: "Zap",
    },
    {
      title: "جناح رقمي فاخر 3D",
      description: "صفحة شركة احترافية بتقنية العرض ثلاثي الأبعاد تعرض أحدث تصاميم مطابخك وصور وفيديوهات عالية الجودة، تترك انطباعاً لا يُنسى لدى الزوار.",
      icon: "Building2",
    },
    {
      title: "معرض صور وفيديوهات تفاعلي",
      description: "مساحة غير محدودة لرفع صور المطابخ المنفذة وألبومات الألوان والخامات والفيديوهات الترويجية، مع تجربة تصفح سينمائية تأسر انتباه العملاء.",
      icon: "Briefcase",
    },
    {
      title: "نظام استعلامات وطلبات مباشرة",
      description: "يمكن للعميل ملء طلب تصميم أو الاستفسار عن الأسعار بنقرة واحدة، وتصل بياناته فوراً إلى بريدك وواتساب بدون وسيط — تغلق الصفقة في ثوانٍ.",
      icon: "Layers",
    },
    {
      title: "تواصل فوري عبر واتساب",
      description: "زر واتساب مباشر في جناحك يسمح للعميل بالدردشة الحية معك، وإرسال صور المقترحات والمقايسات الفنية دون مغادرة المنصة.",
      icon: "MessageSquare",
    },
    {
      title: "تعزيز الهوية والعلامة التجارية",
      description: "ظهور اسم وشعار شركتك بجوار كبرى العلامات التجارية في المعرض يمنحك ثقة ومصداقية فورية في السوق المصري والخليجي.",
      icon: "Award",
    },
    {
      title: "ملفات بيانات العملاء الحقيقية",
      description: "تحصل على تقارير بأسماء وأرقام هواتف واهتمامات كل زائر استفسر عن خدماتك، لتتمكن من متابعتهم وتسويق منتجاتك بعد انتهاء المعرض.",
      icon: "Download",
    },
    {
      title: "تحليلات وعائد استثمار مضمون",
      description: "لوحة تحليلية رقمية ترصد عدد المشاهدات والاستفسارات والصفقات التي تحققت — وتعطيك صورة واضحة عن العائد الاستثماري لمشاركتك.",
      icon: "BarChart3",
    }
  ];

  // How it works steps
  const steps = [
    {
      num: "١",
      title: "اختر باقتك واحجز مقعدك",
      description: "حدد الباقة المناسبة لشركتك (أساسية، احترافية، أو راعي رسمي) واملأ نموذج الحجز الآمن — سنؤكد اشتراكك خلال 24 ساعة."
    },
    {
      num: "٢",
      title: "نسلّم ملفاتك ونجهز الجناح",
      description: "فريق الدعم الفني لدينا يتسلم شعار شركتك وصور المطابخ والفيديوهات والكتالوجات، ويصمم لك جناحاً رقمياً احترافياً بنفس هويتك."
    },
    {
      num: "٣",
      title: "حملاتنا الإعلانية تنطلق",
      description: "نطلق حملات ممولة على فيسبوك وجوجل ومنصات التواصل تستهدف بدقة الباحثين عن مطابخ فاخرة في مصر والخليج."
    },
    {
      num: "٤",
      title: "استقبال العملاء والاستفسارات",
      description: "يتوافد إليك آلاف الزوار المؤهلين، وتستقبل استفسارات مباشرة ونقرات واتساب وطلبات تصميم دون أي مجهود منك."
    },
    {
      num: "٥",
      title: "التقرير الختامي والبيانات",
      description: "بعد انتهاء المعرض، نرسل لك تقريراً شاملاً بقاعدة بيانات العملاء وإحصائيات الزيارات والمبيعات لتحليل العائد الاستثماري."
    }
  ];

  // Anticipated stats for kitchen expo
  const expectedStats = [
    { value: "+٥,٠٠٠", label: "زائر مستهدف مؤهل", desc: "باحثون نشطون يخططون لشراء مطابخ جديدة لمنازلهم ومشاريعهم خلال 2026" },
    { value: "+٥٠", label: "شركة ورائد أعمال", desc: "نخبة من كبرى مصنعي وموزعي المطابخ والأجهزة المنزلية في مصر والخليج" },
    { value: "+٣٠٠", label: "فرصة بيع وتعاقد", desc: "استفسارات جادة ونقرات واتساب وطلبات تصميم — معظمها يتحول إلى عقود تنفيذ" },
    { value: "+١٠٠", label: "مشروع منجز", desc: "صفقات متوقعة الإغلاق فوراً من اليوم الأول للحملات المدعومة والضغط الإعلاني" }
  ];

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

      <div className="min-h-screen bg-[#030b1a] text-slate-100 overflow-hidden font-sans">
      
      {/* Visual Ambient Light Spots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#8B5E3C]/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-[1200px] left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute bottom-[800px] right-10 w-[450px] h-[450px] bg-[#8B5E3C]/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      {/* STICKY HEADER */}
      <Header 
        currentView={currentView} 
        onBack={() => {
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('booth-showcase');
            if (el) {
              const offset = 85;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = el.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 100);
        }} 
        companyName={currentView === 'booth' ? DIGITAL_BOOTHS[selectedBoothId]?.companyName : undefined} 
      />

      {currentView === 'booth' ? (
        /* ISOLATED COMPONENT VIEWER / PRIVATE BOOTH PAGE */
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh]">
          {/* Back trace option */}
          <div className="mb-6">
            <button
              onClick={() => {
                setCurrentView('home');
                setTimeout(() => {
                  const el = document.getElementById('booth-showcase');
                  if (el) {
                    const offset = 85;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="text-[#8B5E3C] text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none outline-none"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لساحة المعرض والأجنحة الرئيسية</span>
            </button>
          </div>

          <InteractiveBooth 
            initialSector={selectedBoothId} 
            isStandalonePage={true} 
            onBackToMain={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('booth-showcase');
                if (el) {
                  const offset = 85;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }, 100);
            }}
          />
        </div>
      ) : (
        <>
          {/* HERO SECTION */}
          <section id="hero" className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-blue-dark">
        {/* Background Video loop with robust background-image fallback for any server/connection conditions */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-60 mix-blend-lighten"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-curved-lines-and-glass-facades-44158-large.mp4"
            poster={heroBg}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Tag Line */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#8B5E3C]/10 border border-[#8B5E3C]/20 rounded-full text-[#8B5E3C] text-xs sm:text-sm font-bold tracking-wide animate-pulse">
            <Flame className="w-4 h-4 text-[#8B5E3C] fill-current" />
            <span>المنصة الرقمية الأولى لترويج المطابخ في مصر — موثقة ومعتمدة رسمياً</span>
          </div>

          {/* Main Display Heading */}
          <div className="space-y-4 max-w-4xl mx-auto px-1 xs:px-0">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              المنصة الرقمية الأكبر <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold">
                لتسويق المطابخ الفاخرة
              </span> في مصر والشرق الأوسط 2026
            </h1>
            
            <div className="max-w-3xl mx-auto bg-slate-950/80 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-4 xs:p-6 shadow-2xl shadow-black/80 mt-6">
              <p className="text-white text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
                انضم إلى نخبة من كبرى شركات المطابخ والمطاعم والأجهزة المنزلية واعرض منتجاتك أمام أكثر من 5,000 عميل ومستثمر حقيقي يبحث عن التميز. منصتنا معتمدة وموثقة، وتضمن لك ظهوراً احترافياً يعزز مصداقيتك ويزيد مبيعاتك.
              </p>
            </div>
          </div>

          {/* Call-to-actions buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <a
              id="hero-book-button"
              href="#register-section"
              onClick={(e) => scrollToSection(e, '#register-section')}
              className="w-full sm:w-auto px-8 py-4 bg-[#8B5E3C] text-[#030b1a] rounded-xl font-bold text-base shadow-lg shadow-[#8B5E3C]/25 hover:shadow-brand-gold/30 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-[#030b1a]" />
              <span>احجز جناح شركتك الآن</span>
            </a>

            <a
              id="hero-prices-button"
              href="#pricing"
              onClick={(e) => scrollToSection(e, '#pricing')}
              className="w-full sm:w-auto border border-white/20 px-8 py-4 rounded-xl font-bold text-base hover:bg-white/5 transition-all text-center cursor-pointer"
            >
              <span>طلب عروض الأسعار والباقات</span>
            </a>
          </div>

          {/* COUNTDOWN WIDGET */}
          <div className="pt-4">
            <CountdownTimer />
          </div>

          {/* Quick Statistic highlight Cards (Bento Style) */}
          <div className="pt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#8B5E3C]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8B5E3C] leading-none">٥٠٠٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">مشتري وزائر مؤهل</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">باحثون جادون عن أفضل المطابخ والعروض</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#8B5E3C]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8B5E3C] leading-none">٥٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">عارض ورائد أعمال</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">أبرز مصنعي وموردي المطابخ في مصر والخليج</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#8B5E3C]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8B5E3C] leading-none">٣٠٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">صفقة متوقعة</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">عملاء مستعدون للتعاقد الفوري وطلب المقايسات</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#8B5E3C]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8B5E3C] leading-none">٢</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">أيام ترويج مكثف</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">حملات إعلانية موجّهة بلا توقف ولا منافسة تقليدية</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* WHY US? - ADVANTAGES SECTION */}
      <section id="why-us" className="py-20 border-y border-white/5 relative bg-[#030b1a] overflow-hidden">
        {/* Background Skyline Image with low opacity & majestic blending */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-35 mix-blend-screen"
          style={{ backgroundImage: `url(${skylineBg})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20 font-mono">
              عروض قيمة لا تُفوّت
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              لماذا تثق بكبرى شركات المطابخ في منصتنا؟
            </h2>
            <p className="text-white/75 text-xs sm:text-sm mt-2 leading-relaxed">
              وفر ميزانيتك التسويقية وضاعف أرباحك. منصتنا صممت خصيصاً لتحويل المشاهدين إلى عملاء حقيقيين — بجناح افتراضي يفوق جودة المعارض التقليدية، وحملاتنا الإعلانية المضمونة تجلب لك المستثمر الجاد دون مجهود إضافي.
            </p>
          </div>

          {/* Grid layout of 8 Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => {
              const IconComponent = (Icons as any)[adv.icon] || Icons.HelpCircle;
              return (
                <div
                  id={`adv-card-${idx}`}
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-[#8B5E3C]/30 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5E3C] mb-4 group-hover:bg-[#8B5E3C] group-hover:text-[#030b1a] transition-all shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#8B5E3C] transition-colors">
                    {adv.title}
                  </h4>
                  
                  <p className="text-xs text-white/50 mt-2 leading-relaxed text-justify">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#030b1a]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20">
              5 خطوات فقط نحو النجاح
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
              كيف نضمن لك عائداً استثمارياً حقيقياً؟
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              عمليتنا مصممة لتوصيل منتجك إلى العميل المناسب في الوقت المناسب — بخطوات واضحة ونتائج قابلة للقياس تضمن لك أقصى عائد استثماري.
            </p>
          </div>

          {/* Circle steps outline timeline line */}
          <div className="relative">
            {/* Visual connector line for large screens */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-white/5 via-[#8B5E3C]/30 to-white/5 -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div 
                  id={`step-card-${idx}`}
                  key={idx} 
                  className="flex flex-col items-center text-center space-y-4 bg-white/5 border border-white/10 p-6 rounded-3xl lg:bg-white/5 lg:border lg:border-white/10 lg:p-6 transition-all duration-300 hover:border-[#8B5E3C]/30"
                >
                  
                  {/* Circle number */}
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-[#8B5E3C]/20 flex items-center justify-center font-black text-lg text-[#8B5E3C] shadow-lg relative transition-all">
                    {/* Top active glowing light */}
                    <div className="absolute -top-1 w-2 h-2 rounded-full bg-[#8B5E3C]"></div>
                    <span className="font-mono tracking-widest">{step.num}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PARTICIPATING SECTORS */}
      <section id="sectors" className="py-20 bg-[#030b1a] relative border-t border-white/5 overflow-hidden">
        {/* Background Blueprint draft image pattern */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-25 mix-blend-color-dodge"
          style={{ backgroundImage: `url(${blueprintBg})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20">
              المطابخ الحديثة والمتطورة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              رحلة الأناقة: معرض المطابخ الفاخرة
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              اكتشف أرقى تصاميم المطابخ العصرية والكلاسيكية التي تجمع بين الفخامة والذكاء — اختر ما يناسب ذوقك الرفيع:
            </p>
          </div>

          {/* Videos Grid - Vertical Videos from API */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {videos.length === 0 ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-[9/16] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
              ))
            ) : (
              videos.map((v) => (
                <div key={v.id} className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 hover:border-[#8B5E3C]/40 transition-all duration-300 shadow-lg bg-black/40">
                  <video
                    src={v.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 right-0 left-0 p-3">
                    <span className="text-[10px] sm:text-xs font-bold text-white">{v.title}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sector labels below videos */}
          {videos.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[...new Set(videos.filter((v: any) => v.sector).map((v: any) => v.sector))].map((sector) => (
              <span
                key={sector as string}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs text-white/70 hover:text-[#8B5E3C] hover:border-[#8B5E3C]/30 transition-all"
              >
                {sector as string}
              </span>
            ))}
          </div>
          )}

        </div>
      </section>

      {/* 3 COMPANIES VIRTUAL SHOWCASE - COVER IMAGES */}
      <section id="booth-showcase" className="py-20 bg-[#020813] border-y border-white/5 relative overflow-hidden">
        {/* subtle styling dots */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#8B5E3C]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20 font-mono">
              الأجنحة الرقـمية لعمالقة التشـييد والعقارات
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              استكشف الأجنحة الافتراضية المستقلة
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
              اختر إحدى المؤسسات العقارية والمعمارية الرائدة للدخول مباشرة إلى جناحها المميز بشكل منفصل وتجربة واجهة العرض التفاعلية الكاملة.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Contracting */}
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#8B5E3C]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.contracting.bannerUrl} 
                  alt={DIGITAL_BOOTHS.contracting.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.8]"
                />
                <span className="absolute top-4 right-4 bg-yellow-500/90 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  المقاولات والخرسانات
                </span>
                <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  جناح VIP 12
                </span>
              </div>
              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-brand-gold transition-colors duration-200">
                  {DIGITAL_BOOTHS.contracting.companyName}
                </h3>
                <p className="text-brand-gold text-xs font-bold mt-1.5">
                  {DIGITAL_BOOTHS.contracting.tagline}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 text-justify leading-relaxed flex-grow">
                  {DIGITAL_BOOTHS.contracting.about}
                </p>
                {/* Visual mini status indicators */}
                <div className="grid grid-cols-2 gap-2 my-5 pt-4 border-t border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>فيديو تعريفي 4K</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>أسئلة فنية تفاعلية</span>
                  </div>
                </div>

                {/* Social Sharing Section */}
                <div className="flex items-center justify-between border-t border-[#8B5E3C]/10 pt-3.5 pb-2 mb-4">
                  <span className="text-[10px] xs:text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-brand-gold/80" />
                    <span>مشاركة الجناح:</span>
                  </span>
                  <div className="flex items-center gap-2 bg-[#06152a] px-2.5 py-1 rounded-xl border border-white/5 shadow-inner">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `استكشف جناح ${DIGITAL_BOOTHS.contracting.companyName} المميز في معرض المطابخ الحديثة 2026 - تجربة تفاعلية!\n👇 تفضل بالزيارة:\nhttps://expomasr.online/`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر واتساب"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.417 9.863-9.848.001-2.63-1.023-5.101-2.885-6.963C16.388 1.981 13.911.96 11.278.96 5.845.96 1.42 5.378 1.416 10.809c-.001 1.637.426 3.237 1.237 4.646L1.65 21.658l6.326-1.658-.329.154z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر فيسبوك"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-sky-600/20 text-sky-400 hover:text-sky-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر لينكد إن"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Click action */}
                <button
                  onClick={() => {
                    setSelectedBoothId('contracting');
                    setCurrentView('booth');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold hover:text-[#030b1a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>دخول الجناح الافتراضي</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Real Estate */}
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#8B5E3C]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.realestate.bannerUrl} 
                  alt={DIGITAL_BOOTHS.realestate.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.8]"
                />
                <span className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  التطوير والاستثمار العقاري
                </span>
                <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  جناح VIP 07
                </span>
              </div>
              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-brand-gold transition-colors duration-200">
                  {DIGITAL_BOOTHS.realestate.companyName}
                </h3>
                <p className="text-brand-gold text-xs font-bold mt-1.5">
                  {DIGITAL_BOOTHS.realestate.tagline}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 text-justify leading-relaxed flex-grow">
                  {DIGITAL_BOOTHS.realestate.about}
                </p>
                {/* Visual mini status indicators */}
                <div className="grid grid-cols-2 gap-2 my-5 pt-4 border-t border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>نظم سداد مرنة</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>حساب أرباح استثمارية</span>
                  </div>
                </div>

                {/* Social Sharing Section */}
                <div className="flex items-center justify-between border-t border-[#8B5E3C]/10 pt-3.5 pb-2 mb-4">
                  <span className="text-[10px] xs:text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-brand-gold/80" />
                    <span>مشاركة الجناح:</span>
                  </span>
                  <div className="flex items-center gap-2 bg-[#06152a] px-2.5 py-1 rounded-xl border border-white/5 shadow-inner">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `استكشف جناح ${DIGITAL_BOOTHS.realestate.companyName} المميز في معرض المطابخ الحديثة 2026 - تجربة تفاعلية!\n👇 تفضل بالزيارة:\nhttps://expomasr.online/`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر واتساب"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.417 9.863-9.848.001-2.63-1.023-5.101-2.885-6.963C16.388 1.981 13.911.96 11.278.96 5.845.96 1.42 5.378 1.416 10.809c-.001 1.637.426 3.237 1.237 4.646L1.65 21.658l6.326-1.658-.329.154z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر فيسبوك"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-sky-600/20 text-sky-400 hover:text-sky-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر لينكد إن"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Click action */}
                <button
                  onClick={() => {
                    setSelectedBoothId('realestate');
                    setCurrentView('booth');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold hover:text-[#030b1a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>دخول الجناح الافتراضي</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3: Interior Decor */}
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#8B5E3C]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.decor.bannerUrl} 
                  alt={DIGITAL_BOOTHS.decor.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.8]"
                />
                <span className="absolute top-4 right-4 bg-purple-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  الديكور واللاندسكيب
                </span>
                <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  جناح VIP 23
                </span>
              </div>
              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-brand-gold transition-colors duration-200">
                  {DIGITAL_BOOTHS.decor.companyName}
                </h3>
                <p className="text-brand-gold text-xs font-bold mt-1.5">
                  {DIGITAL_BOOTHS.decor.tagline}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 text-justify leading-relaxed flex-grow">
                  {DIGITAL_BOOTHS.decor.about}
                </p>
                {/* Visual mini status indicators */}
                <div className="grid grid-cols-2 gap-2 my-5 pt-4 border-t border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>تشطيبات نيو كلاسيك</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>معرض صور 4K</span>
                  </div>
                </div>

                {/* Social Sharing Section */}
                <div className="flex items-center justify-between border-t border-[#8B5E3C]/10 pt-3.5 pb-2 mb-4">
                  <span className="text-[10px] xs:text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-brand-gold/80" />
                    <span>مشاركة الجناح:</span>
                  </span>
                  <div className="flex items-center gap-2 bg-[#06152a] px-2.5 py-1 rounded-xl border border-white/5 shadow-inner">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `استكشف جناح ${DIGITAL_BOOTHS.decor.companyName} المميز في معرض المطابخ الحديثة 2026 - تجربة تفاعلية!\n👇 تفضل بالزيارة:\nhttps://expomasr.online/`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر واتساب"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.417 9.863-9.848.001-2.63-1.023-5.101-2.885-6.963C16.388 1.981 13.911.96 11.278.96 5.845.96 1.42 5.378 1.416 10.809c-.001 1.637.426 3.237 1.237 4.646L1.65 21.658l6.326-1.658-.329.154z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر فيسبوك"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        'https://expomasr.online/'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-sky-600/20 text-sky-400 hover:text-sky-300 active:scale-90 transition-all cursor-pointer"
                      title="مشاركة عبر لينكد إن"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Click action */}
                <button
                  onClick={() => {
                    setSelectedBoothId('decor');
                    setCurrentView('booth');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold hover:text-[#030b1a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>دخول الجناح الافتراضي</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REAL-TIME LEAD CONTROL PORTAL INTERACTIVE PANEL */}
      <section id="leads-overview-panel" className="py-20 bg-[#030b1a] border-t border-white/5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <LeadDashboard />
      </section>

      {/* EXPECTED METRICS & NUMBERS SECTION */}
      <section id="stats" className="py-20 bg-[#030b1a] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20">
              أرقام وحقائق تعكس جدوى المشاركة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              إحصائيات استثنائية تؤكد قوة العائد الاستثماري
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              هذه الأرقام مستندة إلى نتائج دوراتنا السابقة ومتوسط أداء الحملات الإعلانية الموجهة — وتثبت أن منصتنا هي الأكثر فعالية لبيع المطابخ في المنطقة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expectedStats.map((stat, idx) => (
              <div 
                id={`expected-stat-item-${idx}`}
                key={idx} 
                className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden text-center group hover:border-[#8B5E3C]/45 transition-all duration-300 pointer-events-auto"
              >
                {/* Accent glow top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B5E3C]/40"></div>
                
                <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B5E3C] tracking-tighter leading-none mb-3">
                  {stat.value}
                </div>
                <div className="text-slate-200 text-sm sm:text-base font-extrabold leading-tight mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PACKAGES & CALCULATOR SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20">
            استثمر بذكاء — اختر باقتك
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            باقات مرنة تناسب جميع شركات المطابخ
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2">
            سواء كنت شركة ناشئة أو علامة تجارية راسخة، لديك باقة تناسب ميزانيتك وطموحك — مع خيارات ترقية مرنة تزيد من وصولك للعملاء:
          </p>
        </div>

        {/* Dynamic pricing list */}
        <PriceCalculator onSelectPackage={handleSelectPackage} />

      </section>

      {/* EXPANDABLE FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#8B5E3C] tracking-widest bg-[#8B5E3C]/10 px-3 py-1 rounded-full border border-[#8B5E3C]/20">
            كل ما تريد معرفته قبل الاشتراك
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            الأسئلة الشائعة — إجابات شفافة وواضحة
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2">
            جمعنا لك هنا أهم الاستفسارات الفنية والتنظيمية لمساعدتك على اتخاذ قرار التسجيل الأمثل لحفظ الصفقات والمقاعد:
          </p>
        </div>

        <FAQSection />

      </section>

      {/* REGISTRATION FORM SECTION */}
      <section id="register-section" className="py-20 bg-white/5 border-t border-white/10 px-4 sm:px-6 lg:px-8 relative rounded-t-3xl">
        
        <RegistrationSection preSelectedPackageId={selectedPkgId} />

      </section>

        </>
      )}

      {/* FOOTER */}
      <Footer />

    </div>
  </>
  );
}
