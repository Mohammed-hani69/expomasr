import React, { useState, useEffect } from 'react';
import { 
  getGoogleSheetUrl, 
  setGoogleSheetUrl, 
  GOOGLE_APPS_SCRIPT_CODE,
  sendBookingToGoogleSheets
} from '../utils/googleSheets';
import { 
  FileSpreadsheet, 
  Settings, 
  BookOpen, 
  Copy, 
  Check, 
  Play, 
  Save, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function GoogleSheetsSettings() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setUrl(getGoogleSheetUrl());
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setGoogleSheetUrl(url);
    
    // Dispatch custom event to notify App about changed Sheets URL
    const event = new CustomEvent('sheets-url-updated', { detail: url });
    window.dispatchEvent(event);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleTestConnection = async () => {
    if (!url.trim()) {
      setTestStatus('failed');
      setErrorMessage('الرجاء إدخال رابط الخدمة أولاً قبل إجراء الاختبار.');
      return;
    }

    setTestStatus('testing');
    setErrorMessage('');

    // Send a mock booking data to test connectivity
    const testResult = await sendBookingToGoogleSheets({
      id: "TEST-LINK-9999",
      companyName: "شركة تجريبية لاختبار الاتصال",
      contactPerson: "مهندس التجربة والربط",
      phone: "01012345678",
      whatsapp: "01012345678",
      email: "test@google-sheet.com",
      city: "القاهرة",
      sector: "التطوير العقاري والمطورين",
      selectedPackage: "الراعي الرسمي الفاخر",
      price: 25000,
      message: "هذا الطلب هو للتأكد من نجاح تواصل المعرض مع ملف Google Sheet الخاص بكم.",
      date: new Date().toLocaleDateString('ar-EG') + " " + new Date().toLocaleTimeString('ar-EG')
    });

    if (testResult.success) {
      setTestStatus('success');
    } else {
      setTestStatus('failed');
      setErrorMessage(testResult.error || 'فشل الاتصال برابط الإجراء. الرجاء التحقق من خطوة النشر.');
    }
  };

  return (
    <div id="google-sheets-dashboard-card" className="bg-[#081424] border border-[#d4af37]/30 rounded-3xl p-5 sm:p-6 lg:p-8 relative mt-8">
      
      {/* Decorative Golden Star */}
      <div className="absolute top-4 left-4 text-[#d4af37] animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
            ربط ومزامنة المعرض بـ Google Sheets مباشرة
          </h4>
          <p className="text-xs text-white/60">
            احفظ تفاصيل وبيانات حجز كل شركة تلقائياً وبأمان في جدول إلكتروني خاص بك لحظة بلحظة.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* URL Input Form */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            رابط تطبيق ويب Google Apps Script الخاص بك:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full text-xs p-3 bg-[#030b1a] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] text-left shrink-0 font-mono"
            />
            <div className="flex sm:flex-col lg:flex-row gap-2 shrink-0">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-4 py-3 bg-[#d4af37] text-[#030b1a] rounded-xl font-bold text-xs hover:bg-[#d4af37]/80 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSaving ? (
                  <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-[#030b1a] border-t-transparent rounded-full"></span>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الحفظ!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>حفظ وتفعيل</span>
                  </>
                )}
              </button>

              <button
                onClick={handleTestConnection}
                disabled={testStatus === 'testing'}
                className="px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {testStatus === 'testing' ? (
                  <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>إرسال تجربة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Display Connection Test Status message */}
        {testStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs">
            <Check className="w-4 h-4" />
            <span>نجح الاختبار! تم إرسال طلب تجريبي مسجل بنجاح لجدول Google Sheets الخاص بك. تحقق من جدولك للتأكد.</span>
          </div>
        )}
        {testStatus === 'failed' && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>فشل الاتصال: {errorMessage}</span>
          </div>
        )}

        {/* Expandable step-by-step guidance block */}
        <div className="border border-white/5 rounded-2xl bg-[#030b1a]/50">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              شرح مبسط لكيفية إعداد وربط جدول غوغل شيت (في 30 ثانية فقط)
            </span>
            {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showInstructions && (
            <div className="p-4 border-t border-white/5 space-y-4 text-xs text-white/80 leading-relaxed text-justify">
              <ol className="space-y-3 list-decimal list-inside pr-2">
                <li>
                  قم بإنشاء جدول بيانات جديد في <strong className="text-white">Google Sheet</strong> وأعطه اسماً مناسباً مثل <strong className="text-[#d4af37]">"حجوزات معرض البناء 2026"</strong>.
                </li>
                <li>
                  من القائمة العلوية بالجدول، اضغط على <strong className="text-white">Extensions (الإضافات)</strong> ثم اختر <strong className="text-white">Apps Script</strong>.
                </li>
                <li>
                  امسح أي كود موجود بالنافذة بالكامل، ثم اضغط على زر <strong className="text-[#d4af37] font-bold">نسخ الكود البرمجي</strong> في الأسفل هنا والصقه داخل المحرر.
                </li>
                <li>
                  اضغط على زر الحفظ (أيقونة القرص) ثم اضغط على <strong className="text-white">Deploy (نشر)</strong> ثم <strong className="text-white">New deployment (نشر جديد)</strong>.
                </li>
                <li>
                  اضغط على أيقونة الترس بجانب "Select type" واختر <strong className="text-white">Web app (تطبيق ويب)</strong>.
                </li>
                <li>
                  تأكد من ضبط الخيارات كالتالي:
                  <ul className="list-disc list-inside mr-4 mt-1 space-y-1 text-slate-300">
                    <li>Execute as: <strong className="text-white">Me (بريدي الإلكتروني)</strong></li>
                    <li>Who has access: <strong className="text-indigo-400">Anyone (الجميع حتى لو بدون تسجيل)</strong></li>
                  </ul>
                </li>
                <li>
                  اضغط على <strong className="text-emerald-400">Deploy</strong> وامنح الأذونات المطلوبة لحسابك، ثم انسخ رابط الويب المتولد (<strong className="text-white">Web app URL</strong>) وضعه في خانة الإدخال بالأعلى واضغط حفظ!
                </li>
              </ol>

              {/* Box showing copyable script code */}
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-sans">Google Apps Script Macro Code:</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تم نسخ الكود للذاكرة!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكود البرمجي</span>
                      </>
                    )}
                  </button>
                </div>
                
                <pre className="p-3 bg-[#030b1a] rounded-xl border border-white/5 text-[10px] text-slate-400 font-mono overflow-x-auto max-h-48 text-left dir-ltr">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
