import { Sector, DigitalBooth, Package, Testimonial, FAQItem, MockLead } from './types';

export const EXPOSITION_NAME = "المعرض الرقمي للبناء والتشطيبات والعقارات 2026";

export const SECTORS: Sector[] = [
  {
    id: "contracting",
    name: "المقاولات والإنشاءات",
    iconName: "HardHat",
    description: "شركات المقاولات العامة والإنشاءات والخرسانات والتشييد الهيكلي الأساسي."
  },
  {
    id: "realestate",
    name: "التطوير العقاري",
    iconName: "Building2",
    description: "شركات التطوير العقاري، التسويق العقاري، والمعارض والمجتمعات السكنية الجديدة."
  },
  {
    id: "finishes",
    name: "التشطيبات والدهانات",
    iconName: "Paintbrush",
    description: "أعمال البياض والدهانات والأرضيات والأسقف المعلقة والإنارة الحديثة."
  },
  {
    id: "kitchens",
    name: "المطابخ والأجهزة",
    iconName: "Layers",
    description: "تصنيع وتصميم المطابخ الحديثة بمختلف الخامات الألوميتال، الأكريليك والخشب."
  },
  {
    id: "furniture",
    name: "الأثاث والديكور",
    iconName: "Armchair",
    description: "الأثاث المنزلي الفاخر، غرف النوم، الصالونات، والديكورات الداخلية الأنيقة."
  },
  {
    id: "marble",
    name: "الرخام والجرانيت",
    iconName: "Gem",
    description: "تجهيز الرخام والجرانيت للأرضيات، الحوائط، والسلالم والمداخل الفخمة."
  },
  {
    id: "doors",
    name: "الألوميتال والأبواب والنوافذ",
    iconName: "DoorOpen",
    description: "نوافذ الألوميتال والـ PVC، الأبواب الخشبية والمصفحة، وبوابات الفيلات."
  },
  {
    id: "decor",
    name: "التصميم الداخلي واللاندسكيب",
    iconName: "Compass",
    description: "مكاتب التصميم الداخلي وتنسيق الحدائق المنزلية وحمامات السباحة."
  },
  {
    id: "materials",
    name: "مواد البناء والعزل",
    iconName: "Hammer",
    description: "موردو الإسمنت، حديد التسليح، الطوب، ومواد العزل المائي والحراري الحديثة."
  }
];

export const DIGITAL_BOOTHS: Record<string, DigitalBooth> = {
  contracting: {
    sectorId: "contracting",
    companyName: "شركة البنيان للمقاولات الحديثة",
    logoText: "البنيان",
    tagline: "نبني الغد برؤية الحاضر وجودة المستقبل",
    about: "تأسست شركة البنيان للمقاولات الحديثة منذ أكثر من 15 عاماً لتكون شريكاً رئيسياً في النهضة العمرانية بمصر. متخصصة في الإنشاءات المتكاملة والهياكل الخرسانية وأعمال اللاندسكيب والمشاريع القومية الفاخرة بأعلى معايير الأمان والجودة العالمية.",
    bannerUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Template placeholder but styled professionally
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
    ],
    projects: [
      {
        title: "مشروع لؤلؤة التجمع الخامس",
        description: "بناء وتشييد مجمع سكني من 12 فيلا فاخرة بتصميم نيو كلاسيك وتسليم كامل الهيكل والمحيط الخارجي وبوابات الألوميتال المتطورة.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
      },
      {
        title: "برج الأعمال في العاصمة الإدارية",
        description: "تنفيذ الأعمال الإنشائية والخرسانة المسلحة لواحد من أكبر الأبراج الإدارية الذكية بارتفاع 25 طابقاً.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
      }
    ],
    whatsappNumber: "201012345678",
    phoneNumber: "01012345678",
    email: "info@albonyan-eg.com"
  },
  realestate: {
    sectorId: "realestate",
    companyName: "مجموعة الأهرام للتطوير والاستثمار العقاري",
    logoText: "الأهرام",
    tagline: "بوابتك نحو استثمار عقاري آمن وحياة راقية",
    about: "مجموعة الأهرام العقارية هي شركة تطوير مصرية رائدة تركز على تقديم مجتمعات ذكية متكاملة الخدمات في المناطق الأكثر جذباً مثل الشيخ زايد وشمال الرحاب وبيت الوطن. نضمن قيمة استثمارية استثنائية ونظم سداد مرنة تمتد لغاية 8 سنوات.",
    bannerUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
    ],
    projects: [
      {
        title: "كمبوند زايد هيلز الرياضي",
        description: "مجمع سكني على مساحة 20 فداناً يضم شققاً بنظام الخرسانة الذكية ومساحات خضراء هائلة وممرات دراجات تفاعلية.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop"
      },
      {
        title: "مشروع سيتي لايت التجمع",
        description: "وحدات سكنية فاخرة بمقدم يبدأ من 5% وتسهيلات سداد بدون فوائد في أرقى أحياء بيت الوطن بالقرب من النوادي والخدمات.",
        imageUrl: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=600&auto=format&fit=crop"
      }
    ],
    whatsappNumber: "201098765432",
    phoneNumber: "01098765432",
    email: "sales@al-ahram-eg.com"
  },
  decor: {
    sectorId: "decor",
    companyName: "رؤية فنية للتصميم الداخلي والديكور الأنيق",
    logoText: "رؤية فنية",
    tagline: "نحول الفراغات العادية إلى لوحات معمارية فريدة",
    about: "رؤية فنية هو مكتب تصميم داخلي وتنفيذ ديكورات فاخرة رائد في تقديم حلول مبتكرة للفلل والقصور والشقق الفاخرة والمطاعم المتميزة. نركز على استغلال المساحات بأناقة وتنسيق الألوان واختيار أفضل الإضاءات والرخام المناسب لكل نمط.",
    bannerUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop"
    ],
    projects: [
      {
        title: "تصميم فيلا نيو كلاسيك - مدينتي",
        description: "ديكورات داخلية تجمع بين الرخام الإيطالي الفاخر والإضاءة المخفية، وأسقف جبس بورد ممتصة للرطوبة وتصميم أثاث مخصص بالكامل.",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop"
      },
      {
        title: "تجهيز مقر شركة تك الاستثمارية بالكامل",
        description: "تصميم النمط المودرن المفتوح المعتمد على تمازج الأشكال الهندسية، مع توظيف الأثاث المكتبي الإرجونوميكي الذكي.",
        imageUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop"
      }
    ],
    whatsappNumber: "201122334455",
    phoneNumber: "01122334455",
    email: "design@artvision-eg.com"
  }
};

export const PACKAGES: Package[] = [
  {
    id: "basic",
    name: "الباقة الأساسية",
    price: 3500,
    period: "للمعـرض بالكامل",
    badge: "اقتصادية ومناسبة للشركات الناشئة",
    features: [
      "جناح صفحة شركة معمارية خاصة",
      "عرض حتى 20 صورة لمشاريعك ومنتجاتك",
      "إضافة فيديو تعريفي واحد يوتيوب/فيميو",
      "لوحة بيانات جهات التواصل المباشر",
      "أيقونة تواصل واتساب مباشر وسريع",
      "استلام طلبات عروض أسعار عبر البريد الإلكتروني"
    ],
    recommended: false,
    colorClass: "bg-slate-900 border-slate-800 text-slate-100",
    borderClass: "border-slate-800 hover:border-slate-700"
  },
  {
    id: "professional",
    name: "الباقة الاحترافية",
    price: 7500,
    period: "للمعـرض بالكامل",
    badge: "الأكثر مبيعاً ورواجاً للشركات المتميزة",
    features: [
      "جناح صفحة شركة مميزة بتصميم فاخر VIP",
      "مساحة رفع صور غير محدودة للمشاريع",
      "فيديوهات متعددة تعرض تفاصيل المقاولات أو المصانع",
      "ظهور في مقدمة نتائج بحث قطاعك والتصنيفات",
      "شارة 'موثق ومعتمد' ذهبية بجانب اسم الشركة",
      "تصدير واستلام تقارير تفصيلية للزوار المهتمين",
      "استلام طلبات عروض أسعار وتحميل بروشورات بشكل متقدم",
      "دعم فني مخصص طوال يومي الإعلانات والمعرض"
    ],
    recommended: true,
    colorClass: "bg-gradient-to-br from-[#0F2038] to-[#071325] border-brand-gold text-white shadow-2xl",
    borderClass: "border-brand-gold ring-1 ring-brand-gold/30"
  },
  {
    id: "premium",
    name: "الباقة المميزة",
    price: 12000,
    period: "للمعـرض بالكامل",
    badge: "تغطية تسويقية موسعة وميزات تفاعلية فائقة",
    features: [
      "جناح صفحة شركة فاخر وبث فيديو 4K للمشاريع والمصانع",
      "عرض حتى 80 صورة لمنتجاتك وسابقة أعمالك بدقة متناهية",
      "رابط تواصل واتساب مباشر + هاتف مخصص لحل المشكلات طوال المعرض",
      "مساحة لإضافة كتالوجات تفصيلية قابلة للتحميل بنقرة واحدة (PDF)",
      "شارة 'شريك ذهبي متميز' بصرية على جناحك وتصنيفات قطاعك",
      "تصدير واستلام فوري لكافة بيانات الزوار عبر Google Sheets مباشرة",
      "تضمين شركتك في ملخص النشرة الترويجية لـ 20,000 مهتم بالبناء"
    ],
    recommended: false,
    colorClass: "bg-slate-950 border-[#d4af37]/45 text-slate-100",
    borderClass: "border-[#d4af37]/45 hover:border-[#d4af37]"
  },
  {
    id: "sponsor",
    name: "باقة الراعي الرسمي",
    price: 25000,
    period: "حضور تسويقي فائق السيادة",
    badge: "الرعاية والسيطرة التسويقية التامة للمؤسسات الكبرى",
    features: [
      "شعار شركتك في صدارة الصفحة الرئيسية والفوتر وفي جميع الغرف",
      "بنرات إعلانية وشرائح متحركة عريضة بكافة أجنحة المعرض",
      "ظهور فائق الأولوية في جميع التصنيفات والقطاعات دون استثناء",
      "إطلاق حملة إعلانية مخصصة باسم الراعي على صفحات التواصل الاجتماعي",
      "تضمين الرعاية في النشرات الصحفية والتقرير الختامي للمعرض",
      "الحصول على البيانات الكاملة الشاملة للزوار والمهتمين بالاستثمار",
      "جلسة إعلانية خاصة وبث مباشر لعرض مشاريعك على الزوار"
    ],
    recommended: false,
    colorClass: "bg-slate-950 border-amber-600/60 text-slate-100",
    borderClass: "border-amber-600/60 hover:border-brand-gold"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "م. كريم عبد العزيز",
    role: "المدير التنفيذي للعمليات",
    company: "رواسي للمقاولات العامة والتشطيب",
    feedback: "اشتراكنا في النسخة التجريبية السابقة فتح لنا آفاقاً مذهلة! استقبلنا أكثر من 24 طلب عرض سعر حقيقي لتشطيب شقق وفيلات في مدينتي والتجمع، وتعاقدنا بالفعل على 5 مشاريع عملاقة بقيمة تجاوزت 4 ملايين جنيه. المعرض الرقمي هو مستقبل التسويق العقاري الحاسم.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "2",
    name: "أ. منى الشافعي",
    role: "مديرة التسويق والعلاقات العامة",
    company: "مجموعة حديد ومطابخ رويال دبلوم",
    feedback: "سهولة عرض وتحديث الكتالوج الرقمي داخل جناحنا كانت رائعة. الزوار تواصلوا معنا مباشرة عبر واتساب بضغطة زر. حصلنا على أكثر من 180 عميل مهتم بتركيب مطابخ ألوميتال وأكريليك خلال يومين فقط من الضخ الإعلاني المكثف للمعرض.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "3",
    name: "م. شريف الهواري",
    role: "مؤسس وشريك دائم",
    company: "الهواري ديزاين للتصميم واللاندسكيب",
    feedback: "الباقة الاحترافية منحتنا تواجداً مميزاً مكننا من تصدير قائمة بيانات العملاء بشكل فوري. التنظيم فائق الاحترافية والحملات التسويقية الموجهة جلبت لنا عملاء يبحثون بدقة عن جودة التصميم الداخلي وتنسيق الحدائق. سنشارك بالتأكيد كراعٍ رسمي في المعرض القادم.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "1",
    question: "ما هو المعرض الرقمي للبناء والتشطيبات والعقارات؟",
    answer: "هو أكبر منصة افتراضية تفاعلية تجمع كبرى شركات الديكور، والمقاولات، والاستثمار العقاري، ومستلزمات الفيلات والمنازل كالمطابخ والأثاث في مكان واحد. خلال يومي المعرض، نقوم بضخ استثمارات إعلانية ضخمة مستهدفة عبر محركات البحث ومنصات التواصل لجلب آلاف الباحثين عن هذه الخدمات مباشرة ليتصفحوا أجنحة الشركات ويتواصلوا معها حياً."
  },
  {
    id: "2",
    question: "كيف أحصل كشركة عارضة على العملاء والمبيعات؟",
    answer: "عند حجز جناحك، يحصل عمليلك على تجربة بصرية رائعة لتصفح صور وفيديوهات مشاريعك وخبرات شركتك السابقة. يمكنه تعبئة نموذج 'طلب عرض سعر' مخصص، أو الاتصال التلفوني بك، أو النقر على 'تواصل عبر واتساب مباشر'، مما يوصلك ببياناته فورياً لإغلاق صفقة البيع."
  },
  {
    id: "3",
    question: "هل أستطيع تعديل بيانات شركتي، صوري، وفيديوهاتي بعد الاشتراك؟",
    answer: "نعم، فور اشتراكك سيتواصل معك أحد مهندسي الدعم الفني لدينا لبناء جناحك الرقمي ورفع ملفاتك بدقة، وسيكون بإمكانك تحديث الصور، وتعديل العروض الترويجية، أو أرقام الهواتف والتواصل في أي وقت قبل أو أثناء انطلاق فعاليات المعرض بمرونة تامة."
  },
  {
    id: "4",
    question: "كيف أتلقى طلبات واهتمامات العملاء المخصصة؟",
    answer: "يتم تحويل الطلبات فورياً بناءً على ما يفضله العميل وشركتك: فإما أن تجدها مرسلة إلى بريدك الإلكتروني الرسمي فور حدوثها، أو تصلك كإشعار محادثة واتساب حية لتتثنى لك الدردشة والإقناع السريع وإرسال عينات التصميم والمقايسات الفنية."
  },
  {
    id: "5",
    question: "هل يوجد تقرير تحليلي تقدمونه للشركات بعد انتهاء المعرض؟",
    answer: "بكل تأكيد، نقدم في الباقتين الاحترافية والراعي الرسمي تقريراً شاملاً رقمياً يوضح: إجمالي عدد المشاهدات والزيارات الدقيقة لجناحك، عدد النقرات على واتساب، قائمة ببيانات العملاء الذين طلبوا بشكل مباشر عروض الأسعار، وتوصيات تسويقية لتحقيق أقصى استفادة مستقبلاً."
  }
];

// Seed initial fake leads so the dynamic dashboard has entries right away,
// and businesses see what they will get.
export const INITIAL_MOCK_LEADS: MockLead[] = [
  {
    id: "L-101",
    companyName: "رواسي للمقاولات العامة",
    applicant: "المهندس فريد الجيار",
    phone: "01211554477",
    sector: "التشطيبات والدهانات",
    budget: "ميزانية مفتوحة (تشطيب فيلا)",
    date: "منذ دقيقتين",
    status: "new"
  },
  {
    id: "L-102",
    companyName: "مطابخ رويال دبلوم",
    applicant: "الأستاذة رانيا فهمي",
    phone: "01004488992",
    sector: "المطابخ والأجهزة",
    budget: "120 ألف - 160 ألف",
    date: "منذ 15 دقيقة",
    status: "joined"
  },
  {
    id: "L-103",
    companyName: "الأهرام للاستثمار العقاري",
    applicant: "المحاسب عادل طوسون",
    phone: "01144229988",
    sector: "التطوير العقاري",
    budget: "شراء شقة 3 غرف كاش",
    date: "منذ ساعة",
    status: "contacted"
  },
  {
    id: "L-104",
    companyName: "الهواري ديزاين",
    applicant: "الدكتورة سميرة الخطيب",
    phone: "01555112233",
    sector: "التصميم الداخلي واللاندسكيب",
    budget: "تنسيق لاندسكيب حديقة منزلية",
    date: "منذ ساعتين",
    status: "new"
  }
];
