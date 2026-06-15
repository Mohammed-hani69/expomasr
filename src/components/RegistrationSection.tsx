import React, { useState, useEffect, useRef } from 'react';
import { SECTORS, PACKAGES } from '../data';
import { RegistrationForm } from '../types';
import { sendBookingToFlask } from '../utils/googleSheets';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// @ts-ignore
import formBg from '../assets/images/booking_form_bg_1781534095031.jpg';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Layers, 
  Send, 
  CheckCircle, 
  Award, 
  Download,
  AlertCircle,
  QrCode,
  Calendar,
  Sparkles,
  RefreshCw,
  Clock
} from 'lucide-react';

interface RegistrationSectionProps {
  preSelectedPackageId: string;
}

export default function RegistrationSection({ preSelectedPackageId }: RegistrationSectionProps) {
  const [formData, setFormData] = useState<RegistrationForm>({
    companyName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: '',
    sector: SECTORS[0].id,
    selectedPackage: 'professional',
    message: '',
    acceptTerms: true
  });

  const [activeTab, setActiveTab] = useState<'form' | 'ticket'>('form');
  const [savedTicket, setSavedTicket] = useState<any>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  
  // Validation tracking
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync pre-selected package from the calculator component
  useEffect(() => {
    if (preSelectedPackageId) {
      setFormData(prev => ({ ...prev, selectedPackage: preSelectedPackageId }));
    }
  }, [preSelectedPackageId]);

  // Check if a registration already exists in LocalStorage on mount
  useEffect(() => {
    const localData = localStorage.getItem('arabic_expo_booking_2026');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setSavedTicket(parsed);
        setActiveTab('ticket');
      } catch (e) {
        console.error('Error parsing booking data', e);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "اسم الشركة مطلوب لإصدار كود الجناح";
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "اسم المسؤول مطلوب لإدراج جهة الاتصال";
    }
    
    // Egyptian phone pattern check (starts with 010, 011, 012, 015 and has 11 digits)
    const egPhoneRegex = /^01[0125]\d{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!egPhoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "يرجى كتابة رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01)";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "رقم واتساب مطلوب لإرسال الاشعارات الفورية للعملاء";
    } else if (!egPhoneRegex.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "يرجى كتابة رقم واتساب صحيح (11 رقم يبدأ بـ 01)";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "يجب الموافقة على شروط حجز المعرض والالتزام بمواعيد الترويج";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const regId = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const selectedPkgDetail = PACKAGES.find(p => p.id === formData.selectedPackage) || PACKAGES[1];
      const sectorDetail = SECTORS.find(s => s.id === formData.sector) || SECTORS[0];

      const ticketDetails = {
        id: regId,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email || '',
        city: formData.city.trim() || 'غير محدد',
        sector: sectorDetail.name,
        selectedPackage: selectedPkgDetail.name,
        price: selectedPkgDetail.price,
        message: formData.message || 'لا يوجد رسالة',
        date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };

      // Save to Flask + SQLite backend
      const syncResult = await sendBookingToFlask(ticketDetails);

      // Save to localStorage of the browser
      localStorage.setItem('arabic_expo_booking_2026', JSON.stringify(ticketDetails));
      setSavedTicket(ticketDetails);

      // Dispatch simulated registration event to notify the Lead tracker dashboard or mock database
      const regLeadEvent = new CustomEvent('add-simulated-lead', {
        detail: {
          id: regId,
          companyName: formData.companyName,
          applicant: formData.contactPerson,
          phone: formData.phone,
          sector: sectorDetail.name,
          budget: `طلب حجز: ${selectedPkgDetail.name}`,
          date: 'منذ ثوانٍ',
          status: 'joined'
        }
      });
      window.dispatchEvent(regLeadEvent);

      const dbStatus = syncResult.success
        ? 'تم الحفظ في قاعدة البيانات بنجاح ✅'
        : `تحذير قاعدة البيانات: ${syncResult.error || 'فشل المزامنة'}`;
      alert(
        `🎉تم تأكيد وإرسال طلب حجز الجناح الرقمي بنجاح!\n\n` +
        `• كود الجناح: ${regId}\n` +
        `• الشركة المشتركة: ${formData.companyName}\n` +
        `• الباقة التسويقية: ${selectedPkgDetail.name}\n` +
        `• ${dbStatus}`
      );

      setIsSubmitting(false);
      setActiveTab('ticket');
    } catch (err: any) {
      console.error(err);
      alert('نعتذر، حدثت مشكلة أثناء محاولة حفظ البيانات، يرجى المحاولة مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm("هل تريد إلغاء هذا التأكيد وحجز جناح آخر؟ سيتم حذف التذكرة الحالية من متصفحك.")) {
      localStorage.removeItem('arabic_expo_booking_2026');
      setSavedTicket(null);
      setFormData({
        companyName: '',
        contactPerson: '',
        phone: '',
        whatsapp: '',
        email: '',
        city: '',
        sector: SECTORS[0].id,
        selectedPackage: 'professional',
        message: '',
        acceptTerms: true
      });
      setActiveTab('form');
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) {
      alert("تعذر العثور على عنصر تذكرة الحجز.");
      return;
    }

    setIsDownloadingPdf(true);

    try {
      const ticketElement = ticketRef.current;

      // Capture the element using html2canvas
      const canvas = await html2canvas(ticketElement, {
        scale: 3, // Premium quality scale for crisp text rendering
        useCORS: true,
        backgroundColor: "#030b1a", // match bg-brand-blue-dark
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Set up jsPDF page format (A4)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // We want to center the ticket image beautifully inside the A4 page
      const imgWidth = 150; // standard width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      // Draw elegant deep brand backdrop
      pdf.setFillColor(3, 11, 26); // #030b1a
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

      // Draw subtle gold double frame
      pdf.setDrawColor(212, 175, 55); // #d4af37
      pdf.setLineWidth(0.8);
      pdf.rect(8, 8, pdfWidth - 16, pdfHeight - 16, "D");
      
      pdf.setDrawColor(212, 175, 55);
      pdf.setLineWidth(0.3);
      pdf.rect(10, 10, pdfWidth - 20, pdfHeight - 20, "D");

      // Add actual ticket image
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

      // Save the resulting PDF file
      const fileName = `Expo_Masr_2026_Ticket_${savedTicket?.id || "REG-2026"}.pdf`;
      pdf.save(fileName);

      alert("🎉 تم تحميل رخصة وتأكيد الجناح بنجاح! يمكنك الآن طباعتها أو إرسالها لمهندسي الدعم.");
    } catch (err: any) {
      console.error("Error generating/downloading ticket PDF:", err);
      alert("عذراً، حدث خطأ أثناء إنشاء ملف الـ PDF. يرجى محاولة تصوير تذكرة الحجز بهاتفك مؤقتاً.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {activeTab === 'form' ? (
        <div className="bg-brand-blue-medium border border-brand-blue-light/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Creative visual backdrop pattern specifically requested behind the booking form */}
          <div 
            className="absolute inset-0 z-0 select-none pointer-events-none bg-cover bg-center opacity-[0.14] mix-blend-screen"
            style={{ backgroundImage: `url(${formBg})` }}
          />
          {/* Subtle warm glow underlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none z-0"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold text-xs font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-brand-gold animate-spin" />
              <span>تسجيل فوري مشفّر وآمن لعام 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              احجز مساحتك الرقمية وجناحك الافتراضي الآن
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
              املأ البيانات المعمارية والمهنية المطلوبة بدقة، وسيتراجعها مهندسو الدعم الفني لدينا لبناء جناحك الرقمي وإطلاق الحملات الممولة لعلامتك فوراً.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Company Name */}
              <div id="form-group-companyName">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-gold" />
                  اسم الشركة الرسمي والمهني:
                </label>
                <input 
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="مثال: الفراعنة للتشطيب والديكور الفاخر"
                  className={`w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.companyName 
                      ? 'border-red-500/80 focus:ring-red-500' 
                      : 'border-brand-blue-light/80 focus:border-brand-gold focus:ring-brand-gold/30'
                  }`}
                />
                {errors.companyName && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.companyName}</p>
                )}
              </div>

              {/* Contact Person */}
              <div id="form-group-contactPerson">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-gold" />
                  اسم المسؤول المكلف بالحوار:
                </label>
                <input 
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="مثال: المهندس أحمد ممدوح"
                  className={`w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.contactPerson 
                      ? 'border-red-500/80 focus:ring-red-500' 
                      : 'border-brand-blue-light/80 focus:border-brand-gold focus:ring-brand-gold/30'
                  }`}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.contactPerson}</p>
                )}
              </div>

              {/* Phone Number */}
              <div id="form-group-phone">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  رقم الهاتف المعتمد (موبايل):
                </label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="مثال: 01001234567"
                  className={`w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 ${
                    errors.phone 
                      ? 'border-red-500/80 focus:focus:ring-red-500' 
                      : 'border-brand-blue-light/80 focus:border-brand-gold focus:ring-brand-gold/30'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div id="form-group-whatsapp">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  رقم واتساب المباشر (مستلم العملاء):
                </label>
                <input 
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="مثال: 01221234567"
                  className={`w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 ${
                    errors.whatsapp 
                      ? 'border-red-500/80 focus:ring-red-500' 
                      : 'border-brand-blue-light/80 focus:border-brand-gold focus:ring-brand-gold/30'
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.whatsapp}</p>
                )}
              </div>

              {/* City (Manual Input & Optional) */}
              <div id="form-group-city" className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  المدينة / محافظة المقر <span className="text-slate-500 font-normal text-xs">(اختياري - كتابة يدوية)</span>:
                </label>
                <input 
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="مثال: القاهرة، الجيزة، الإسكندرية (أو اتركه فارغاً)"
                  className="w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border border-brand-blue-light/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 text-right"
                />
              </div>

              {/* Sector */}
              <div id="form-group-sector">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-gold" />
                  نوع النشاط والقطاع الرئيسي بالمعرض:
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  className="w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border border-brand-blue-light/80 rounded-xl text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                >
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Selected Package */}
              <div id="form-group-selectedPackage">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-gold" />
                  الباقة التسويقية المطلوبة:
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({...formData, selectedPackage: e.target.value})}
                  className="w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border border-brand-blue-light/80 rounded-xl text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 text-right"
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.price.toLocaleString('ar-EG')} جنيه ({p.badge.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Additional Message */}
            <div id="form-group-message">
              <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5">
                تفاصيل إضافية أو ميزات تود إضافتها لجناحك الافتراضي:
              </label>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="مثال: تفاصيل عن سابقة أعمالنا في تشطيب الفلل الإدارية أو ميزات خاصة بالمطابخ والأثاث تود دمجها..."
                className="w-full text-xs sm:text-sm p-3 bg-brand-blue-dark border border-brand-blue-light/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 resize-none"
              ></textarea>
            </div>

            {/* Accept Terms checkbox */}
            <div className="flex items-start gap-2">
              <input 
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                className="accent-brand-gold w-4 h-4 mt-0.5 cursor-pointer"
              />
              <label htmlFor="acceptTerms" className="text-xs text-slate-300 cursor-pointer select-none leading-relaxed">
                أوافق بالكامل على قواعد الاشتراك والتفاعل مع العملاء حياً، وألتزم بتقديم صور حقيقية لمشاريع الشركة السابقة دون غش أو تزييف.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.acceptTerms}</p>
            )}

            {/* Submit Trigger button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-l from-brand-gold via-brand-gold-bright to-brand-gold border border-brand-gold-bright/30 rounded-xl text-brand-blue-dark font-black text-sm hover:shadow-xl hover:shadow-brand-gold/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري تسجيل رخص الجناح...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-brand-blue-dark" />
                    <span>احجز جناح شركتك الآن</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      ) : (
        /* SAVED TICKET PREVIEW SUCCESS PANEL */
        <div className="bg-brand-blue-medium border border-brand-blue-light/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fade-in">
          
          {/* Confetti styling effect */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-brand-gold to-emerald-500"></div>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-brand-gold to-brand-gold-bright text-brand-blue-dark font-black rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand-gold/15 animate-bounce mb-3">
              <CheckCircle className="w-10 h-10 text-brand-blue-dark" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">مبروك! تم حجز جناحك الرقمي بنجاح</h3>
            <p className="text-brand-gold text-xs sm:text-sm font-bold mt-1">
              تحتفظ رخصة المتصفح برمز وتذكرة الاشتراك لعام 2026 التالية:
            </p>
          </div>

          {/* Ticket layout */}
          <div ref={ticketRef} className="relative max-w-lg mx-auto bg-brand-blue-dark border border-brand-gold/30 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Ticket Header background pattern */}
            <div className="flex items-center justify-between border-b border-brand-blue-light pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-brand-blue-dark">
                  <Calendar className="w-4 h-4 text-brand-blue-dark font-black" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">البوابة الرقمية الرسمية</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Digital Expo 2026 Official Ticket</p>
                </div>
              </div>
              
              <span className="text-xs font-mono font-extrabold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/25">
                {savedTicket?.id}
              </span>
            </div>

            {/* Ticket fields */}
            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">الشركة المشتركة:</span>
                  <strong className="text-sm text-white font-bold block mt-0.5">{savedTicket?.companyName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">المسؤول الممثل للشركة:</span>
                  <strong className="text-sm text-slate-200 block mt-0.5">{savedTicket?.contactPerson}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-brand-blue-light/50 pt-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">التصنيف والقطاع الأساسي:</span>
                  <strong className="text-slate-200 block mt-0.5">{savedTicket?.sector}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">المظهر والمدينة:</span>
                  <strong className="text-slate-200 block mt-0.5">{savedTicket?.city}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-brand-blue-light/50 pt-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">الباقة التسويقية العريضة:</span>
                  <strong className="text-brand-gold font-black block mt-0.5">{savedTicket?.selectedPackage}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">التكلفة الفنية:</span>
                  <strong className="text-brand-gold font-mono font-extrabold block mt-0.5">
                    {savedTicket?.price?.toLocaleString('ar-EG')} ج.م
                  </strong>
                </div>
              </div>

              <div className="border-t border-brand-blue-light/50 pt-3 flex items-center justify-between gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">تاريخ الحجز المعتمد:</span>
                  <span className="text-slate-300 font-semibold block mt-0.5 leading-tight">{savedTicket?.date}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-2 font-bold">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    المقعد محجوز بدفعة معلّقة
                  </span>

                  <span className="text-[10px] text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-2 font-bold block w-fit">
                    <CheckCircle className="w-3 h-3 text-[#d4af37]" />
                    تم حفظ البيانات في قاعدة البيانات بنجاح
                  </span>
                </div>
                
                {/* QR Code Simualtion */}
                <div className="shrink-0 text-center bg-white p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-brand-blue-dark" />
                </div>
              </div>

            </div>

          </div>

          {/* Action triggers below ticket */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={handleDownloadTicket}
              disabled={isDownloadingPdf}
              className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-l from-brand-gold to-brand-gold-bright text-brand-blue-dark text-xs font-black rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-gold/15 transition-all cursor-pointer ${isDownloadingPdf ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isDownloadingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 text-brand-blue-dark animate-spin" />
                  <span>جاري إنشاء ملف PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-brand-blue-dark" />
                  <span>تحميل رخصة وتأكيد الجناح (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-brand-blue-light/50 border border-brand-blue-light text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-blue-light hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>حجز جناح لشركة أخرى</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400 max-w-lg mx-auto">
            <span>سيتصل بك أحد مهندسي الدعم والتخطيط لدينا على رقم <strong>{savedTicket?.phone}</strong> أو عبر الواتساب لإكمال إعداد الكتالوج واختيار ثيمات العرض الفاخرة لشركتك.</span>
          </div>

        </div>
      )}

    </div>
  );
}
