import React, { useState, useEffect, useRef } from 'react';
import { DIGITAL_BOOTHS } from '../data';
import { DigitalBooth, Project } from '../types';
import { 
  Building2, 
  MessageSquare, 
  Phone, 
  Mail, 
  Image as ImageIcon, 
  Video, 
  Briefcase, 
  Info, 
  Award, 
  Send, 
  Check, 
  Plus, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Box,
  Eye,
  Layers,
  Compass,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

interface InteractiveBoothProps {
  initialSector?: 'contracting' | 'realestate' | 'decor';
  onBackToMain?: () => void;
  isStandalonePage?: boolean;
}

export default function InteractiveBooth({
  initialSector = 'contracting',
  onBackToMain,
  isStandalonePage = false
}: InteractiveBoothProps) {
  const [activeSector, setActiveSector] = useState<'contracting' | 'realestate' | 'decor'>(initialSector);
  const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'projects'>('about');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // 3D Isometric Viewport States
  const [rotationY, setRotationY] = useState(-18);
  const [rotationX, setRotationX] = useState(14);
  const [zoom, setZoom] = useState(0.95);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Drag states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragRot, setDragRot] = useState({ x: 14, y: -18 });

  // Dynamic automatic 3D Orbit timer
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotationY((prev) => {
        const next = prev + 0.16;
        return next >= 360 ? next - 360 : next;
      });
    }, 28);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useEffect(() => {
    setActiveSector(initialSector);
    setActiveTab('about');
  }, [initialSector]);
  
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Quotation form state
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    serviceType: 'مقايسة فنية',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const currentBooth: DigitalBooth = DIGITAL_BOOTHS[activeSector];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Dispatch custom event to sync with the Leads Tracker Board
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

      // Reset success state after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setQuoteForm({ name: '', phone: '', serviceType: 'مقايسة فنية', notes: '' });
      }, 5000 /* 5 seconds */);
    }, 1200);
  };

  const handleWhatsAppSimulation = () => {
    alert(`محاكاة واتساب: سيتم الآن توجيه العميل إلى رقم الواتساب المباشر الخاص بشركتك (${currentBooth.whatsappNumber}) مع رسالة مخصصة لطلب تفاصيل الخدمات.`);
  };

  return (
    <div className="bg-brand-blue-medium border border-brand-blue-light/60 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative">
      
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage} 
            alt="صورة مكبرة" 
            className="max-w-full max-h-[85vh] rounded-xl object-contain border border-brand-gold/30 shadow-2xl" 
          />
        </div>
      )}

      {/* Section Header */}
      {!isStandalonePage ? (
        <>
          <div className="text-center mb-8">
            <span className="text-xs sm:text-sm font-bold text-brand-gold tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              استعراض تفاعلي حي للجناح الافتراضي
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              كيف ستبدو شركتك داخل المعرض الرقمي؟
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              اختر قطاعاً لمشاهدة مثال حي لجناح مجهز بالكامل. تفاعل مع الأزرار والمعارض لتجربة واجهة عميلك الخاصة.
            </p>
          </div>

          {/* Sector Switchers */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => { setActiveSector('contracting'); setActiveTab('about'); }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeSector === 'contracting'
                  ? 'bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold text-brand-blue-dark shadow-lg shadow-brand-gold/25'
                  : 'bg-brand-blue-light/50 text-slate-300 hover:text-white hover:bg-brand-blue-light'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>جناح شركة مقاولات</span>
            </button>

            <button
              onClick={() => { setActiveSector('realestate'); setActiveTab('about'); }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeSector === 'realestate'
                  ? 'bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold text-brand-blue-dark shadow-lg shadow-brand-gold/25'
                  : 'bg-brand-blue-light/50 text-slate-300 hover:text-white hover:bg-brand-blue-light'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>جناح شركة تطوير عقاري</span>
            </button>

            <button
              onClick={() => { setActiveSector('decor'); setActiveTab('about'); }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeSector === 'decor'
                  ? 'bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold text-brand-blue-dark shadow-lg shadow-brand-gold/25'
                  : 'bg-brand-blue-light/50 text-slate-300 hover:text-white hover:bg-brand-blue-light'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>جناح شركة ديكور وتصميم</span>
            </button>
          </div>
        </>
      ) : (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1422] border border-[#8B5E3C]/25">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8B5E3C]/10 rounded-xl border border-[#8B5E3C]/30 text-[#8B5E3C]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-[#8B5E3C] font-bold block uppercase tracking-wider">مجسم الأجنحة الافتراضية المستقلة</span>
              <h4 className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                أنت الآن تتصفح الجناح الرقمي المخصص لـ <span className="text-brand-gold">{currentBooth.companyName}</span>
              </h4>
            </div>
          </div>
          <button
            onClick={onBackToMain}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-[#8B5E3C] hover:text-[#030b1a] rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            ← العودة لجميع العارضين
          </button>
        </div>
      )}

      {/* Booth Hero Banner - Immersive Virtual Tour */}
      <div className="relative h-72 sm:h-96 lg:h-[32rem] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 mb-6 overflow-hidden rounded-b-3xl shadow-2xl group">
        {/* Background Image with Parallax effect */}
        <img 
          src={currentBooth.bannerUrl} 
          alt={currentBooth.companyName}
          className="w-full h-full object-cover brightness-[0.65] group-hover:brightness-[0.8] transition-all duration-500 scale-100 group-hover:scale-105"
        />
        
        {/* 360 Virtual Tour Effect - Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 via-30% to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-brand-blue-medium/20 via-transparent to-brand-blue-medium/20"></div>
        
        {/* Radial glow effect for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Virtual Tour Badge - Top Right */}
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-brand-gold/40">
            <Compass className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-bold text-brand-gold">جولة افتراضية 360°</span>
          </div>
        </div>
        
        {/* Overlay Title - Bottom Section */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-12 bg-gradient-to-t from-black/60 via-black/30 via-50% to-transparent flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
            <span className="text-[10px] sm:text-xs font-black text-brand-blue-dark bg-brand-gold px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
              <Award className="w-3.5 h-3.5 text-brand-blue-dark fill-current" />
              <span>عارض موثق VIP</span>
            </span>
            <span className="text-[10px] sm:text-xs text-white bg-blue-500/80 backdrop-blur px-3 py-1 rounded-full font-bold border border-blue-400/50">
              جناح رقم {activeSector === 'contracting' ? '12' : activeSector === 'realestate' ? '07' : '23'}
            </span>
          </div>
          <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
            {currentBooth.companyName}
          </h4>
          <p className="text-brand-gold-bright text-sm sm:text-lg font-semibold mt-2 drop-shadow-md">
            {currentBooth.tagline}
          </p>
        </div>
      </div>

      {/* Main Booth Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-brand-blue-dark/50 border border-brand-blue-light/40 rounded-2xl p-4 sm:p-6 overflow-hidden">
        
        {/* RIGHT COLUMN: The Interactive Virtual Booth Canvas (Lg: 8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">

          {/* Booth Sub Navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-none border-b border-brand-blue-light/80 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap gap-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex-shrink-0 ${
                activeTab === 'about'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                عن الشركة والتعريف
              </span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex-shrink-0 ${
                activeTab === 'gallery'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                معرض الصور ({currentBooth.gallery.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex-shrink-0 ${
                activeTab === 'projects'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                أبرز المشاريع ({currentBooth.projects.length})
              </span>
            </button>
          </div>

          {/* Tab Content Rendering */}
          <div className="min-h-[250px]">
            
            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                  {currentBooth.about}
                </p>
                
                {/* Simulated Video Section */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-brand-gold" />
                    شاهد الفيديو التعريفي واللقاء الإعلاني للشركة:
                  </h5>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-brand-blue-light group">
                    <video
                      src={currentBooth.videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <div className="w-16 h-16 rounded-full bg-brand-gold/80 text-brand-blue-dark flex items-center justify-center shadow-lg shadow-brand-gold/20">
                        <Video className="w-8 h-8 text-brand-blue-dark fill-current" />
                      </div>
                      <span className="text-xs sm:text-sm text-white font-bold mt-3">تشغيل الفيديو الترويجي الرسمي للمؤسسة</span>
                      <span className="text-[10px] text-slate-300">فيديو تعريفي عالي الدقة يعرض المصنع والمشاريع القائمة</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">انقر على أي صورة لتكبيرها واستعراض تفاصيل التشطيب أو مواد البناء بوضوح فائق:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentBooth.gallery.map((img, i) => (
                    <div 
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-brand-blue-light/50 cursor-zoom-in hover:border-brand-gold/50 transition-all duration-300"
                    >
                      <img 
                        src={img} 
                        alt={`معرض صور ${i+1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <Plus className="w-6 h-6 text-brand-gold" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentBooth.projects.map((project: Project, idx: number) => (
                  <div key={idx} className="bg-brand-blue-light/30 border border-brand-blue-light/60 rounded-xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="font-bold text-white text-sm">{project.title}</h5>
                      <p className="text-xs text-slate-400 mt-1 lines-2">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* LEFT COLUMN: Business Contact card & Quotation form (Lg: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Quick Contacts Widget */}
          <div className="bg-[#0b1625] border border-brand-blue-light rounded-xl p-4 space-y-4">
            <h5 className="text-white font-extrabold text-sm border-b border-brand-blue-light/60 pb-2">التواصل والاستفسار المباشر</h5>
            
            <div className="space-y-3">
              <button 
                onClick={handleWhatsAppSimulation}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/25 transition-all text-xs font-bold text-right cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                  <span>تواصل فوري واتساب</span>
                </div>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </button>

              <div className="flex items-center justify-between text-xs p-2.5 bg-slate-900/40 rounded-lg text-slate-300 border border-slate-800">
                <span>الاتصال التلفوني:</span>
                <span className="font-mono text-white font-bold">{currentBooth.phoneNumber}</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 bg-slate-900/40 rounded-lg text-slate-300 border border-slate-800">
                <span>البريد المعتمد:</span>
                <span className="font-mono text-white text-[11px] truncate">{currentBooth.email}</span>
              </div>
            </div>
          </div>

          {/* Simulation Quotation request form */}
          <div className="bg-[#0b1625] border border-brand-blue-light rounded-xl p-4">
            <h5 className="text-white font-extrabold text-sm border-b border-brand-blue-light/60 pb-2 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-brand-gold" />
              أرسل طلب عرض سعر حقيقي
            </h5>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-center my-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-brand-blue-dark flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5 font-black" />
                </div>
                <h6 className="font-bold text-white text-xs">تم إرسال المقايسة بنجاح!</h6>
                <p className="text-[10px] text-slate-300 mt-1">
                  تم إدراج طلبك لشركة <span className="text-brand-gold font-bold">{currentBooth.companyName}</span>. 
                  شاهد تحديث طلبك في لوحة التحكم في الأسفل!
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5 mt-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">اسم العميل بالكامل:</label>
                  <input 
                    type="text" 
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    placeholder="مثال: المهندس هاني غنيم"
                    required
                    className="w-full text-xs p-2.5 bg-brand-blue-dark border border-brand-blue-light rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">رقم الهاتف أو الواتساب:</label>
                  <input 
                    type="tel" 
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    placeholder="مثال: 01002345678"
                    required
                    className="w-full text-xs p-2.5 bg-brand-blue-dark border border-brand-blue-light rounded-lg text-white placeholder-slate-500 font-mono focus:outline-none focus:border-brand-gold text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">نوع الطلب الفني:</label>
                  <select 
                    value={quoteForm.serviceType}
                    onChange={(e) => setQuoteForm({...quoteForm, serviceType: e.target.value})}
                    className="w-full text-xs p-2.5 bg-brand-blue-dark border border-brand-blue-light rounded-lg text-white focus:outline-none focus:border-brand-gold"
                  >
                    <option value="طلب مقايسة وحساب تكلفة">طلب مقايسة وحساب تكلفة</option>
                    <option value="استفسار عن الأسعار والخامات">استفسار عن الأسعار والخامات</option>
                    <option value="طلب حجز موعد اتصال أو معاينة">طلب حجز موعد اتصال أو معاينة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">تفاصيل إضافية (اختياري):</label>
                  <textarea 
                    rows={2}
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm({...quoteForm, notes: e.target.value})}
                    placeholder="مساحة الشقة أو الشاليه وتفاصيل التشطيب المطلوبة..."
                    className="w-full text-xs p-2.5 bg-brand-blue-dark border border-brand-blue-light rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-l from-brand-gold to-brand-gold-bright text-brand-blue-dark font-black text-xs hover:shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin h-4 h-4 border-2 border-brand-blue-dark border-t-transparent rounded-full"></span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال طلب السعر المباشر</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-3 py-1.5 px-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] text-yellow-300 text-center">
              <span>هذا الإرسال يزود الشركات العارضة ببيانات اتصال فورية. جرب ملء البيانات لرؤية العملية!</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
