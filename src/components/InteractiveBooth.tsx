import React, { useState, useEffect, useRef } from 'react';
import { DIGITAL_BOOTHS } from '../data';
import { DigitalBooth, Project } from '../types';
import { 
  Building2, MessageSquare, Phone, Mail, Image as ImageIcon,
  Video, Briefcase, Info, Award, Send, Check, Plus, ExternalLink,
  ChevronLeft, ChevronRight, X, Sparkles, Box, Eye, Layers,
  Compass, HelpCircle, RefreshCw, Crown, Gem, Medal, LayoutList,
  ShieldCheck, Star, TrendingUp, BarChart3, Users, Zap
} from 'lucide-react';

interface InteractiveBoothProps {
  initialSector?: 'contracting' | 'realestate' | 'decor';
  onBackToMain?: () => void;
  isStandalonePage?: boolean;
  packageId?: string;
}

type DesignKey = 'basic' | 'professional' | 'premium' | 'sponsor';

interface DesignTokens {
  headerBg: string;
  headerBorder: string;
  headerLabel: string;
  badgeIcon: React.ElementType;
  badgeText: string;
  badgeColor: string;
  show360Badge: boolean;
  heroTagBg: string;
  heroTagText: string;
  tabActiveBg: string;
  tabActiveText: string;
  tabBorder: string;
  contentBg: string;
  contentBorder: string;
  sidebarBg: string;
  sidebarBorder: string;
  sidebarAccent: string;
  btnBg: string;
  btnHover: string;
  accentColor: string;
  accentLight: string;
  sectionTitleBorder: string;
}

const DESIGNS: Record<DesignKey, DesignTokens> = {
  basic: {
    headerBg: 'bg-white',
    headerBorder: 'border-slate-200',
    headerLabel: 'جناح أساسي',
    badgeIcon: LayoutList,
    badgeText: 'باقة اقتصادية',
    badgeColor: 'text-slate-600 bg-slate-100',
    show360Badge: false,
    heroTagBg: 'bg-white/90',
    heroTagText: 'text-slate-700',
    tabActiveBg: 'bg-slate-900',
    tabActiveText: 'text-white',
    tabBorder: 'border-slate-300',
    contentBg: 'bg-white',
    contentBorder: 'border-slate-200',
    sidebarBg: 'bg-white',
    sidebarBorder: 'border-slate-200',
    sidebarAccent: 'text-slate-600',
    btnBg: 'bg-slate-800',
    btnHover: 'bg-slate-700',
    accentColor: 'text-slate-700',
    accentLight: 'bg-slate-50',
    sectionTitleBorder: 'border-slate-200',
  },
  professional: {
    headerBg: 'bg-amber-50',
    headerBorder: 'border-amber-200',
    headerLabel: 'جناح احترافي',
    badgeIcon: Medal,
    badgeText: 'الأكثر مبيعاً',
    badgeColor: 'text-amber-700 bg-amber-100',
    show360Badge: true,
    heroTagBg: 'bg-black/60 backdrop-blur-md',
    heroTagText: 'text-[#8B5E3C]',
    tabActiveBg: 'bg-[#8B5E3C]',
    tabActiveText: 'text-white',
    tabBorder: 'border-[#8B5E3C]',
    contentBg: 'bg-slate-50',
    contentBorder: 'border-slate-200',
    sidebarBg: 'bg-slate-50',
    sidebarBorder: 'border-slate-200',
    sidebarAccent: 'text-[#8B5E3C]',
    btnBg: 'bg-[#8B5E3C]',
    btnHover: 'bg-[#7a5234]',
    accentColor: 'text-[#8B5E3C]',
    accentLight: 'bg-amber-50',
    sectionTitleBorder: 'border-amber-200',
  },
  premium: {
    headerBg: 'bg-indigo-50',
    headerBorder: 'border-indigo-200',
    headerLabel: 'جناح مميز',
    badgeIcon: Gem,
    badgeText: 'باقة مميزة',
    badgeColor: 'text-indigo-700 bg-indigo-100',
    show360Badge: true,
    heroTagBg: 'bg-white/20 backdrop-blur-md',
    heroTagText: 'text-white',
    tabActiveBg: 'bg-indigo-600',
    tabActiveText: 'text-white',
    tabBorder: 'border-indigo-400',
    contentBg: 'bg-white',
    contentBorder: 'border-indigo-100',
    sidebarBg: 'bg-indigo-50/50',
    sidebarBorder: 'border-indigo-200',
    sidebarAccent: 'text-indigo-600',
    btnBg: 'bg-indigo-600',
    btnHover: 'bg-indigo-700',
    accentColor: 'text-indigo-600',
    accentLight: 'bg-indigo-50',
    sectionTitleBorder: 'border-indigo-200',
  },
  sponsor: {
    headerBg: 'bg-gradient-to-l from-[#C49A6C]/20 to-[#8B5E3C]/10',
    headerBorder: 'border-[#C49A6C]/40',
    headerLabel: 'جناح الراعي الرسمي',
    badgeIcon: Crown,
    badgeText: 'الراعي الرسمي',
    badgeColor: 'text-[#8B5E3C] bg-[#C49A6C]/20',
    show360Badge: true,
    heroTagBg: 'bg-black/50 backdrop-blur-md',
    heroTagText: 'text-[#C49A6C]',
    tabActiveBg: 'bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C]',
    tabActiveText: 'text-white',
    tabBorder: 'border-[#C49A6C]',
    contentBg: 'bg-white',
    contentBorder: 'border-[#C49A6C]/20',
    sidebarBg: 'bg-gradient-to-b from-[#C49A6C]/5 to-[#8B5E3C]/5',
    sidebarBorder: 'border-[#C49A6C]/30',
    sidebarAccent: 'text-[#8B5E3C]',
    btnBg: 'bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C]',
    btnHover: 'opacity-90',
    accentColor: 'text-[#C49A6C]',
    accentLight: 'bg-[#C49A6C]/10',
    sectionTitleBorder: 'border-[#C49A6C]/30',
  },
};

export default function InteractiveBooth({
  initialSector = 'contracting',
  onBackToMain,
  isStandalonePage = false,
  packageId = 'basic'
}: InteractiveBoothProps) {
  const d = DESIGNS[packageId as DesignKey] || DESIGNS.basic;
  const BadgeIcon = d.badgeIcon;

  const [activeSector, setActiveSector] = useState<'contracting' | 'realestate' | 'decor'>(initialSector);
  const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'projects'>('about');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    serviceType: 'مقايسة فنية',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setActiveSector(initialSector);
    setActiveTab('about');
  }, [initialSector]);

  const currentBooth: DigitalBooth = DIGITAL_BOOTHS[activeSector];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const newLeadEvent = new CustomEvent('add-simulated-lead', {
        detail: {
          id: `L-${Math.floor(100 + Math.random() * 900)}`,
          companyName: currentBooth.companyName,
          applicant: quoteForm.name,
          phone: quoteForm.phone,
          sector: activeSector === 'contracting' ? 'المقاولات والإنشاءات' : activeSector === 'realestate' ? 'التطوير العقاري' : 'التصميم الداخلي واللاندسكيب',
          budget: quoteForm.serviceType,
          date: 'منذ ثوانٍ',
          status: 'new'
        }
      });
      window.dispatchEvent(newLeadEvent);
      setTimeout(() => {
        setSubmitSuccess(false);
        setQuoteForm({ name: '', phone: '', serviceType: 'مقايسة فنية', notes: '' });
      }, 5000);
    }, 1200);
  };

  const handleWhatsAppSimulation = () => {
    alert(`محاكاة واتساب: سيتم الآن توجيه العميل إلى رقم الواتساب المباشر الخاص بشركتك (${currentBooth.whatsappNumber}) مع رسالة مخصصة لطلب تفاصيل الخدمات.`);
  };

  return (
    <div className={`bg-white border ${d.contentBorder} rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm relative`}>
      
      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all">
            <X className="w-6 h-6" />
          </button>
          <img src={lightboxImage} alt="صورة مكبرة" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
        </div>
      )}

      {/* Section Header (non-standalone) */}
      {!isStandalonePage ? (
        <>
          <div className="text-center mb-8">
            <span className="text-xs sm:text-sm font-bold text-brand-gold tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              استعراض تفاعلي حي للجناح الافتراضي
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">كيف ستبدو شركتك داخل المعرض الرقمي؟</h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">اختر قطاعاً لمشاهدة مثال حي لجناح مجهز بالكامل.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {(['contracting', 'realestate', 'decor'] as const).map((s) => (
              <button key={s} onClick={() => { setActiveSector(s); setActiveTab('about'); }}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeSector === s ? `${d.tabActiveBg} ${d.tabActiveText} shadow-lg` : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {s === 'contracting' ? <Briefcase className="w-4 h-4" /> : s === 'realestate' ? <Building2 className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                <span>{s === 'contracting' ? 'جناح شركة مقاولات' : s === 'realestate' ? 'جناح تطوير عقاري' : 'جناح ديكور'}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        /* STANDALONE HEADER — varies by package */
        <div className={`mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl ${d.headerBg} border ${d.headerBorder}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${d.sidebarBorder} ${d.accentColor} ${d.accentLight}`}>
              <BadgeIcon className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] font-bold block uppercase tracking-wider ${d.accentColor}`}>{d.headerLabel}</span>
              <h4 className="text-slate-900 text-xs sm:text-sm font-extrabold leading-tight">
                {currentBooth.companyName}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${d.badgeColor}`}>{d.badgeText}</span>
            <button onClick={onBackToMain} className={`px-4 py-2 ${d.btnBg} ${d.btnHover} text-white rounded-xl text-xs font-semibold transition-all cursor-pointer`}>
              ← العودة
            </button>
          </div>
        </div>
      )}

      {/* HERO BANNER — varies by package */}
      <div className={`relative overflow-hidden rounded-b-3xl shadow-2xl mb-6 group ${
        packageId === 'basic' ? 'h-56 sm:h-72 -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8' :
        packageId === 'professional' ? 'h-72 sm:h-96 lg:h-[32rem] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8' :
        packageId === 'premium' ? 'h-80 sm:h-[28rem] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8' :
        'h-[28rem] sm:h-[34rem] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8'
      }`}>
        <img src={currentBooth.bannerUrl} alt={currentBooth.companyName}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            packageId === 'basic' ? 'brightness-[0.75]' :
            packageId === 'sponsor' ? 'brightness-[0.55]' :
            'brightness-[0.65]'
          }`}
        />
        <div className={`absolute inset-0 ${
          packageId === 'basic' ? 'bg-gradient-to-t from-black/60 to-transparent' :
          packageId === 'professional' ? 'bg-gradient-to-t from-black/50 via-black/20 via-30% to-transparent' :
          packageId === 'premium' ? 'bg-gradient-to-t from-black/70 via-black/30 to-black/10' :
          'bg-gradient-to-t from-black/80 via-black/40 to-black/10'
        }`}></div>

        {packageId === 'premium' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        )}
        {packageId === 'sponsor' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none"></div>
        )}

        {/* Top-right badges */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-col items-end gap-2">
          {d.show360Badge && (
            <div className={`flex items-center gap-2 ${d.heroTagBg} px-3 sm:px-4 py-2 rounded-full border border-white/20`}>
              <Compass className={`w-4 h-4 ${d.accentColor} animate-spin`} style={{ animationDuration: '4s' }} />
              <span className={`text-xs sm:text-sm font-bold ${d.heroTagText}`}>جولة افتراضية 360°</span>
            </div>
          )}
          {packageId === 'sponsor' && (
            <div className="flex items-center gap-1.5 bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C] px-3 py-1.5 rounded-full shadow-lg">
              <Crown className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-black text-white">الراعي الرسمي</span>
            </div>
          )}
          {packageId === 'premium' && (
            <div className="flex items-center gap-1.5 bg-indigo-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-indigo-400/50">
              <Gem className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-black text-white">جناح مميز</span>
            </div>
          )}
          {packageId === 'professional' && (
            <div className="flex items-center gap-1.5 bg-amber-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-400/50">
              <Medal className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-black text-white">جناح احترافي</span>
            </div>
          )}
        </div>

        {/* Bottom overlay title */}
        <div className={`absolute inset-x-0 bottom-0 ${
          packageId === 'basic' ? 'p-4 sm:p-6' :
          packageId === 'sponsor' ? 'p-8 sm:p-12' :
          'p-6 sm:p-8 lg:p-12'
        } bg-gradient-to-t from-black/60 via-black/30 via-50% to-transparent flex flex-col justify-end`}>
          {packageId !== 'basic' && (
            <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
              <span className={`text-[10px] sm:text-xs font-black px-3 py-1 rounded-full flex items-center gap-2 shadow-lg ${
                packageId === 'professional' ? 'bg-[#8B5E3C] text-white' :
                packageId === 'premium' ? 'bg-indigo-500 text-white' :
                'bg-gradient-to-l from-[#C49A6C] to-[#8B5E3C] text-white'
              }`}>
                <Award className="w-3.5 h-3.5 fill-current" />
                <span>{packageId === 'professional' ? 'عارض موثق VIP' : packageId === 'premium' ? 'متميز ومعتمد' : 'الشريك الحصري'}</span>
              </span>
              <span className="text-[10px] sm:text-xs text-white bg-blue-500/80 backdrop-blur px-3 py-1 rounded-full font-bold border border-blue-400/50">
                جناح رقم {activeSector === 'contracting' ? '12' : activeSector === 'realestate' ? '07' : '23'}
              </span>
            </div>
          )}
          <h4 className={`font-black text-white drop-shadow-lg ${
            packageId === 'basic' ? 'text-xl sm:text-2xl' :
            packageId === 'sponsor' ? 'text-3xl sm:text-5xl' :
            'text-2xl sm:text-4xl lg:text-5xl'
          }`}>{currentBooth.companyName}</h4>
          <p className={`${d.accentColor} ${
            packageId === 'basic' ? 'text-xs sm:text-sm' :
            packageId === 'sponsor' ? 'text-base sm:text-xl' :
            'text-sm sm:text-lg'
          } font-semibold mt-1 sm:mt-2 drop-shadow-md`}>{currentBooth.tagline}</p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${d.contentBg} border ${d.contentBorder} rounded-2xl p-4 sm:p-6 overflow-hidden`}>
        
        {/* RIGHT: 8 cols */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* TABS */}
          <div className={`flex overflow-x-auto scrollbar-none border-b ${d.sectionTitleBorder} -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap gap-1`}>
            {(['about', 'gallery', 'projects'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex-shrink-0 ${
                  activeTab === tab
                    ? `${d.tabBorder} ${d.accentColor}`
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tab === 'about' ? <Info className="w-3.5 h-3.5" /> :
                   tab === 'gallery' ? <ImageIcon className="w-3.5 h-3.5" /> :
                   <Briefcase className="w-3.5 h-3.5" />}
                  {tab === 'about' ? 'عن الشركة' : tab === 'gallery' ? `معرض الصور (${currentBooth.gallery.length})` : `أبرز المشاريع (${currentBooth.projects.length})`}
                </span>
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="min-h-[250px]">
            
            {/* ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <p className="text-slate-600 text-sm leading-relaxed text-justify">{currentBooth.about}</p>
                <div className="space-y-3">
                  <h5 className={`text-sm font-bold text-slate-900 flex items-center gap-2 ${d.accentColor}`}>
                    <Video className="w-4 h-4" />
                    شاهد الفيديو التعريفي:
                  </h5>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-300 group">
                    <video src={currentBooth.videoUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30`}>
                      <div className={`w-16 h-16 rounded-full ${d.btnBg} text-white flex items-center justify-center shadow-lg`}>
                        <Video className="w-8 h-8 text-white fill-current" />
                      </div>
                      <span className="text-xs sm:text-sm text-white font-bold mt-3">تشغيل الفيديو الترويجي</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">انقر على أي صورة لتكبيرها:</p>
                <div className={`grid ${packageId === 'basic' ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-2 sm:grid-cols-4'} gap-3`}>
                  {currentBooth.gallery.map((img, i) => (
                    <div key={i} onClick={() => setLightboxImage(img)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in hover:border-slate-400 transition-all duration-300"
                    >
                      <img src={img} alt={`صورة ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className={`grid ${packageId === 'basic' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
                {currentBooth.projects.map((project: Project, idx: number) => (
                  <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    packageId === 'basic' ? 'bg-white border-slate-200 flex items-center gap-3 p-3' :
                    packageId === 'professional' ? 'bg-white border-slate-200 hover:border-[#8B5E3C]/30' :
                    packageId === 'premium' ? 'bg-white border-indigo-100 hover:border-indigo-300 shadow-sm' :
                    'bg-white border-[#C49A6C]/20 hover:border-[#C49A6C]/50 shadow-sm'
                  }`}>
                    <img src={project.imageUrl} alt={project.title}
                      className={packageId === 'basic' ? 'w-20 h-20 rounded-lg object-cover shrink-0' : 'w-full h-32 object-cover'}
                    />
                    <div className={packageId === 'basic' ? '' : 'p-4'}>
                      <h5 className={`font-bold text-slate-900 ${packageId === 'basic' ? 'text-xs' : 'text-sm'}`}>{project.title}</h5>
                      <p className={`text-slate-500 mt-1 ${packageId === 'basic' ? 'text-[10px] line-clamp-2' : 'text-xs lines-2'}`}>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* LEFT SIDEBAR: 4 cols — varies by package */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* CONTACT CARD */}
          <div className={`${d.sidebarBg} border ${d.sidebarBorder} rounded-xl p-4 space-y-4`}>
            <h5 className={`text-slate-900 font-extrabold text-sm border-b ${d.sectionTitleBorder} pb-2 flex items-center gap-2`}>
              <MessageSquare className={`w-4 h-4 ${d.accentColor}`} />
              التواصل والاستفسار
            </h5>
            
            <div className="space-y-3">
              <button onClick={handleWhatsAppSimulation}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all text-xs font-bold text-right cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                  <span>تواصل فوري واتساب</span>
                </div>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </button>

              <div className="flex items-center justify-between text-xs p-2.5 bg-white rounded-lg text-slate-600 border border-slate-200">
                <span>الاتصال:</span>
                <span className="font-mono text-slate-900 font-bold">{currentBooth.phoneNumber}</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 bg-white rounded-lg text-slate-600 border border-slate-200">
                <span>البريد:</span>
                <span className="font-mono text-slate-900 text-[11px] truncate">{currentBooth.email}</span>
              </div>

              {packageId === 'sponsor' && (
                <div className="flex items-center justify-between text-xs p-2.5 bg-gradient-to-l from-[#C49A6C]/10 to-[#8B5E3C]/10 rounded-lg border border-[#C49A6C]/30">
                  <span className="text-[#8B5E3C] font-bold">دعم VIP:</span>
                  <span className="text-[#8B5E3C] font-bold">دعم فوري على مدار الساعة</span>
                </div>
              )}
              {packageId === 'premium' && (
                <div className="flex items-center justify-between text-xs p-2.5 bg-indigo-50 rounded-lg border border-indigo-200">
                  <span className="text-indigo-600 font-bold">مدير حساب:</span>
                  <span className="text-indigo-600 font-bold">رد خلال 15 دقيقة</span>
                </div>
              )}
            </div>
          </div>

          {/* QUOTATION FORM */}
          <div className={`${d.sidebarBg} border ${d.sidebarBorder} rounded-xl p-4`}>
            <h5 className={`text-slate-900 font-extrabold text-sm border-b ${d.sectionTitleBorder} pb-2 flex items-center gap-1.5 ${d.accentColor}`}>
              <Send className="w-4 h-4" />
              أرسل طلب عرض سعر
            </h5>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center my-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5 font-black" />
                </div>
                <h6 className="font-bold text-emerald-800 text-xs">تم الإرسال بنجاح!</h6>
                <p className="text-[10px] text-emerald-600 mt-1">تم إدراج طلبك لشركة <span className={`font-bold ${d.accentColor}`}>{currentBooth.companyName}</span>.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5 mt-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الاسم:</label>
                  <input type="text" value={quoteForm.name} onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    placeholder="مثال: المهندس هاني غنيم" required
                    className={`w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none ${
                      packageId === 'sponsor' ? 'focus:border-[#C49A6C]' : packageId === 'premium' ? 'focus:border-indigo-400' : 'focus:border-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">رقم الهاتف:</label>
                  <input type="tel" value={quoteForm.phone} onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    placeholder="مثال: 01002345678" required
                    className={`w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 font-mono focus:outline-none text-right ${
                      packageId === 'sponsor' ? 'focus:border-[#C49A6C]' : packageId === 'premium' ? 'focus:border-indigo-400' : 'focus:border-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">نوع الطلب:</label>
                  <select value={quoteForm.serviceType} onChange={(e) => setQuoteForm({...quoteForm, serviceType: e.target.value})}
                    className={`w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none ${
                      packageId === 'sponsor' ? 'focus:border-[#C49A6C]' : packageId === 'premium' ? 'focus:border-indigo-400' : 'focus:border-slate-400'
                    }`}
                  >
                    <option>طلب مقايسة وحساب تكلفة</option>
                    <option>استفسار عن الأسعار والخامات</option>
                    <option>طلب حجز موعد اتصال أو معاينة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">تفاصيل (اختياري):</label>
                  <textarea rows={2} value={quoteForm.notes} onChange={(e) => setQuoteForm({...quoteForm, notes: e.target.value})}
                    placeholder="مساحة الشقة وتفاصيل التشطيب..."
                    className={`w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none resize-none ${
                      packageId === 'sponsor' ? 'focus:border-[#C49A6C]' : packageId === 'premium' ? 'focus:border-indigo-400' : 'focus:border-slate-400'
                    }`}
                  ></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-lg ${d.btnBg} ${d.btnHover} text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer`}
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <><Send className="w-3.5 h-3.5" /><span>إرسال الطلب</span></>
                  )}
                </button>
              </form>
            )}

            <div className={`mt-3 py-1.5 px-2 ${d.accentLight} border ${d.sidebarBorder} rounded text-[10px] ${d.accentColor} text-center`}>
              <span>هذا الإرسال يزود الشركات العارضة ببيانات اتصال فورية.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
