import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { SECTORS, DIGITAL_BOOTHS } from './data';
// @ts-ignore
import heroBg from './assets/images/cairo_expo_bg_1781526370175.jpg';
// @ts-ignore
import skylineBg from './assets/images/building_skyline_glow_1781533838845.jpg';
// @ts-ignore
import blueprintBg from './assets/images/blueprint_ambient_pattern_1781533858181.jpg';

// Import our custom responsive components
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import InteractiveBooth from './components/InteractiveBooth';
import LeadDashboard from './components/LeadDashboard';
import PriceCalculator from './components/PriceCalculator';
import RegistrationSection from './components/RegistrationSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

// Review rating icons helper
import { Star, ShieldCheck, Flame, Users, Calendar, TrendingUp, CheckCircle, ArrowLeft, ArrowUpRight, Award, Zap, HelpCircle, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';

export default function App() {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('professional');
  const [currentView, setCurrentView] = useState<'home' | 'booth'>('home');
  const [selectedBoothId, setSelectedBoothId] = useState<'contracting' | 'realestate' | 'decor'>('contracting');

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
      title: "الوصول اللحظي لآلاف العملاء",
      description: "استقطاب مباشر ومكثف للزوار الباحثين على وجه الخصوص لتشديد منازلهم أو شراء عقارات جديدة طوال يومي الإعلان المكثف.",
      icon: "Users",
    },
    {
      title: "جناح رقمي متكامل 3D",
      description: "صفحة شركة مجهزة بالكامل لشركتك تعرض أعمالك وتصميماتك وفيديوهاتك بطريقة فخمة تحاكي الواجهة العالمية للمعارض.",
      icon: "Building2",
    },
    {
      title: "معرض مشاريع وفيديوهات تفاعلي",
      description: "مساحة غير محدودة لرفع تفاصيل مشاريعك المنفذة وعرض كتالوج الألوان والمواد لزيادة رغبة الإقناع لدى العملاء الباحثين.",
      icon: "Briefcase",
    },
    {
      title: "استقبال مباشر لعروض الأسعار",
      description: "يستطيع العميل ملء طلب المقايسة وسعر التشطيب أو الاستفسار مباشرة، وتتحول البيانات فوراً ليدك للمتابعة وإغلاق الصفقة.",
      icon: "Layers",
    },
    {
      title: "تكامل دردشة واتساب هجينة",
      description: "توجيه بنقرة واحدة لدردشة واتساب حية لتجيب على العميل وترسل له عينات التصميم والمقايسات الفنية السريعة في ثوانٍ.",
      icon: "MessageSquare",
    },
    {
      title: "شهرة واسعة لعلامتك التجارية",
      description: "ظهور اسم وشعار شركتك بجانب عمالقة البناء والمقاولات يزيد الثقة والموثوقية المهنية لمؤسستك في السوق المصري والخليجي.",
      icon: "Award",
    },
    {
      title: "الحصول على ملف بيانات دقيق",
      description: "تنزيل تقرير شامل بأسماء وأرقام هواتف كافة العملاء الذين تصفحوا ونقروا على خدمات جناحك الفني لمواصلة التواصل والتسويق.",
      icon: "Download",
    },
    {
      title: "إحصائيات وتقرير ختامي موثق",
      description: "استلام لوحة تحليلية رقمية ترصد مصادر المشاهدات والعملاء والمبيعات التي تحققت لشركتك لتقييم العائد الاستثماري العالي.",
      icon: "BarChart3",
    }
  ];

  // How it works steps
  const steps = [
    {
      num: "١",
      title: "احجز الجناح والترقية",
      description: "تحديد الباقة (الأساسية، الاحترافية، أو الراعي الرسمي) وملء نموذج حجز الجناح لحفظ مساحة العرض الخاصة بك."
    },
    {
      num: "٢",
      title: "تسليم ملف الأعمال والمعرض",
      description: "يرفع فريق الدعم لدينا شعار شركتك ومقاطع الفيديو والكتالوجات وصور المشروعات لتتكامل في قالب معماري فخم."
    },
    {
      num: "٣",
      title: "حملات الضخ التسويقي الموجه",
      description: "نطلق حملات إعلانية ممولة عملاقة تستهدف الباحثين بدقة عن تشطيب الشقق، تركيب مطابخ، وشراء عقارات في مصر."
    },
    {
      num: "٤",
      title: "تلقي العملاء وإجراء المعاينات",
      description: "يتوافد آلاف العارضين والباحثين لجناحك، لتتلقى طلبات عروض أسعار مباشرة ونقرات اتصال وواتساب فوري بضغطة زر."
    },
    {
      num: "٥",
      title: "التقرير الختامي وقاعدة البيانات",
      description: "نصدر لك قاعدة البيانات الشاملة للعملاء المهتمين مع إحصائيات دقيقة لعدد الزيارات ونقرات التفاوض والاتصال."
    }
  ];

  // Anticipated stats as requested
  const expectedStats = [
    { value: "+٥,٠٠٠", label: "زائر مستهدف بالاسم", desc: "باحثون يبحثون بنشاط عن بناء وشراء وتشطيب منازلهم" },
    { value: "+٥٠", label: "شركة هندسية وعقارية عارضة", desc: "تجمع نخبة رواد التشييد والديكور والمصانع بمصر" },
    { value: "+٣٠٠", label: "طلب تواصل وتفاوض مباشر", desc: "استمارات تواصل فورية ونقرات دردشة واتساب حية" },
    { value: "+١٠٠", label: "فرصة بيع وصفقة تعاقدية", desc: "صفقات تعاقدية متوقع إغلاقها مباشرة أثناء فعاليات الحدث" }
  ];

  return (
    <div className="min-h-screen bg-[#030b1a] text-slate-100 overflow-hidden font-sans">
      
      {/* Visual Ambient Light Spots */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[1200px] left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[800px] right-10 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none"></div>

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
              className="text-[#d4af37] text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none outline-none"
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
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-40 mix-blend-lighten"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full text-[#d4af37] text-xs sm:text-sm font-bold tracking-wide animate-pulse">
            <Flame className="w-4 h-4 text-[#d4af37] fill-current" />
            <span>احجز الآن في كبرى منصات ترويج معمار مصر الافتراضية الأولى</span>
          </div>

          {/* Main Display Heading */}
          <div className="space-y-4 max-w-4xl mx-auto px-1 xs:px-0">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              أكبر معرض رقمي <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold">
                للبناء والتشطيبات والعقارات
              </span> في مصر 2026
            </h1>
            
            <div className="max-w-3xl mx-auto bg-slate-950/80 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-4 xs:p-6 shadow-2xl shadow-black/80 mt-6">
              <p className="text-white text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
                اعرض مشاريعك وخدماتك أمام آلاف العملاء والمستثمرين والباحثين عن البناء والتشطيب والعقارات خلال يومين من التسويق المكثف والمحكم.
              </p>
            </div>
          </div>

          {/* Call-to-actions buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <a
              id="hero-book-button"
              href="#register-section"
              onClick={(e) => scrollToSection(e, '#register-section')}
              className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-[#030b1a] rounded-xl font-bold text-base shadow-lg shadow-[#d4af37]/25 hover:shadow-brand-gold/30 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
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
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#d4af37] leading-none">٥٠٠٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">زائر مستهدف بالاسم</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">مستثمرون وباحثون حقيقيون</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#d4af37] leading-none">٥٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">رائد ومشارك رسمي</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">كبرى شركات مصر للتطوير والديكور</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#d4af37] leading-none">٣٠٠+</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">فرصة بيع متوقعة حاسمة</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">عملاء مستعدون لطلب المقايسات فورا</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden text-center group hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#d4af37] leading-none">٢</div>
                <div className="text-white text-xs sm:text-sm font-bold mt-2">يوم ترويجي مكثف</div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-1 lines-2">تغطية إعلانية شاملة لا تهدأ</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* WHY US? - ADVANTAGES SECTION */}
      <section id="why-us" className="py-20 border-y border-white/5 relative bg-[#030b1a] overflow-hidden">
        {/* Background Skyline Image with low opacity & majestic blending */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url(${skylineBg})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20 font-mono">
              ميزات التواجد والمكاسب التجارية
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              لماذا يجب على شركتك الاشتراك معنا اليوم؟
            </h2>
            <p className="text-white/75 text-xs sm:text-sm mt-2 leading-relaxed">
              تجاوز التكاليف الباهظة لتأجير المعارض التقليدية المؤقتة التي تمتد لأيام قليلة. جناحك الرقمي ينبض بالحياة, ويعمل لصالح مبيعاتك على مدار الساعة وبفاعلية تسويقية مضاعفة لجمهور مهيأ للشراء.
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
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-[#d4af37]/30 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37] mb-4 group-hover:bg-[#d4af37] group-hover:text-[#030b1a] transition-all shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#d4af37] transition-colors">
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
            <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              خطوات حاسمة نحو النجاح الإعلاني
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
              كيف يعمل المعرض الرقمي؟
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              آليتنا مصممة باحترافية تسويقية تضمن لك الحصول على نتائج قابلة للقياس والاتصال خلال بضع خطوات بسيطة:
            </p>
          </div>

          {/* Circle steps outline timeline line */}
          <div className="relative">
            {/* Visual connector line for large screens */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-white/5 via-[#d4af37]/30 to-white/5 -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div 
                  id={`step-card-${idx}`}
                  key={idx} 
                  className="flex flex-col items-center text-center space-y-4 bg-white/5 border border-white/10 p-6 rounded-3xl lg:bg-white/5 lg:border lg:border-white/10 lg:p-6 transition-all duration-300 hover:border-[#d4af37]/30"
                >
                  
                  {/* Circle number */}
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-[#d4af37]/20 flex items-center justify-center font-black text-lg text-[#d4af37] shadow-lg relative transition-all">
                    {/* Top active glowing light */}
                    <div className="absolute -top-1 w-2 h-2 rounded-full bg-[#d4af37]"></div>
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
          className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-15 mix-blend-color-dodge"
          style={{ backgroundImage: `url(${blueprintBg})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              تكامل وتنوع عريض لجمهور معمار مصر
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              القطاعات والنشاطات المشاركة بالمعرض
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              بوابة شاملة تغطي كافة مراحل البنيان والتشييد وتكامل الفراغات والمطابخ والأثاث لضمان تلبية تطلعات الزوار الباحثين عن الجودة:
            </p>
          </div>

          {/* Sectors grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sector) => {
              const IconComponent = (Icons as any)[sector.iconName] || Icons.Building2;
              return (
                <div
                  id={`sector-grid-item-${sector.id}`}
                  key={sector.id}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 flex gap-4 items-start hover:border-[#d4af37]/30 transition-all duration-300 shadow-md group"
                >
                  <div className="p-3 rounded-xl bg-white/5 text-[#d4af37] shrink-0 border border-white/5 group-hover:bg-[#d4af37] group-hover:text-[#030b1a] transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5 group-hover:text-[#d4af37] transition-colors">
                      {sector.name}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1 text-justify">
                      {sector.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3 COMPANIES VIRTUAL SHOWCASE - COVER IMAGES */}
      <section id="booth-showcase" className="py-20 bg-[#020813] border-y border-white/5 relative overflow-hidden">
        {/* subtle styling dots */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20 font-mono">
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
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#d4af37]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.contracting.bannerUrl} 
                  alt={DIGITAL_BOOTHS.contracting.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6]"
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
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#d4af37]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.realestate.bannerUrl} 
                  alt={DIGITAL_BOOTHS.realestate.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6]"
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
            <div className="bg-[#040e20] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-[#d4af37]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl group">
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden shrink-0">
                <img 
                  src={DIGITAL_BOOTHS.decor.bannerUrl} 
                  alt={DIGITAL_BOOTHS.decor.companyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.6]"
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
            <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              أرقام وحقائق تسويقية متوقعة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              إحصائيات استثنائية تؤكد قوة الجدوى الإعلانية
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2">
              خلال دورتنا وميزانيتنا الإعلانية الجسورة، نركز على تحسين أرقام الوصول والمبيعات لعارضيا بدقة بالغة:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expectedStats.map((stat, idx) => (
              <div 
                id={`expected-stat-item-${idx}`}
                key={idx} 
                className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden text-center group hover:border-[#d4af37]/45 transition-all duration-300 pointer-events-auto"
              >
                {/* Accent glow top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#d4af37]/40"></div>
                
                <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-[#d4af37] tracking-tighter leading-none mb-3">
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
          <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            خطط استثمار حجز الأجنحة بقيم مثالية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            باقات العرض وحاسبة التكلفة المتقدمة
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2">
            اختر باقة التواجد المناسبة لحجم ونشاط مؤسستك، واستخدم حاسبة الترقيات لإعداد طلب حجز متكامل يلبي طموحات توسعك في مصر:
          </p>
        </div>

        {/* Dynamic pricing list */}
        <PriceCalculator onSelectPackage={handleSelectPackage} />

      </section>

      {/* EXPANDABLE FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#d4af37] tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            إيضاحات فنية وإدارية مهمة
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            الأسئلة المتكررة والشائعة
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
  );
}
