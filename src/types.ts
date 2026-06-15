export interface Sector {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

export interface DigitalBooth {
  sectorId: string;
  companyName: string;
  logoText: string;
  tagline: string;
  about: string;
  videoUrl: string;
  gallery: string[];
  projects: Project[];
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  bannerUrl: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  priceUSD?: number;
  period: string;
  badge: string;
  features: string[];
  recommended: boolean;
  colorClass: string;
  borderClass: string;
}

export interface MockLead {
  id: string;
  companyName: string;
  applicant: string;
  phone: string;
  sector: string;
  budget?: string;
  date: string;
  status: 'new' | 'contacted' | 'joined';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatarUrl: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RegistrationForm {
  companyName: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  sector: string;
  selectedPackage: string;
  message: string;
  acceptTerms: boolean;
}
