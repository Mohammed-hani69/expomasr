import { useState, useEffect } from 'react';
import { INITIAL_MOCK_LEADS } from '../data';
import { MockLead } from '../types';
import GoogleSheetsSettings from './GoogleSheetsSettings';
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
  Zap
} from 'lucide-react';

export default function LeadDashboard() {
  const [leads, setLeads] = useState<MockLead[]>(INITIAL_MOCK_LEADS);
  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalLeadsCount, setTotalLeadsCount] = useState(324);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

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
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            لوحة العملاء المحتملين والحملات الاعلانية المباشرة
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
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

      {/* Live Google Sheets settings panel integration */}
      <GoogleSheetsSettings />

    </div>
  );
}
