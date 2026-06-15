import { useState, useEffect } from 'react';
import { INITIAL_MOCK_LEADS } from '../data';
import { MockLead } from '../types';
import { 
  Users, 
  TrendingUp, 
  Download, 
  Filter, 
  CheckCircle, 
  MessageSquare, 
  Sparkles,
  Phone,
  Search,
  Check,
  Zap,
  Settings,
  Link,
  AlertCircle,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';
import {
  getGoogleSheetUrl,
  setGoogleSheetUrl,
  getSpreadsheetUrl,
  setSpreadsheetUrl,
  GOOGLE_APPS_SCRIPT_CODE,
  sendBookingToGoogleSheets
} from '../utils/googleSheets';

export default function LeadDashboard() {
  const [leads, setLeads] = useState<MockLead[]>(INITIAL_MOCK_LEADS);
  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalLeadsCount, setTotalLeadsCount] = useState(324);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Google Sheets admin settings modal state
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [sheetUrl, setSheetUrlState] = useState('');
  const [scriptUrl, setScriptUrlState] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'testing' | 'error'>(null);
  const [testResponseMsg, setTestResponseMsg] = useState('');

  // Load saved Google Sheet configurations from localStorage on mount
  useEffect(() => {
    setSheetUrlState(getSpreadsheetUrl());
    setScriptUrlState(getGoogleSheetUrl());
  }, []);

  // Listen to new simulated leads submitted from the interactive booth component
  useEffect(() => {
    const handleNewSimulatedLead = (e: Event) => {
      const customEvent = e as CustomEvent<MockLead>;
      if (customEvent.detail) {
        // Add to state
        setLeads(prevLeads => [customEvent.detail, ...prevLeads]);
        setTotalLeadsCount(prevCount => prevCount + 1);
        
        // Trigger subtle scroll to the dashboard if desired, 
        // but let's at least show a toast alert simulation
      }
    };

    window.addEventListener('add-simulated-lead', handleNewSimulatedLead);
    return () => window.removeEventListener('add-simulated-lead', handleNewSimulatedLead);
  }, []);

  // Softly increment total leads over time to simulate a live event activity
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalLeadsCount(prev => prev + 1);
    }, 15000); // add a lead count every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const sectorsFilter = ['الكل', 'التطوير العقاري', 'التشطيبات والدهانات', 'المطابخ والأجهزة', 'التصميم الداخلي واللاندسكيب'];

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = activeFilter === 'الكل' || lead.sector === activeFilter;
    const matchesSearch = lead.applicant.includes(searchQuery) || lead.companyName.includes(searchQuery) || lead.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      
      // Simulate download
      const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Company,Contact,Phone,Sector,Budget/Request,Date\n"
        + leads.map(l => `${l.id},${l.companyName},${l.applicant},${l.phone},${l.sector},${l.budget || ''},${l.date}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "arabic_expo_digital_leads_2026.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setExportComplete(false), 4000);
    }, 1500);
  };

  // Copy modern Apps Script content to clipboard
  const handleCopyScriptCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  // Save the state variables back to localStorage
  const handleSaveSheetsConfig = () => {
    setGoogleSheetUrl(scriptUrl);
    setSpreadsheetUrl(sheetUrl);
    setSaveStatus('success');
    setTestResponseMsg('تم حفظ وتحديث روابط الربط بنجاح في متصفحك الحالي!');
    setTimeout(() => setSaveStatus(null), 4000);
    
    // Dispatch custom event to notify React App about changed Sheets URL
    const event = new CustomEvent('sheets-url-updated', { detail: scriptUrl });
    window.dispatchEvent(event);
  };

  // Call the Google Apps Script Web App with a test payload to prove delivery
  const handleTestConnection = async () => {
    const cleanUrl = scriptUrl.trim();
    if (!cleanUrl) {
      setSaveStatus('error');
      setTestResponseMsg('يرجى إدخال رابط تطبيق ويب غوغل الآمن (الذي ينتهي بـ /exec) أولاً لتجربة الاتصال.');
      return;
    }
    
    if (cleanUrl.includes('/spreadsheets/d/')) {
      setSaveStatus('error');
      setTestResponseMsg('خطأ: قمت بلصق رابط ملف Excel العادي في خانة كود التشغيل. يرجى قراءة خطوات الإعداد البسيطة بالأسفل.');
      return;
    }

    setSaveStatus('testing');
    setTestResponseMsg('جاري إرسال إشارة الفحص والاتصال بالخادم الآن...');

    const testBookingDetails = {
      id: `TEST-${Math.floor(100 + Math.random() * 900)}`,
      companyName: "شركة تجريبية للأنظمة والشبكات",
      contactPerson: "المهندس فحص الاتصال",
      phone: "01000000000",
      whatsapp: "01000000000",
      email: "test-sheets@arabicexpo2026.com",
      city: "العاصمة الإدارية الجديدة",
      sector: "التحول الرقمي",
      selectedPackage: "باقة الأجنحة الاحترافية",
      price: 12000,
      message: "هذه رسالة ذكية مبرمجة تلقائياً للتأكد من ربط موقع معرض معمار مصر بملف Google Sheet الخاص بك بنجاح فوري وبدون مشاكل CORS.",
      date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    try {
      const res = await sendBookingToGoogleSheets(testBookingDetails);
      if (res.success) {
        setSaveStatus('success');
        setTestResponseMsg('رائع جداً! تم إرسال نبضة الفحص بنجاح تام وبدون أي ثغرات برمجية. يرجى فتح ملف غوغل شيت الخاص بك والتحقق من السطر الأخير!');
      } else {
        setSaveStatus('error');
        setTestResponseMsg(res.error || 'فشلت المزامنة. تأكد من نشر الـ Web App بالصلاحية لـ "Anyone".');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setTestResponseMsg(err.message || 'حدث خطأ غير متوقع أثناء إرسال بيانات الاختبار.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'contacted': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'joined': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'طلب معلق - جديد';
      case 'contacted': return 'تم الاتصال الفني';
      case 'joined': return 'مؤكد - صفقة ناجحة';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="bg-brand-blue-medium border border-brand-blue-light/50 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">محاكاة لوحة تحكم عارضي المعرض الرقمي</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              لوحة العملاء المحتملين والحملات الاعلانية المباشرة
            </h3>
            <button 
              onClick={() => setShowSheetsModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 border border-brand-gold/30 hover:bg-brand-gold/25 text-brand-gold text-[10px] font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-brand-gold/5 uppercase"
              title="إعداد ربط غوغل شيت لاستقبال حجوزاتك الفعلية"
            >
              <Settings className="w-3 px-0 py-0.5 animate-spin-slow" />
              <span>ربط غوغل شيت ⚙️</span>
            </button>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            توضح هذه البدالة التفاعلية كيف ستتلقى بيانات واهتمامات العملاء وطلبات الاتصال دقيقة بدقيقة.
          </p>
        </div>

        {/* Live ticking statistics counters */}
        <div className="flex items-center gap-3 bg-brand-blue-dark/50 border border-brand-blue-light/60 p-3 rounded-2xl">
          <div className="p-2 sm:p-2.5 rounded-lg bg-brand-gold/10 text-brand-gold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] sm:text-xs">إجمالي العملاء المتوقعين</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-1.5 leading-none mt-1">
              <span>+{totalLeadsCount}</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-bright animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid containing Quick Overview Stats of leads */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-[#0b1422] p-4 rounded-xl border border-brand-blue-light/40">
          <div className="text-[11px] text-slate-400">معدل تحويل المعرض</div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">7.4%</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">أعلى بـ 3.2% من المعارض التقليدية</div>
        </div>
        <div className="bg-[#0b1422] p-4 rounded-xl border border-brand-blue-light/40">
          <div className="text-[11px] text-slate-400">نقرات واتساب المباشرة</div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">1,482 نقرة</div>
          <div className="text-[10px] text-slate-400 mt-1">تحرك فوري من العميل</div>
        </div>
        <div className="bg-[#0b1422] p-4 rounded-xl border border-brand-blue-light/40">
          <div className="text-[11px] text-slate-400">عملاء البميزانيات الكبرى</div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">54 عميلاً VIP</div>
          <div className="text-[10px] text-brand-gold font-bold mt-1">طلب مقايسات فيلات كاملة</div>
        </div>
        <div className="bg-[#0b1422] p-4 rounded-xl border border-brand-blue-light/40">
          <div className="text-[11px] text-slate-400">حملات تسويقية جارية</div>
          <div className="text-lg sm:text-xl font-black text-emerald-400 mt-1 flex items-center gap-1.5 leading-none">
            <span>نشطة</span>
            <Zap className="w-4 h-4 text-brand-gold-bright fill-current" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">فيسبوك، إنستجرام وجوجل</div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="space-y-4 mb-6">
        
        {/* Sector Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs text-slate-400 ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            تصفية القطاع:
          </span>
          {sectorsFilter.map((fClass) => (
            <button
              id={`leads-filter-${fClass}`}
              key={fClass}
              onClick={() => setActiveFilter(fClass)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === fClass
                  ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/40'
                  : 'bg-brand-blue-dark/60 text-slate-300 border border-slate-800 hover:text-white hover:bg-brand-blue-light/50'
              }`}
            >
              {fClass}
            </button>
          ))}
        </div>

        {/* Search bar and Export triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          
          {/* Search box */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن عميل أو هاتف أو شركة..."
              className="w-full text-xs pr-9 pl-3 py-2.5 bg-brand-blue-dark border border-brand-blue-light/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
            />
          </div>

          {/* Export to Excel simulated button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              exportComplete 
                ? 'bg-emerald-600 border border-emerald-500 text-white' 
                : 'bg-brand-blue-light/60 border border-brand-blue-light text-slate-300 hover:bg-brand-blue-light hover:text-white'
            }`}
          >
            {isExporting ? (
              <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : exportComplete ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم تصدير ملف excel بنجاح!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>تصدير قائمة العملاء (Excel - CSV)</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* LEAD DATA TABLE CONTAINER with responsive support */}
      <div className="overflow-x-auto rounded-xl border border-brand-blue-light/60 bg-brand-blue-dark/50">
        <table className="w-full text-right border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#09121d] border-b border-brand-blue-light text-slate-300 text-xs font-extrabold">
              <th className="p-3.5">كود الطلب</th>
              <th className="p-3.5">الاهتمام / القطاع المستهدف</th>
              <th className="p-3.5">عميل المبادرة</th>
              <th className="p-3.5">رقم هاتف العميل</th>
              <th className="p-3.5">الشركة الموجه إليها</th>
              <th className="p-3.5">نوع الطلب / السعر</th>
              <th className="p-3.5 text-center">التوقيت</th>
              <th className="p-3.5 text-center">الحالة الإعلانية</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-xs text-slate-500">
                  لا توجد طلبات تطابق معايير وتصنيفات البحث حالياً.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead: MockLead) => (
                <tr 
                  id={`lead-row-${lead.id}`}
                  key={lead.id} 
                  className="hover:bg-brand-blue-light/10 text-xs transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-slate-400">{lead.id}</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                      {lead.sector}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-200 font-bold">{lead.applicant}</td>
                  <td className="p-3.5 font-mono text-slate-300 tracking-wider">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {lead.phone}
                    </span>
                  </td>
                  <td className="p-3.5 text-brand-gold font-medium">{lead.companyName}</td>
                  <td className="p-3.5 text-[11px] text-slate-300 font-semibold">{lead.budget || "طلب تواصل هاتفى"}</td>
                  <td className="p-3.5 text-center text-slate-400">{lead.date}</td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-brand-gold/5 border border-brand-gold/15 rounded-xl flex items-start gap-2.5">
        <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
          <strong>ميزة المزامنة الحية:</strong> عند إرسال أي طلب عرض أسعار تجريبي من نموذج الجناح أعلاه، سيتدفق الطلب فوراً إلى لوحة التحكم هذه كبيانات حية ومباشرة. يثبت هذا النظام كفاءة وصول البيانات الفورية لكل شركة عارضة.
        </p>
      </div>

      {/* Google Sheets Custom Setup Modal */}
      {showSheetsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-brand-blue-medium border border-brand-blue-light/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar text-right leading-relaxed" style={{ direction: 'rtl' }}>
            
            {/* Close button */}
            <button 
              onClick={() => setShowSheetsModal(false)}
              className="absolute top-4 left-4 p-2 bg-[#0b1422] rounded-full border border-white/10 hover:border-[#d4af37]/50 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full text-[#d4af37] text-xs font-semibold mb-2">
                <Link className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>الربط بقاعدة بيانات Google Sheets السحابية</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                إعداد واستقبال الحجوزات الحية
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                اربط نموذج حجز المساحة المعمارية الرقمية بجدول بيانات Google الـخاص بك مباشرة لتلقي كافة تفاصيل الشركات العارضة لحظياً وبأمان في متصفحك.
              </p>
            </div>

            {/* Settings Fields */}
            <div className="space-y-4 mb-6">
              {/* Spreadsheet URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-300">
                  1. رابط ملف Google Sheets المستهدف (للمرجعية الفنية):
                </label>
                <input 
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrlState(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full text-xs p-3 bg-brand-blue-dark border border-brand-blue-light/60 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Script Web App URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-300">
                  2. رابط تنفيذ الويب Google Apps Script الخاص بك (ينتهي بـ /exec):
                </label>
                <input 
                  type="text"
                  value={scriptUrl}
                  onChange={(e) => setScriptUrlState(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full text-xs p-3 bg-brand-blue-dark border border-brand-blue-light/60 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Status and feedback line */}
              {saveStatus && (
                <div className={`p-4 rounded-xl text-xs flex gap-2 sm:gap-3 ${
                  saveStatus === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                    : saveStatus === 'error'
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                    : 'bg-brand-gold/10 border border-brand-gold/30 text-brand-gold'
                }`}>
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="leading-relaxed">{testResponseMsg}</p>
                </div>
              )}

              {/* Action buttons inside the modal */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveSheetsConfig}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#ffe17d] text-[#030b1a] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-brand-gold/10"
                >
                  حفظ البيانات والروابط
                </button>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={saveStatus === 'testing'}
                  className="px-5 py-2.5 bg-[#0b1422] hover:bg-[#121f35] border border-brand-blue-light rounded-xl text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {saveStatus === 'testing' ? 'جاري الفحص...' : 'إرسال ونبض تجربة الفحص ⚡'}
                </button>
              </div>
            </div>

            {/* Setup Instructions Segment - Collapsible */}
            <div className="bg-[#0b1422] border border-brand-blue-light/50 rounded-2xl p-4 text-right">
              <h5 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-2 text-brand-gold">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                <span>كيفية إعداد وربط جدول غوغل شيت (في 30 ثانية فقط)</span>
              </h5>
              <div className="text-[11px] sm:text-xs text-slate-400 space-y-2 leading-relaxed">
                <p>
                  1. افتح جدول بيانات Google Sheets الخاص بك.
                </p>
                <p>
                  2. من القائمة العلوية، اضغط على <strong>Extensions (الاضافات)</strong> ثم اختر <strong>Apps Script</strong>.
                </p>
                <p>
                  3. قم بمسح أي كود موجود بالداخل، ثم اضغط على الزر بالأسفل لنسخ الكود البرمجي المطور والصقه هناك بالكامل:
                </p>
                
                <button
                  type="button"
                  onClick={handleCopyScriptCode}
                  className="inline-flex items-center gap-1.5 my-1.5 px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/30 hover:bg-brand-gold/25 text-brand-gold rounded-lg transition-all cursor-pointer font-semibold text-[11px]"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'تم النسخ بنجاح!' : 'نسخ الكود البرمجي الذكي لـ Apps Script'}</span>
                </button>

                <p>
                  4. اضغط على زر <strong>Deploy (نشر)</strong> في الزاوية العلوية ثم اختر <strong>New deployment (نشر جديد)</strong>.
                </p>
                <p>
                  5. قم بضبط الخيارات كالتالي:
                  <ul className="list-disc list-inside mr-4 mt-1 space-y-0.5 font-bold text-slate-300">
                    <li>نوع النشر (Type): <span className="text-white">Web app</span></li>
                    <li>المستخدم المنفذ (Execute as): <span className="text-white">Me (بريدك الخاص)</span></li>
                    <li>من يدخل (Who has access): <span className="text-[#d4af37]">Anyone (أي شخص)</span> - <span className="font-normal text-slate-400 text-[10px]">خطوة إجبارية لاستقبال البيانات</span></li>
                  </ul>
                </p>
                <p className="mt-1">
                  6. انقر على **Deploy**، ثم امنح أذونات الوصول لحسابك، ومباشرة انسخ رابط الـ <strong>Web app URL</strong> الطويل (الذي ينتهي بـ `/exec`) والصقه في الخانة رقم 2 بالأعلى لحفظ التفعيل الفوري والكامل!
                </p>
              </div>
            </div>

            {/* Notice Footer inside modal */}
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <span className="text-[10px] text-slate-500 block">معاد حمايتها ومؤمنة بالكامل للاتصالات اللاسلكية المشفرة - معرض معمار مصر 2026</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
