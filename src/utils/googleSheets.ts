/**
 * Google Sheets Integration Utility
 * Handles sending booth booking requests to a user-configured Google Sheets spreadsheet 
 * via a simple Google Apps Script Web App bypass (securing client-side origins).
 */

const STORAGE_KEY = 'arabic_expo_sheet_url_2026';

export function getGoogleSheetUrl(): string {
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
    // Send a POST request to Google Apps Script Web App URL
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors", // Crucial for client-side direct Apps Script execution to avoid preflight issues
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Since 'no-cors' mode does not return access to responses, we assume success if no error is thrown
    return { success: true };
  } catch (error: any) {
    console.error('Error sending to Google Schema:', error);
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
    
    // 3. تحليل وفك ترميز البيانات المستقبلة من المعرض
    var data = JSON.parse(e.postData.contents);
    
    // 4. إدراج صف جديد ببيانات حجز الشركة
    sheet.appendRow([
      data.id,
      data.companyName,
      data.contactPerson,
      data.phone,
      data.whatsapp,
      data.email,
      data.city,
      data.sector,
      data.selectedPackage,
      data.price,
      data.message,
      data.date
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
}`;
