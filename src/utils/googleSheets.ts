const API_BASE = '/api';

export async function sendBookingToFlask(data: {
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
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'فشل حفظ الحجز في قاعدة البيانات' };
    }
    return { success: true };
  } catch (error: any) {
    console.error('Error sending booking to Flask API:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء الاتصال بقاعدة البيانات' };
  }
}

export async function getBookingsFromFlask(): Promise<{
  success: boolean;
  data?: any[];
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/bookings`);
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'فشل جلب البيانات' };
    }
    return { success: true, data: json.data };
  } catch (error: any) {
    console.error('Error fetching bookings from Flask API:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء جلب البيانات' };
  }
}

export async function getStatsFromFlask(): Promise<{
  success: boolean;
  total?: number;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/bookings/stats`);
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'فشل جلب الإحصائيات' };
    }
    return { success: true, total: json.total };
  } catch (error: any) {
    console.error('Error fetching stats from Flask API:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء جلب الإحصائيات' };
  }
}
