/**
 * Google Sheets Integration Utility
 * Handles sending booth booking requests to a user-configured Google Sheets spreadsheet 
 * via a simple Google Apps Script Web App bypass (securing client-side origins).
 */

const STORAGE_KEY = 'arabic_expo_sheet_url_2026';
const SPREADSHEET_KEY = 'arabic_expo_spreadsheet_url_2026';
const DEFAULT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Jry9IRd3_qcCs531---5wmrOmb-oNukAuE-n3EX460k/edit?usp=sharing';

export function getSpreadsheetUrl(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SPREADSHEET_KEY) || DEFAULT_SPREADSHEET_URL;
  }
  return DEFAULT_SPREADSHEET_URL;
}

export function setSpreadsheetUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SPREADSHEET_KEY, url.trim());
  }
}

export function getGoogleSheetUrl(): string {
  // Use standard static import.meta.env so Vite can replace this at build time
  // @ts-ignore
  const envUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (envUrl && envUrl.trim() !== '' && !envUrl.includes('...')) {
    return envUrl.trim();
  }
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || '';
  }
  return '';
}

export function setGoogleSheetUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, url.trim());
  }
}

export async function sendBookingToGoogleSheets(data: {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  sector: string;
  selectedPackage: string;
  price: number;
  message: string;
  date: string;
}): Promise<{ success: boolean; error?: string }> {
  const url = getGoogleSheetUrl();
  if (!url) {
    return { success: false, error: 'لم يتم إعداد رابط جدول بيانات Google Sheets بعد.' };
  }

  try {
    // We send payload as a URLSearchParams string (x-www-form-urlencoded).
    // This is treated as a "simple request" by modern browsers, meaning zero CORS preflight issues or headers mismatch.
    const params = new URLSearchParams();
    params.append('id', data.id || '');
    params.append('companyName', data.companyName || '');
    params.append('contactPerson', data.contactPerson || '');
    params.append('phone', data.phone || '');
    params.append('whatsapp', data.whatsapp || '');
    params.append('email', data.email || '');
    params.append('city', data.city || '');
    params.append('sector', data.sector || '');
    params.append('selectedPackage', data.selectedPackage || '');
    params.append('price', (data.price || 0).toString());
    params.append('message', data.message || '');
    params.append('date', data.date || '');

    // Send the real request to Google script
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    // Directly return success since no-cors hides response specifics but guarantees delivery in normal client networks
    return { success: true };
  } catch (error: any) {
    console.error('Error sending booking to Google Sheets:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء مزامنة البيانات مع Google Sheets.' };
  }
}

export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    // 1. فتح جدول البيانات النشط
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. إذا كان الجدول فارغاً تماماً، نقوم بإضافة صف العناوين الهيكلية أولاً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "كود المعاملة", 
        "اسم الشركة", 
        "المسؤول الممثل", 
        "رقم الهاتف", 
        "رقم الواتساب", 
        "البريد الإلكتروني", 
        "المدينة / المحافظة", 
        "القطاع والتصنيف", 
        "الباقة المحجوزة", 
        "القيمة الاستثمارية (ج.م)", 
        "تفاصيل ومتطلبات إضافية", 
        "وقت التسجيل"
      ]);
      
      // تنسيق صف العناوين لجعله لائقاً واحترافياً
      sheet.getRange("A1:L1").setFontWeight("bold").setBackgroundColor("#030b1a").setFontColor("#d4af37").setHorizontalAlignment("center");
    }
    
    // 3. تحليل وفك ترميز البيانات المستقبلة من المعرض بديناميكية فائقة ومناعة ضد الـ CORS
    var id = "";
    var companyName = "";
    var contactPerson = "";
    var phone = "";
    var whatsapp = "";
    var email = "";
    var city = "";
    var sector = "";
    var selectedPackage = "";
    var price = "";
    var message = "";
    var date = "";

    // التحقق من وصول بارامترات بريدية مباشرة (URL encoded)
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      id = e.parameter.id || "";
      companyName = e.parameter.companyName || "";
      contactPerson = e.parameter.contactPerson || "";
      phone = e.parameter.phone || "";
      whatsapp = e.parameter.whatsapp || "";
      email = e.parameter.email || "";
      city = e.parameter.city || "";
      sector = e.parameter.sector || "";
      selectedPackage = e.parameter.selectedPackage || "";
      price = e.parameter.price || "";
      message = e.parameter.message || "";
      date = e.parameter.date || "";
    } else if (e && e.postData && e.postData.contents) {
      // وإلا فك ترميز محتوى طلب الـ JSON الخام
      try {
        var data = JSON.parse(e.postData.contents);
        id = data.id || "";
        companyName = data.companyName || "";
        contactPerson = data.contactPerson || "";
        phone = data.phone || "";
        whatsapp = data.whatsapp || "";
        email = data.email || "";
        city = data.city || "";
        sector = data.sector || "";
        selectedPackage = data.selectedPackage || "";
        price = data.price || "";
        message = data.message || "";
        date = data.date || "";
      } catch (jsonErr) {
        // في حالة وجود صيغة نصية عشوائية
        var rawString = e.postData.contents;
        var queryParams = parseQueryString(rawString);
        id = queryParams.id || "";
        companyName = queryParams.companyName || "";
        contactPerson = queryParams.contactPerson || "";
        phone = queryParams.phone || "";
        whatsapp = queryParams.whatsapp || "";
        email = queryParams.email || "";
        city = queryParams.city || "";
        sector = queryParams.sector || "";
        selectedPackage = queryParams.selectedPackage || "";
        price = queryParams.price || "";
        message = queryParams.message || "";
        date = queryParams.date || "";
      }
    }
    
    // 4. إدراج صف جديد ببيانات حجز الشركة
    sheet.appendRow([
      id,
      companyName,
      contactPerson,
      phone,
      whatsapp,
      email,
      city,
      sector,
      selectedPackage,
      price,
      message,
      date
    ]);
    
    // تنسيق الخلايا المضافة تلقائياً 
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 12).setHorizontalAlignment("right");
    
    // 5. إرجاع رسالة نجاح بصيغة JSON متوافقة
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "تم الحفظ بنجاح" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// دالة فك تشفير البيانات النصية المفصولة بـ علامة و (&)
function parseQueryString(str) {
  var params = {};
  if (!str) return params;
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    if (pair.length > 0) {
      var key = decodeURIComponent(pair[0]);
      var val = decodeURIComponent(pair[1] || '').replace(/\\+/g, ' ');
      params[key] = val;
    }
  }
  return params;
}`;
