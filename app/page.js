'use client'
import React, { useState, useEffect, useMemo } from 'react';


const translations = {
  en: {
    home: 'Home', services: 'Services', api: 'API Docs',
    signin: 'Sign in', signup: 'Sign up', signout: 'Logout',
    balance: 'Balance', dashboard: 'Dashboard',
    heroTitle: 'Choose the right service for your platform, set link & quantity, send order in seconds',
    heroDesc: 'GrowthX helps creators and brands grow on Instagram, TikTok, YouTube and more with followers, views, likes and engagement delivered fast with clear pricing and tracking.',
    getStarted: 'Get Started', viewServices: 'View Services',
    remember: 'Remember me', forgot: 'Forgot password?',
    noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
    email: 'Email address', password: 'Password', confirmPass: 'Confirm password',
    platforms: 'Supported Platforms',
    platformsDesc: 'Pick your platform to filter services instantly in the new order panel.',
    popular: 'Popular Services',
    popularDesc: 'Most ordered this week — fast start and stable delivery.',
    stepsTitle: 'Order in 3 simple steps',
    step1T: 'Add Balance', step1D: 'Top up with Visa, PayPal, Crypto or Vodafone Cash. Balance updates instantly after confirmation.',
    step2T: 'Select Service', step2D: 'Choose platform, service, paste link and set quantity. Price auto-calculates.',
    step3T: 'Submit & Track', step3D: 'Send order and track status from Pending to Completed in real time.',
    benefitsTitle: 'Built for speed and clarity',
    b1T: 'Fast Search', b1D: 'Find any service by ID or keyword in under a second with smart filters.',
    b2T: 'Clear Details', b2D: 'Every service shows min/max, start time, refill guarantee and average delivery.',
    b3T: 'Mobile Ready', b3D: 'Fully responsive dashboard, bottom navigation and pill inputs for thumb-friendly use.',
    b4T: '24/7 Support', b4D: 'Tickets answered fast, plus live order tracking and transaction receipts.',
    faq: 'Frequently Asked Questions',
    faqQ1: 'How fast do orders start?', faqA1: 'Most services start within 0-30 minutes. Each service card shows estimated start time and delivery speed.',
    faqQ2: 'What if order drops?', faqA2: 'Services with Refill enabled include 30-day refill guarantee. Open a ticket and we refill at no cost.',
    faqQ3: 'Can I use multiple payment methods?', faqA3: 'Yes. We support Visa, PayPal, Crypto (USDT/BTC) and Vodafone Cash for Egypt with instant confirmation in demo mode.',
    faqQ4: 'Is my data secure?', faqA4: 'Demo uses localStorage only. In production, passwords are hashed server-side and API keys never exposed in frontend.',
    newOrder: 'New Order', orders: 'Orders', addFunds: 'Add Funds', transactions: 'Transactions', favorites: 'Favorites', support: 'Support', settings: 'Settings', apiKey: 'API Key',
    platform: 'Platform', service: 'Service', link: 'Link', quantity: 'Quantity', charge: 'Charge', min: 'Min', max: 'Max', price: 'Price',
    search: 'Search services...', all: 'All', submitOrder: 'Submit Order', orderCreated: 'Order created!',
    addFundsTitle: 'Add Funds', amount: 'Amount', pay: 'Pay & Add Balance', txHistory: 'Transaction History',
    admin: 'Admin', users: 'Users', manageServices: 'Manage Services', manageOrders: 'Manage Orders',
    totalUsers: 'Total Users', totalOrders: 'Total Orders', totalRevenue: 'Total Revenue',
    id: 'ID', rate: 'Rate / 1K', status: 'Status', date: 'Date', action: 'Action',
    noOrders: 'No orders yet. Create your first order to see it here.',
    noServices: 'No services found. Try different filters.',
    linkPh: 'https://...', qtyPh: '1000',
    footerDesc: 'GrowthX is a premium SMM panel for creators, agencies and brands. Fast, transparent and mobile-first.',
    terms: 'Terms', privacy: 'Privacy', contact: 'Contact',
    language: 'العربية', languageEn: 'English',
    instant: 'Instant balance', secure: 'Secure checkout', dashboardPreview: 'Dashboard preview',
  },
  ar: {
    home: 'الرئيسية', services: 'الخدمات', api: 'توثيق API',
    signin: 'تسجيل دخول', signup: 'إنشاء حساب', signout: 'تسجيل خروج',
    balance: 'الرصيد', dashboard: 'لوحة التحكم',
    heroTitle: 'اختر الخدمة المناسبة لمنصتك، ضع الرابط والكمية، وأرسل طلبك خلال ثوانٍ',
    heroDesc: 'GrowthX يساعد صناع المحتوى والعلامات على النمو في انستقرام وتيك توك ويوتيوب وغيرها عبر متابعين ومشاهدات وتفاعل سريع بأسعار واضحة.',
    getStarted: 'ابدأ الآن', viewServices: 'عرض الخدمات',
    remember: 'تذكرني', forgot: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟', haveAccount: 'لديك حساب بالفعل؟',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', confirmPass: 'تأكيد كلمة المرور',
    platforms: 'المنصات المدعومة',
    platformsDesc: 'اختر المنصة لتصفية الخدمات فوراً في نموذج الطلب الجديد.',
    popular: 'الخدمات الشائعة',
    popularDesc: 'الأكثر طلباً هذا الأسبوع — بداية سريعة وتسليم مستقر.',
    stepsTitle: 'اطلب في 3 خطوات بسيطة',
    step1T: 'اشحن الرصيد', step1D: 'اشحن عبر فيزا، بايبال، العملات الرقمية أو فودافون كاش. يتحدث الرصيد فوراً بعد التأكيد.',
    step2T: 'اختر الخدمة', step2D: 'اختر المنصة والخدمة والصق الرابط وحدد الكمية. يتم حساب السعر تلقائياً.',
    step3T: 'أرسل وتابع', step3D: 'أرسل الطلب وتابع حالته من قيد الانتظار إلى مكتمل في الوقت الفعلي.',
    benefitsTitle: 'مصمم للسرعة والوضوح',
    b1T: 'بحث سريع', b1D: 'اعثر على أي خدمة بالمعرف أو الكلمة المفتاحية في أقل من ثانية مع فلاتر ذكية.',
    b2T: 'تفاصيل واضحة', b2D: 'كل خدمة توضح الحد الأدنى/الأقصى، وقت البدء، وضمان إعادة التعبئة ومتوسط التسليم.',
    b3T: 'متوافق مع الجوال', b3D: 'لوحة تحكم متجاوبة بالكامل مع تنقل سفلي وحقول دائرية سهلة الاستخدام.',
    b4T: 'دعم 24/7', b4D: 'الرد على التذاكر بسرعة، مع تتبع حي للطلبات وإيصالات المعاملات.',
    faq: 'الأسئلة الشائعة',
    faqQ1: 'ما مدى سرعة بدء الطلبات؟', faqA1: 'معظم الخدمات تبدأ خلال 0-30 دقيقة. كل بطاقة خدمة توضح وقت البدء المتوقع وسرعة التسليم.',
    faqQ2: 'ماذا لو انخفض العدد؟', faqA2: 'الخدمات التي بها إعادة تعبئة تتضمن ضمان 30 يوماً. افتح تذكرة وسنعيد التعبئة مجاناً.',
    faqQ3: 'هل يمكنني استخدام طرق دفع متعددة؟', faqA3: 'نعم. ندعم فيزا، بايبال، العملات الرقمية (USDT/BTC) وفودافون كاش لمصر مع تأكيد فوري في الوضع التجريبي.',
    faqQ4: 'هل بياناتي آمنة؟', faqA4: 'النسخة التجريبية تستخدم التخزين المحلي فقط. في الإنتاج، يتم تشفير كلمات المرور على الخادم ومفاتيح API لا تظهر في الواجهة.',
    newOrder: 'طلب جديد', orders: 'الطلبات', addFunds: 'إضافة رصيد', transactions: 'المعاملات', favorites: 'المفضلة', support: 'الدعم', settings: 'الإعدادات', apiKey: 'مفتاح API',
    platform: 'المنصة', service: 'الخدمة', link: 'الرابط', quantity: 'الكمية', charge: 'التكلفة', min: 'الحد الأدنى', max: 'الحد الأقصى', price: 'السعر',
    search: 'ابحث عن الخدمات...', all: 'الكل', submitOrder: 'إرسال الطلب', orderCreated: 'تم إنشاء الطلب!',
    addFundsTitle: 'إضافة رصيد', amount: 'المبلغ', pay: 'ادفع وأضف الرصيد', txHistory: 'سجل المعاملات',
    admin: 'الإدارة', users: 'المستخدمون', manageServices: 'إدارة الخدمات', manageOrders: 'إدارة الطلبات',
    totalUsers: 'إجمالي المستخدمين', totalOrders: 'إجمالي الطلبات', totalRevenue: 'إجمالي الإيرادات',
    id: 'المعرف', rate: 'السعر / 1000', status: 'الحالة', date: 'التاريخ', action: 'الإجراء',
    noOrders: 'لا توجد طلبات بعد. أنشئ طلبك الأول لتراه هنا.',
    noServices: 'لم يتم العثور على خدمات. جرب فلاتر مختلفة.',
    linkPh: 'https://...', qtyPh: '1000',
    footerDesc: 'GrowthX لوحة SMM مميزة لصناع المحتوى والوكالات والعلامات. سريع وشفاف ومتوافق مع الجوال.',
    terms: 'الشروط', privacy: 'الخصوصية', contact: 'اتصل بنا',
    language: 'English', languageEn: 'العربية',
    instant: 'رصيد فوري', secure: 'دفع آمن', dashboardPreview: 'معاينة اللوحة',
  }
};

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', color: 'bg-[#fdf2f8] text-[#db2777]', letter: 'IG' },
  { id: 'tiktok', name: 'TikTok', color: 'bg-[#f8fafc] text-slate-900', letter: 'TT' },
  { id: 'youtube', name: 'YouTube', color: 'bg-[#fef2f2] text-[#dc2626]', letter: 'YT' },
  { id: 'facebook', name: 'Facebook', color: 'bg-[#eff6ff] text-[#2563eb]', letter: 'FB' },
  { id: 'telegram', name: 'Telegram', color: 'bg-[#f0f9ff] text-[#0ea5e9]', letter: 'TG' },
  { id: 'spotify', name: 'Spotify', color: 'bg-[#f0fdf4] text-[#16a34a]', letter: 'SP' },
  { id: 'discord', name: 'Discord', color: 'bg-[#eef2ff] text-[#6366f1]', letter: 'DC' },
  { id: 'twitch', name: 'Twitch', color: 'bg-[#faf5ff] text-[#9333ea]', letter: 'TW' },
  { id: 'x', name: 'X', color: 'bg-[#f8fafc] text-slate-900', letter: 'X' },
  { id: 'soundcloud', name: 'SoundCloud', color: 'bg-[#fff7ed] text-[#ea580c]', letter: 'SC' },
];


const SERVICES_DATA = [
  { id: 101, name: 'Instagram Followers - High Quality', platform: 'instagram', category: 'Followers', rate: 1.20, min: 100, max: 100000, desc: 'Real-looking followers, no password needed. Stable with 30-day refill. Average start 0-15 min.', start: '0-15 min', refill: '30 days', popular: true },
  { id: 102, name: 'Instagram Likes - Fast', platform: 'instagram', category: 'Likes', rate: 0.45, min: 50, max: 50000, desc: 'Fast likes for posts/reels. Instant start.', start: '0-5 min', refill: '7 days', popular: true },
  { id: 103, name: 'Instagram Views - Reels', platform: 'instagram', category: 'Views', rate: 0.15, min: 100, max: 1000000, desc: 'Reels views with high retention.', start: 'Instant', refill: 'No' },
  { id: 201, name: 'TikTok Followers - Premium', platform: 'tiktok', category: 'Followers', rate: 1.80, min: 100, max: 50000, desc: 'Premium TikTok followers, organic look.', start: '0-30 min', refill: '30 days', popular: true },
  { id: 202, name: 'TikTok Likes - HQ', platform: 'tiktok', category: 'Likes', rate: 0.55, min: 50, max: 100000, desc: 'High quality likes, no drop.', start: '0-10 min', refill: '15 days' },
  { id: 203, name: 'TikTok Views - Viral Boost', platform: 'tiktok', category: 'Views', rate: 0.08, min: 1000, max: 10000000, desc: 'Super fast views for virality.', start: 'Instant', refill: 'No', popular: true },
  { id: 301, name: 'YouTube Subscribers - Real', platform: 'youtube', category: 'Subscribers', rate: 6.50, min: 100, max: 20000, desc: 'Real subscribers, slow drip natural.', start: '0-1 hour', refill: '60 days' },
  { id: 302, name: 'YouTube Views - High Retention', platform: 'youtube', category: 'Views', rate: 2.20, min: 100, max: 1000000, desc: 'High retention 70-90%, monetizable safe.', start: '0-30 min', refill: 'No', popular: true },
  { id: 401, name: 'Facebook Page Likes', platform: 'facebook', category: 'Likes', rate: 2.00, min: 100, max: 20000, desc: 'Page likes from real profiles.', start: '0-2 hour', refill: '30 days' },
  { id: 501, name: 'Telegram Channel Members', platform: 'telegram', category: 'Members', rate: 0.90, min: 100, max: 100000, desc: 'Channel members, fast delivery.', start: '0-10 min', refill: '30 days' },
  { id: 601, name: 'Spotify Plays - Premium', platform: 'spotify', category: 'Plays', rate: 0.35, min: 1000, max: 1000000, desc: 'Premium plays from real accounts.', start: '0-30 min', refill: 'No' },
  { id: 701, name: 'Discord Members - Online', platform: 'discord', category: 'Members', rate: 3.20, min: 50, max: 10000, desc: 'Online members, stable.', start: '0-1 hour', refill: '7 days' },
  { id: 801, name: 'Twitch Followers', platform: 'twitch', category: 'Followers', rate: 2.80, min: 100, max: 20000, desc: 'Twitch followers, safe for affiliate.', start: '0-30 min', refill: '30 days' },
  { id: 901, name: 'X Followers - High Quality', platform: 'x', category: 'Followers', rate: 1.50, min: 100, max: 50000, desc: 'High quality X followers.', start: '0-15 min', refill: '30 days' },
  { id: 1001, name: 'SoundCloud Plays', platform: 'soundcloud', category: 'Plays', rate: 0.40, min: 1000, max: 1000000, desc: 'Real plays for tracks.', start: '0-15 min', refill: 'No' },
];

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState<View>('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navNonce, setNavNonce] = useState(0);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [showPass, setShowPass] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '', confirm: '', remember: true });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQ, setSearchQ] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedServiceId, setSelectedServiceId] = useState<number>(101);
  const [linkInput, setLinkInput] = useState('');
  const [qtyInput, setQtyInput] = useState('1000');
  const [fundAmount, setFundAmount] = useState('50');
  const [fundMethod, setFundMethod] = useState('visa');
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [adminServices, setAdminServices] = useState(SERVICES_DATA);

  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('gx_lang');
    if (savedLang) setLang(savedLang);
    const savedUser = localStorage.getItem('gx_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedOrders = localStorage.getItem('gx_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    const savedTx = localStorage.getItem('gx_tx');
    if (savedTx) setTransactions(JSON.parse(savedTx));
    const savedFav = localStorage.getItem('gx_fav');
    if (savedFav) setFavorites(JSON.parse(savedFav));
  }, []);

  useEffect(() => { localStorage.setItem('gx_lang', lang); }, [lang]);
  useEffect(() => { if (user) localStorage.setItem('gx_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('gx_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('gx_tx', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('gx_fav', JSON.stringify(favorites)); }, [favorites]);

  const selectedService = useMemo(() => adminServices.find(s => s.id === selectedServiceId) || adminServices[0], [selectedServiceId, adminServices]);

  const filteredServices = useMemo(() => {
    return adminServices.filter(s => {
      const matchSearch = searchQ === '' || s.name.toLowerCase().includes(searchQ.toLowerCase()) || s.id.toString().includes(searchQ);
      const matchPlat = platformFilter === 'all' || s.platform === platformFilter;
      const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
      return matchSearch && matchPlat && matchCat;
    });
  }, [searchQ, platformFilter, categoryFilter, adminServices]);

  const servicesByPlatform = useMemo(() => adminServices.filter(s => s.platform === selectedPlatform), [selectedPlatform, adminServices]);

  const qtyNum = parseInt(qtyInput) || 0;
  const priceCalc = selectedService ? (selectedService.rate * qtyNum / 1000) : 0;
  const qtyValid = selectedService ? qtyNum >= selectedService.min && qtyNum <= selectedService.max : false;

  const isAdmin = user?.email === 'admin@admin.com';

  const handleAuth = (mode) => {
    setAuthError(''); setAuthLoading(true);
    setTimeout(() => {
      if (mode === 'signin') {
        if (!authForm.email.includes('@') || authForm.password.length < 4) { setAuthError(lang === 'en' ? 'Enter valid email and password (min 4 chars)' : 'أدخل بريداً وكلمة مرور صحيحة'); setAuthLoading(false); return; }
        const newUser = { email: authForm.email, balance: 10.736, apiKey: 'gx_' + Math.random().toString(36).slice(2, 12) + '_' + Date.now().toString(36) };
        setUser(newUser); setView('dashboard-new'); setAuthMode(null);
      } else if (mode === 'signup') {
        if (!authForm.email.includes('@') || authForm.password.length < 4) { setAuthError(lang === 'en' ? 'Invalid data' : 'بيانات غير صالحة'); setAuthLoading(false); return; }
        if (authForm.password !== authForm.confirm) { setAuthError(lang === 'en' ? 'Passwords do not match' : 'كلمتا المرور غير متطابقتين'); setAuthLoading(false); return; }
        const newUser = { email: authForm.email, balance: 10.736, apiKey: 'gx_' + Math.random().toString(36).slice(2, 12) };
        setUser(newUser); setView('dashboard-new'); setAuthMode(null);
      } else if (mode === 'forgot') {
        setAuthError(''); setAuthMode(null);
        setTimeout(() => alert(lang === 'en' ? 'Reset link sent to ' + authForm.email : 'تم إرسال رابط إعادة التعيين إلى ' + authForm.email), 100);
      }
      setAuthLoading(false); setAuthForm({ email: '', password: '', confirm: '', remember: true });
    }, 700);
  };

  const handleOrderSubmit = () => {
    if (!user) { setAuthMode('signin'); return; }
    if (!qtyValid || !linkInput.startsWith('http') || priceCalc > user.balance) return;
    const order = {
      id: Math.floor(100000 + Math.random() * 900000),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      platform: selectedService.platform,
      link: linkInput,
      quantity: qtyNum,
      charge: priceCalc,
      status: 'Pending',
      date: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    setUser((u) => ({ ...u, balance: +(u.balance - priceCalc).toFixed(3) }));
    setOrderSuccess(order);
    setTransactions(prev => [{ id: Date.now(), type: 'order', amount: -priceCalc, desc: `Order #${order.id}`, date: new Date().toISOString() }, ...prev]);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Processing' } : o));
    }, 1000);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o));
    }, 3000);
    setTimeout(() => setOrderSuccess(null), 4000);
    setLinkInput(''); setQtyInput('1000');
  };

  const handleAddFunds = () => {
    const amt = parseFloat(fundAmount);
    if (isNaN(amt) || amt < 1) return;
    setUser((u) => ({ ...u, balance: +(u.balance + amt).toFixed(3) }));
    setTransactions(prev => [{ id: Date.now(), type: 'fund', amount: amt, method: fundMethod, desc: `Add funds via ${fundMethod}`, date: new Date().toISOString(), status: 'Completed' }, ...prev]);
    setFundAmount('50');
  };

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const categories = Array.from(new Set(adminServices.map(s => s.category)));

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} data-nav={navNonce} className="min-h-screen bg-[#f8f9fb] text-slate-900 antialiased selection:bg-slate-900 selection:text-white overflow-x-clip" style={{ fontFamily: "'Inter', 'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter','IBM Plex Sans Arabic',system-ui,sans-serif; }
        ::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}::-webkit-scrollbar-track{background:transparent}
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#f8f9fb]/85 border-b border-slate-200/70 overflow-x-clip">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => { setView('home'); setNavNonce(n=>n+1); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-[12px] bg-slate-900 text-white grid place-items-center font-bold text-[14px] tracking-tight">GX</div>
              <span className="font-semibold text-[17px] tracking-tight">GrowthX</span>
              <span className="hidden md:inline-flex ml-1 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-500">PRO</span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { k: 'home', label: t.home, v: 'home' },
                { k: 'services', label: t.services, v: 'services' },
                { k: 'api', label: t.api, v: 'api' },
              ].map(item => (
                <button key={item.k} onClick={() => { setView(item.v); setNavNonce(n=>n+1); window.scrollTo({top:0}); }} className={`h-9 px-4 rounded-full text-[14px] font-medium transition ${view === item.v ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}>{item.label}</button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="h-9 px-3 rounded-full bg-white border border-slate-200 text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-[#f1f5f9] grid place-items-center text-[11px]">A</span>
              {lang === 'en' ? t.language : t.languageEn}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex h-9 items-center gap-2 px-3 rounded-full bg-white border border-slate-200">
                  <span className="text-[12px] text-slate-500">{t.balance}</span>
                  <span className="text-[14px] font-semibold">${user.balance.toFixed(3)}</span>
                </div>
                <button onClick={() => setView('dashboard-new')} className="h-9 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium">{t.dashboard}</button>
                <button onClick={() => { setUser(null); localStorage.removeItem('gx_user'); setView('home'); }} className="hidden md:flex h-9 w-9 rounded-full bg-white border border-slate-200 grid place-items-center text-slate-600">↪</button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setAuthMode('signin')} className="h-9 px-4 rounded-full bg-white border border-slate-200 text-[13px] font-medium">{t.signin}</button>
                <button onClick={() => setAuthMode('signup')} className="h-9 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium">{t.signup}</button>
              </div>
            )}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden h-9 w-9 rounded-full bg-white border border-slate-200 grid place-items-center">☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
            <button onClick={() => { setView('home'); setMobileMenu(false); }} className="w-full h-11 rounded-full bg-slate-50 text-left px-4 text-[14px] font-medium">{t.home}</button>
            <button onClick={() => { setView('services'); setMobileMenu(false); }} className="w-full h-11 rounded-full bg-slate-50 text-left px-4 text-[14px] font-medium">{t.services}</button>
            <button onClick={() => { setView('api'); setMobileMenu(false); }} className="w-full h-11 rounded-full bg-slate-50 text-left px-4 text-[14px] font-medium">{t.api}</button>
            {!user && (
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setAuthMode('signin'); setMobileMenu(false); }} className="flex-1 h-11 rounded-full border border-slate-200 text-[14px] font-medium">{t.signin}</button>
                <button onClick={() => { setAuthMode('signup'); setMobileMenu(false); }} className="flex-1 h-11 rounded-full bg-slate-900 text-white text-[14px] font-medium">{t.signup}</button>
              </div>
            )}
            {user && (
              <button onClick={() => { setView('dashboard-new'); setMobileMenu(false); }} className="w-full h-11 rounded-full bg-slate-900 text-white text-[14px] font-medium">{t.dashboard} • ${user.balance.toFixed(3)}</button>
            )}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 py-6 md:py-8">
        {/* HOME */}
        {view === 'home' && (
          <div className="space-y-10">
            {/* HERO */}
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] font-medium text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>{t.instant} • {t.secure}
                </div>
                <h1 className="text-[30px] md:text-[44px] font-[700] leading-[1.1] tracking-tight text-slate-900 max-w-[24ch]">{t.heroTitle}</h1>
                <p className="text-[15px] md:text-[17px] leading-[1.6] text-slate-500 max-w-[52ch]">{t.heroDesc}</p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => user ? setView('dashboard-new') : setAuthMode('signup')} className="h-11 px-6 rounded-full bg-slate-900 text-white text-[14px] font-semibold shadow-[0_8px_20px_-8px_rgba(15,23,42,0.4)] hover:bg-black transition">{t.getStarted}</button>
                  <button onClick={() => setView('services')} className="h-11 px-6 rounded-full bg-white border border-slate-200 text-[14px] font-medium hover:bg-slate-50">{t.viewServices}</button>
                </div>
                <div className="flex items-center gap-3 pt-2 text-[13px] text-slate-500">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="h-7 w-7 rounded-full bg-white border border-slate-200 grid place-items-center text-[11px] font-medium">★</div>)}
                  </div>
                  <span>Trusted by 12k+ agencies • 4.9/5 rating</span>
                </div>
              </div>

              {/* DASHBOARD PREVIEW CARD - hero visual */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-100 via-white to-sky-100 rounded-[28px] blur-[12px] opacity-60"></div>
                <div className="relative bg-white rounded-[24px] border border-slate-200 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] p-4 md:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-slate-500 tracking-wide uppercase">{t.dashboardPreview}</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-medium">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-3.5">
                      <div className="text-[11px] text-slate-500">{t.balance}</div>
                      <div className="text-[20px] font-semibold tracking-tight">$10.736</div>
                      <div className="mt-2 h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200"><div className="h-full w-[78%] bg-slate-900 rounded-full"></div></div>
                    </div>
                    <div className="rounded-[16px] bg-slate-900 text-white p-3.5">
                      <div className="text-[11px] text-slate-300">Orders</div>
                      <div className="text-[20px] font-semibold">1,248</div>
                      <div className="text-[11px] text-emerald-300 mt-1">+12% today</div>
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-slate-200 p-3 space-y-2.5">
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-full bg-[#f8f9fb] border border-slate-200 px-3 flex items-center text-[13px] text-slate-500">Instagram ▾</div>
                      <div className="flex-1 h-10 rounded-full bg-[#f8f9fb] border border-slate-200 px-3 flex items-center text-[13px] text-slate-500">Followers</div>
                    </div>
                    <div className="h-10 rounded-full bg-[#f8f9fb] border border-slate-200 px-3 flex items-center text-[13px] text-slate-400">{t.linkPh}</div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-full bg-[#f8f9fb] border border-slate-200 px-3 flex items-center text-[13px] text-slate-700">1,000</div>
                      <div className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium grid place-items-center">$1.20</div>
                    </div>
                    <div className="h-10 rounded-full bg-slate-900 text-white text-[13px] font-medium grid place-items-center">Submit Order</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px] text-slate-500"><span>Recent orders</span><span className="text-slate-900 font-medium">View all</span></div>
                    {[
                      { id: '39281', name: 'IG Followers', status: 'Completed' },
                      { id: '39280', name: 'TikTok Views', status: 'Processing' },
                      { id: '39279', name: 'YT Views', status: 'Pending' },
                    ].map(o => (
                      <div key={o.id} className="flex items-center justify-between h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[13px]">
                        <span className="font-medium">#{o.id} • {o.name}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : o.status === 'Processing' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{o.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PLATFORMS */}
            <section className="bg-white rounded-[24px] border border-slate-200 p-5 md:p-7">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight">{t.platforms}</h2>
                  <p className="text-[14px] text-slate-500 mt-1">{t.platformsDesc}</p>
                </div>
                <div className="flex gap-2 overflow-auto pb-1">
                  {PLATFORMS.slice(0,6).map(p => <span key={p.id} className={`px-3 py-1.5 rounded-full border border-slate-200 text-[12px] font-medium ${p.color}`}>{p.name}</span>)}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => { setSelectedPlatform(p.id); if (user) setView('dashboard-new'); else setView('services'); setPlatformFilter(p.id); }} className="group text-left rounded-[20px] border border-slate-200 bg-[#fcfcfd] hover:bg-white hover:shadow-[0_10px_30px_-16px_rgba(15,23,42,0.2)] transition p-4 space-y-3">
                    <div className={`h-10 w-10 rounded-[14px] grid place-items-center text-[13px] font-bold border border-slate-200 ${p.color}`}>{p.letter}</div>
                    <div>
                      <div className="text-[14px] font-semibold">{p.name}</div>
                      <div className="text-[12px] text-slate-500 mt-1 leading-[1.4]">Followers, likes, views and more • from $0.08/1k</div>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] font-medium text-slate-900">Select <span className="group-hover:translate-x-0.5 transition">→</span></div>
                  </button>
                ))}
              </div>
            </section>

            {/* POPULAR */}
            <section className="bg-white rounded-[24px] border border-slate-200 overflow-hidden">
              <div className="p-5 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight">{t.popular}</h2>
                  <p className="text-[14px] text-slate-500 mt-1">{t.popularDesc}</p>
                </div>
                <button onClick={() => setView('services')} className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium">Browse all services</button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f8f9fb] text-[12px] text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3 font-medium">{t.id}</th>
                      <th className="px-5 py-3 font-medium">{t.service}</th>
                      <th className="px-5 py-3 font-medium">{t.platform}</th>
                      <th className="px-5 py-3 font-medium">{t.rate}</th>
                      <th className="px-5 py-3 font-medium">Delivery</th>
                      <th className="px-5 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {adminServices.filter(s => s.popular).map(s => (
                      <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-[#fcfcfd]">
                        <td className="px-5 py-3.5 font-medium text-slate-700">#{s.id}</td>
                        <td className="px-5 py-3.5 font-medium text-slate-900 max-w-[28ch] truncate">{s.name}</td>
                        <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-slate-200 text-[12px] capitalize">{s.platform}</span></td>
                        <td className="px-5 py-3.5 font-semibold">${s.rate.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-slate-500">{s.start} • {s.refill} refill</td>
                        <td className="px-5 py-3.5"><button onClick={() => { setSelectedPlatform(s.platform); setSelectedServiceId(s.id); if (user) setView('dashboard-new'); else setAuthMode('signin'); }} className="h-8 px-3 rounded-full bg-slate-900 text-white text-[12px] font-medium">Order</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3 STEPS */}
            <section>
              <h2 className="text-[22px] font-semibold tracking-tight mb-5">{t.stepsTitle}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { n: '01', t: t.step1T, d: t.step1D, icon: '◑' },
                  { n: '02', t: t.step2T, d: t.step2D, icon: '◎' },
                  { n: '03', t: t.step3T, d: t.step3D, icon: '◍' },
                ].map(s => (
                  <div key={s.n} className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="h-9 w-9 rounded-full bg-slate-900 text-white grid place-items-center text-[13px] font-semibold">{s.n}</span>
                      <span className="h-9 w-9 rounded-full bg-[#f8f9fb] border border-slate-200 grid place-items-center text-slate-600">{s.icon}</span>
                    </div>
                    <h3 className="text-[16px] font-semibold">{s.t}</h3>
                    <p className="text-[13px] leading-[1.6] text-slate-500">{s.d}</p>
                    <div className="flex gap-1.5 pt-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">Visa</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">PayPal</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">Crypto</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BENEFITS + FAQ */}
            <div className="grid lg:grid-cols-2 gap-6">
              <section className="rounded-[24px] bg-white border border-slate-200 p-6 md:p-7 space-y-5">
                <h2 className="text-[20px] font-semibold tracking-tight">{t.benefitsTitle}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { t: t.b1T, d: t.b1D }, { t: t.b2T, d: t.b2D }, { t: t.b3T, d: t.b3D }, { t: t.b4T, d: t.b4D },
                  ].map((b, i) => (
                    <div key={i} className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4">
                      <div className="h-8 w-8 rounded-full bg-white border border-slate-200 grid place-items-center text-[13px] mb-3">✦</div>
                      <div className="text-[14px] font-semibold">{b.t}</div>
                      <div className="text-[12px] text-slate-500 mt-1 leading-[1.5]">{b.d}</div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-[24px] bg-slate-900 text-white p-6 md:p-7 space-y-4">
                <h2 className="text-[20px] font-semibold tracking-tight">{t.faq}</h2>
                <div className="space-y-2">
                  {[
                    { q: t.faqQ1, a: t.faqA1 },
                    { q: t.faqQ2, a: t.faqA2 },
                    { q: t.faqQ3, a: t.faqA3 },
                    { q: t.faqQ4, a: t.faqA4 },
                  ].map((f, i) => (
                    <div key={i} className="rounded-[16px] border border-white/10 bg-white/[0.06]">
                      <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between text-left p-4">
                        <span className="text-[14px] font-medium pr-4">{f.q}</span>
                        <span className={`h-7 w-7 rounded-full bg-white text-slate-900 grid place-items-center text-[14px] transition ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {faqOpen === i && <div className="px-4 pb-4 text-[13px] leading-[1.6] text-slate-300">{f.a}</div>}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* SERVICES PAGE */}
        {view === 'services' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
              <h1 className="text-[26px] font-semibold tracking-tight">{t.services}</h1>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-[320px]">
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={t.search} className="w-full h-11 rounded-full bg-white border border-slate-200 px-4 pl-10 text-[14px] outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                </div>
                <button onClick={() => setSearchQ('')} className="h-11 px-4 rounded-full bg-white border border-slate-200 text-[13px] font-medium">Clear</button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => setPlatformFilter('all')} className={`h-9 px-4 rounded-full border text-[13px] font-medium transition ${platformFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t.all}</button>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setPlatformFilter(p.id)} className={`h-9 px-4 rounded-full border text-[13px] font-medium capitalize transition ${platformFilter === p.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p.name}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCategoryFilter('all')} className={`h-8 px-3 rounded-full border text-[12px] font-medium ${categoryFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-[#f8f9fb] border-slate-200 text-slate-600'}`}>All categories</button>
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`h-8 px-3 rounded-full border text-[12px] font-medium ${categoryFilter === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-[#f8f9fb] border-slate-200 text-slate-600'}`}>{c}</button>
              ))}
            </div>

            <div className="bg-white rounded-[20px] border border-slate-200 overflow-hidden">
              <div className="overflow-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f8f9fb] text-[12px] text-slate-500 border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t.id}</th>
                      <th className="px-4 py-3 font-medium">{t.service}</th>
                      <th className="px-4 py-3 font-medium">{t.rate}</th>
                      <th className="px-4 py-3 font-medium">{t.min}/{t.max}</th>
                      <th className="px-4 py-3 font-medium">Start • Refill</th>
                      <th className="px-4 py-3 font-medium">Fav</th>
                      <th className="px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {filteredServices.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">{t.noServices}</td></tr>}
                    {filteredServices.map(s => (
                      <tr key={s.id} className="border-b border-slate-100 hover:bg-[#fcfcfd]">
                        <td className="px-4 py-3 font-medium">#{s.id}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900 max-w-[32ch] truncate">{s.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{s.desc}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold">${s.rate}</td>
                        <td className="px-4 py-3 text-slate-600">{s.min}/{s.max}</td>
                        <td className="px-4 py-3 text-slate-500 text-[12px]">{s.start} • {s.refill}</td>
                        <td className="px-4 py-3"><button onClick={() => toggleFav(s.id)} className={`h-8 w-8 rounded-full border grid place-items-center ${favorites.includes(s.id) ? 'bg-amber-400 border-amber-400 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>★</button></td>
                        <td className="px-4 py-3"><button onClick={() => { setSelectedServiceId(s.id); setSelectedPlatform(s.platform); if (user) setView('dashboard-new'); else setAuthMode('signin'); }} className="h-8 px-3 rounded-full bg-slate-900 text-white text-[12px] font-medium">Select</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* API DOCS */}
        {view === 'api' && (
          <div className="max-w-[900px] mx-auto space-y-6">
            <div className="rounded-[24px] bg-white border border-slate-200 p-6 md:p-8 space-y-4">
              <h1 className="text-[28px] font-semibold tracking-tight">API Documentation</h1>
              <p className="text-[14px] text-slate-500 leading-[1.6]">Integrate GrowthX services into your app. All requests are server-side. Never expose API keys in frontend. Use environment variables.</p>
              <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4 space-y-2">
                <div className="text-[12px] font-medium text-slate-500 uppercase">Base URL</div>
                <code className="text-[13px] font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-full">https://api.growthx.io/v1</code>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-[16px] bg-slate-900 text-white p-4 space-y-2">
                  <div className="text-[12px] text-slate-300">Create order</div>
                  <code className="text-[12px] font-mono block whitespace-pre">POST /order{'\n'}key=YOUR_KEY&service=101&link=...&quantity=1000</code>
                </div>
                <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4 space-y-2">
                  <div className="text-[12px] text-slate-500">Your demo key</div>
                  <code className="text-[12px] font-mono">{user?.apiKey || 'Login to generate'}</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD VIEWS */}
        {view.startsWith('dashboard') && (
          <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:block sticky top-[80px] rounded-[20px] bg-white border border-slate-200 p-3 space-y-3">
              <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-3.5 flex items-center justify-between">
                <div><div className="text-[11px] text-slate-500">{t.balance}</div><div className="text-[18px] font-semibold">${user?.balance.toFixed(3) || '0.000'}</div></div>
                <button onClick={() => setView('dashboard-funds')} className="h-8 px-3 rounded-full bg-slate-900 text-white text-[12px] font-medium">Add</button>
              </div>
              <nav className="space-y-1">
                {[
                  { v: 'dashboard-new', l: t.newOrder, i: '◑' },
                  { v: 'dashboard-orders', l: t.orders, i: '≡' },
                  { v: 'dashboard-funds', l: t.addFunds, i: '$' },
                  { v: 'dashboard-transactions', l: t.transactions, i: '↔' },
                  { v: 'dashboard-fav', l: t.favorites, i: '★' },
                  { v: 'dashboard-services', l: t.services, i: '▦' },
                  { v: 'dashboard-support', l: t.support, i: '?' },
                  { v: 'dashboard-settings', l: t.settings, i: '⚙' },
                  { v: 'dashboard-api', l: t.apiKey, i: '</>' },
                  ...(isAdmin ? [{ v: 'dashboard-admin', l: t.admin, i: '⚑' } as any] : []),
                ].map(item => (
                  <button key={item.v} onClick={() => setView(item.v === 'dashboard-services' ? 'services' : item.v)} className={`w-full h-10 rounded-full px-4 text-left flex items-center gap-3 text-[13px] font-medium transition ${view === item.v ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-[#f8f9fb]'}`}>
                    <span className="h-6 w-6 rounded-full bg-white/10 border border-black/5 grid place-items-center text-[12px]">{item.i}</span>{item.l}
                  </button>
                ))}
              </nav>
              <button onClick={() => { setUser(null); localStorage.removeItem('gx_user'); setView('home'); }} className="w-full h-10 rounded-full bg-[#f8f9fb] border border-slate-200 text-[13px] font-medium text-slate-600">↪ {t.signout}</button>
            </aside>

            {/* CONTENT */}
            <div className="space-y-6 min-w-0">
              {/* MOBILE DASHBOARD TOP */}
              <div className="lg:hidden flex gap-2 overflow-auto pb-1">
                {[
                  { v: 'dashboard-new', l: t.newOrder },
                  { v: 'dashboard-orders', l: t.orders },
                  { v: 'dashboard-funds', l: t.addFunds },
                  { v: 'dashboard-fav', l: t.favorites },
                  { v: 'services', l: t.services },
                ].map(item => (
                  <button key={item.v} onClick={() => setView(item.v)} className={`whitespace-nowrap h-10 px-4 rounded-full border text-[13px] font-medium ${view === item.v ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600'}`}>{item.l}</button>
                ))}
              </div>

              {/* NEW ORDER */}
              {view === 'dashboard-new' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[22px] font-semibold tracking-tight">{t.newOrder}</h1>
                    <div className="hidden md:flex items-center gap-2 text-[12px] text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>Balance ${user?.balance.toFixed(3)}</div>
                  </div>

                  {orderSuccess && (
                    <div className="rounded-[16px] bg-emerald-50 border border-emerald-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white grid place-items-center">✓</div>
                        <div><div className="text-[13px] font-semibold text-emerald-800">{t.orderCreated} #{orderSuccess.id}</div><div className="text-[12px] text-emerald-700">{orderSuccess.serviceName} • {orderSuccess.quantity}</div></div>
                      </div>
                      <button onClick={() => setOrderSuccess(null)} className="h-8 w-8 rounded-full bg-white border border-emerald-200 grid place-items-center text-emerald-700">×</button>
                    </div>
                  )}

                  <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="rounded-[20px] bg-white border border-slate-200 p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-600">{t.platform}</label>
                          <select value={selectedPlatform} onChange={e => { setSelectedPlatform(e.target.value); const first = adminServices.find(s => s.platform === e.target.value); if (first) setSelectedServiceId(first.id); }} className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[14px] outline-none focus:border-slate-900">
                            {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-600">{t.service}</label>
                          <select value={selectedServiceId} onChange={e => setSelectedServiceId(Number(e.target.value))} className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[14px] outline-none focus:border-slate-900">
                            {servicesByPlatform.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-semibold">{selectedService.name}</span>
                          <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium">{selectedService.platform}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-[1.5]">{selectedService.desc}</p>
                        <div className="grid grid-cols-4 gap-2 pt-2">
                          <div className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[11px]"><span className="text-slate-500">{t.min}:</span> {selectedService.min}</div>
                          <div className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[11px]"><span className="text-slate-500">{t.max}:</span> {selectedService.max}</div>
                          <div className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[11px]"><span className="text-slate-500">{t.rate}:</span> ${selectedService.rate}</div>
                          <div className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[11px]">{selectedService.start}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[12px] font-medium text-slate-600">{t.link}</label>
                        <input value={linkInput} onChange={e => setLinkInput(e.target.value)} placeholder={t.linkPh} className="w-full h-11 rounded-full bg-white border border-slate-200 px-4 text-[14px] outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
                        {!linkInput && <div className="text-[11px] text-slate-400 px-1">Enter full URL including https://</div>}
                        {linkInput && !linkInput.startsWith('http') && <div className="text-[11px] text-amber-600 px-1">Link should start with https://</div>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-600">{t.quantity}</label>
                          <input value={qtyInput} onChange={e => setQtyInput(e.target.value.replace(/[^0-9]/g, ''))} placeholder={t.qtyPh} className={`w-full h-11 rounded-full border px-4 text-[14px] outline-none ${qtyValid || qtyInput === '' ? 'bg-white border-slate-200 focus:border-slate-900' : 'bg-amber-50 border-amber-300 focus:border-amber-400'}`} />
                          <div className="text-[11px] px-1">
                            {qtyValid ? <span className="text-emerald-600">✓ Valid range</span> : <span className="text-amber-600">Min {selectedService.min} / Max {selectedService.max}</span>}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-600">{t.charge}</label>
                          <div className="h-11 rounded-full bg-slate-900 text-white px-4 flex items-center justify-between text-[14px] font-semibold">
                            <span>${priceCalc.toFixed(3)}</span>
                            <span className="text-[11px] font-medium text-slate-300">${selectedService.rate}/1k × {qtyNum}</span>
                          </div>
                          {user && priceCalc > user.balance && <div className="text-[11px] text-red-600 px-1">Insufficient balance</div>}
                        </div>
                      </div>

                      <button onClick={handleOrderSubmit} disabled={!qtyValid || !linkInput.startsWith('http') || (user && priceCalc > user.balance)} className="w-full h-12 rounded-full bg-slate-900 text-white text-[14px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition shadow-[0_8px_20px_-8px_rgba(15,23,42,0.4)]">
                        {t.submitOrder} • ${priceCalc.toFixed(3)}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[20px] bg-white border border-slate-200 p-5">
                        <div className="text-[13px] font-semibold mb-3">Order summary</div>
                        <div className="space-y-2.5 text-[13px]">
                          <div className="flex justify-between"><span className="text-slate-500">Service ID</span><span className="font-medium">#{selectedService.id}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Platform</span><span className="font-medium capitalize">{selectedService.platform}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Quantity</span><span className="font-medium">{qtyNum || 0}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Rate</span><span className="font-medium">${selectedService.rate} / 1k</span></div>
                          <div className="h-px bg-slate-200 my-2"></div>
                          <div className="flex justify-between text-[15px]"><span className="font-semibold">Total</span><span className="font-semibold">${priceCalc.toFixed(3)}</span></div>
                        </div>
                      </div>
                      <div className="rounded-[20px] bg-[#f8f9fb] border border-slate-200 p-5">
                        <div className="text-[12px] font-medium text-slate-500 uppercase tracking-wide mb-2">Quick tips</div>
                        <ul className="space-y-2 text-[12px] text-slate-600 list-disc pl-4">
                          <li>Make sure profile/post is public.</li>
                          <li>Do not order same link multiple times simultaneously.</li>
                          <li>Use refill services for best retention.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-orders' && (
                <div className="space-y-4">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.orders}</h1>
                  <div className="rounded-[20px] bg-white border border-slate-200 overflow-hidden">
                    <div className="overflow-auto">
                      <table className="w-full text-left">
                        <thead className="bg-[#f8f9fb] text-[12px] text-slate-500 border-b border-slate-200">
                          <tr><th className="px-4 py-3">{t.id}</th><th className="px-4 py-3">{t.service}</th><th className="px-4 py-3">{t.link}</th><th className="px-4 py-3">{t.quantity}</th><th className="px-4 py-3">{t.charge}</th><th className="px-4 py-3">{t.status}</th><th className="px-4 py-3">{t.date}</th></tr>
                        </thead>
                        <tbody className="text-[13px]">
                          {orders.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">{t.noOrders}</td></tr>}
                          {orders.map(o => (
                            <tr key={o.id} className="border-b border-slate-100">
                              <td className="px-4 py-3 font-medium">#{o.id}</td>
                              <td className="px-4 py-3 max-w-[18ch] truncate">{o.serviceName}</td>
                              <td className="px-4 py-3 max-w-[18ch] truncate text-slate-500">{o.link}</td>
                              <td className="px-4 py-3">{o.quantity}</td>
                              <td className="px-4 py-3 font-semibold">${o.charge.toFixed(3)}</td>
                              <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : o.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-200' : o.status === 'Pending' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{o.status}</span></td>
                              <td className="px-4 py-3 text-slate-500 text-[12px]">{new Date(o.date).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-funds' && (
                <div className="space-y-4">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.addFundsTitle}</h1>
                  <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="rounded-[20px] bg-white border border-slate-200 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-slate-500">Current {t.balance}</span>
                        <span className="text-[20px] font-semibold">${user?.balance.toFixed(3)}</span>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-medium text-slate-600">{t.amount} (USD)</label>
                        <input value={fundAmount} onChange={e => setFundAmount(e.target.value)} className="w-full h-12 rounded-full bg-[#f8f9fb] border border-slate-200 px-5 text-[16px] font-medium outline-none focus:border-slate-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-medium text-slate-600">Payment method</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'visa', label: 'Visa / Mastercard', sub: 'Instant' },
                            { id: 'paypal', label: 'PayPal', sub: 'Instant' },
                            { id: 'crypto', label: 'Crypto USDT/BTC', sub: 'Confirmations' },
                            { id: 'vodafone', label: 'Vodafone Cash (EG)', sub: 'Local' },
                          ].map(m => (
                            <button key={m.id} onClick={() => setFundMethod(m.id)} className={`text-left rounded-[16px] border p-3 transition ${fundMethod === m.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-[#f8f9fb] border-slate-200 hover:bg-white'}`}>
                              <div className="text-[13px] font-semibold">{m.label}</div>
                              <div className={`text-[11px] ${fundMethod === m.id ? 'text-slate-300' : 'text-slate-500'}`}>{m.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-3 text-[12px] text-slate-600">
                        {fundMethod === 'visa' && 'Pay with Visa. Balance added instantly in demo mode after confirmation.'}
                        {fundMethod === 'paypal' && 'PayPal checkout simulated. No real charge in demo.'}
                        {fundMethod === 'crypto' && 'Send USDT TRC20 to demo address. Auto-confirmed in demo.'}
                        {fundMethod === 'vodafone' && 'Vodafone Cash Egypt number: 0100 XXX XXXX - send screenshot via support.'}
                      </div>
                      <button onClick={handleAddFunds} className="w-full h-12 rounded-full bg-slate-900 text-white text-[14px] font-semibold hover:bg-black">{t.pay} • ${fundAmount}</button>
                    </div>
                    <div className="rounded-[20px] bg-white border border-slate-200 p-5">
                      <div className="text-[13px] font-semibold mb-3">{t.txHistory}</div>
                      <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
                        {transactions.length === 0 && <div className="text-[13px] text-slate-500 py-8 text-center">No transactions yet</div>}
                        {transactions.map(tx => (
                          <div key={tx.id} className="flex items-center justify-between rounded-full bg-[#f8f9fb] border border-slate-200 px-4 py-2.5">
                            <div><div className="text-[13px] font-medium">{tx.desc}</div><div className="text-[11px] text-slate-500">{new Date(tx.date).toLocaleString()} • {tx.method || tx.type}</div></div>
                            <div className={`text-[13px] font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(3)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-transactions' && (
                <div className="space-y-4">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.transactions}</h1>
                  <div className="rounded-[20px] bg-white border border-slate-200 overflow-hidden">
                    <div className="overflow-auto">
                      <table className="w-full text-left">
                        <thead className="bg-[#f8f9fb] text-[12px] text-slate-500 border-b"><tr><th className="px-4 py-3">Type</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Date</th></tr></thead>
                        <tbody className="text-[13px]">
                          {transactions.map(tx => <tr key={tx.id} className="border-b border-slate-100"><td className="px-4 py-3 capitalize">{tx.type}</td><td className={`px-4 py-3 font-semibold ${tx.amount > 0 ? 'text-emerald-600' : ''}`}>${tx.amount.toFixed(3)}</td><td className="px-4 py-3">{tx.desc}</td><td className="px-4 py-3 text-slate-500 text-[12px]">{new Date(tx.date).toLocaleString()}</td></tr>)}
                          {transactions.length === 0 && <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No transactions</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-fav' && (
                <div className="space-y-4">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.favorites}</h1>
                  <div className="grid gap-3">
                    {adminServices.filter(s => favorites.includes(s.id)).map(s => (
                      <div key={s.id} className="rounded-[16px] bg-white border border-slate-200 p-4 flex items-center justify-between">
                        <div><div className="text-[13px] font-semibold">{s.name}</div><div className="text-[12px] text-slate-500">#{s.id} • ${s.rate} • {s.platform}</div></div>
                        <div className="flex gap-2"><button onClick={() => toggleFav(s.id)} className="h-9 w-9 rounded-full bg-amber-400 text-white grid place-items-center">★</button><button onClick={() => { setSelectedServiceId(s.id); setView('dashboard-new'); }} className="h-9 px-4 rounded-full bg-slate-900 text-white text-[12px] font-medium">Order</button></div>
                      </div>
                    ))}
                    {favorites.length === 0 && <div className="rounded-[20px] bg-white border border-slate-200 p-12 text-center text-slate-500 text-[14px]">No favorites yet. Star services from Services page.</div>}
                  </div>
                </div>
              )}

              {view === 'dashboard-support' && (
                <div className="space-y-4 max-w-[720px]">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.support}</h1>
                  <div className="rounded-[20px] bg-white border border-slate-200 p-6 space-y-4">
                    <div className="rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4 text-[13px] text-slate-600">Support tickets are simulated in demo. In production they connect to backend. Email: support@growthx.io • Response time: ~1h</div>
                    <div className="space-y-3">
                      <input placeholder="Subject" className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[14px]" />
                      <textarea placeholder="Describe your issue..." className="w-full h-28 rounded-[16px] bg-[#f8f9fb] border border-slate-200 p-4 text-[14px] resize-none"></textarea>
                      <button onClick={() => alert('Ticket created (demo)')} className="h-11 px-6 rounded-full bg-slate-900 text-white text-[14px] font-medium">Submit ticket</button>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-settings' && (
                <div className="space-y-4 max-w-[720px]">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.settings}</h1>
                  <div className="rounded-[20px] bg-white border border-slate-200 p-6 space-y-4">
                    <div><label className="text-[12px] text-slate-500">Email</label><div className="mt-1 h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 flex items-center text-[14px]">{user?.email}</div></div>
                    <div><label className="text-[12px] text-slate-500">API Key</label><div className="mt-1 h-11 rounded-full bg-slate-900 text-white px-4 flex items-center justify-between text-[12px] font-mono"><span className="truncate">{user?.apiKey}</span><button onClick={() => navigator.clipboard.writeText(user?.apiKey)} className="ml-2 h-7 px-3 rounded-full bg-white text-slate-900 text-[11px] font-medium">Copy</button></div></div>
                    <button onClick={() => alert('Settings saved (demo)')} className="h-11 px-6 rounded-full bg-slate-900 text-white text-[14px] font-medium">Save changes</button>
                  </div>
                </div>
              )}

              {view === 'dashboard-api' && (
                <div className="space-y-4 max-w-[720px]">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.apiKey}</h1>
                  <div className="rounded-[20px] bg-white border border-slate-200 p-6 space-y-3">
                    <div className="text-[13px] text-slate-600">Use this key server-side only. Never expose in frontend.</div>
                    <code className="block rounded-[12px] bg-[#f8f9fb] border border-slate-200 p-3 text-[12px] font-mono break-all">{user?.apiKey}</code>
                    <div className="flex gap-2">
                      <button onClick={() => { const k = 'gx_' + Math.random().toString(36).slice(2, 10); setUser((u) => ({ ...u, apiKey: k })); }} className="h-10 px-4 rounded-full bg-white border border-slate-200 text-[13px] font-medium">Regenerate</button>
                      <button onClick={() => navigator.clipboard.writeText(user?.apiKey)} className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium">Copy key</button>
                    </div>
                  </div>
                </div>
              )}

              {view === 'dashboard-admin' && isAdmin && (
                <div className="space-y-6">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t.admin} Dashboard</h1>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { l: t.totalUsers, v: '1,248' },
                      { l: t.totalOrders, v: orders.length.toString() },
                      { l: t.totalRevenue, v: `$${transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0).toFixed(2)}` },
                    ].map(c => <div key={c.l} className="rounded-[16px] bg-white border border-slate-200 p-4"><div className="text-[12px] text-slate-500">{c.l}</div><div className="text-[20px] font-semibold mt-1">{c.v}</div></div>)}
                  </div>
                  <div className="rounded-[20px] bg-white border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center justify-between"><h3 className="text-[14px] font-semibold">{t.manageServices}</h3><button onClick={() => setAdminServices(prev => [{ id: Date.now(), name: 'New Service', platform: 'instagram', category: 'Followers', rate: 1, min: 100, max: 10000, desc: 'New', start: '0-15 min', refill: '30 days' }, ...prev])} className="h-8 px-3 rounded-full bg-slate-900 text-white text-[12px]">+ Add</button></div>
                    <div className="overflow-auto max-h-[360px]">
                      <table className="w-full text-left text-[12px]"><thead className="text-slate-500"><tr><th className="px-2 py-2">ID</th><th className="px-2 py-2">Name</th><th className="px-2 py-2">Rate</th><th className="px-2 py-2">Action</th></tr></thead><tbody>{adminServices.slice(0, 12).map(s => <tr key={s.id} className="border-b border-slate-100"><td className="px-2 py-2">#{s.id}</td><td className="px-2 py-2 truncate max-w-[16ch]">{s.name}</td><td className="px-2 py-2">${s.rate}</td><td className="px-2 py-2"><button onClick={() => setAdminServices(prev => prev.filter(x => x.id !== s.id))} className="h-7 px-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-[11px]">Delete</button></td></tr>)}</tbody></table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-10 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5"><div className="h-8 w-8 rounded-[10px] bg-slate-900 text-white grid place-items-center font-bold text-[12px]">GX</div><span className="font-semibold">GrowthX</span></div>
            <p className="text-[13px] text-slate-500 leading-[1.6] max-w-[32ch]">{t.footerDesc}</p>
            <div className="flex gap-2"><span className="h-8 w-8 rounded-full bg-[#f8f9fb] border border-slate-200 grid place-items-center text-[12px]">𝕏</span><span className="h-8 w-8 rounded-full bg-[#f8f9fb] border border-slate-200 grid place-items-center text-[12px]">IG</span><span className="h-8 w-8 rounded-full bg-[#f8f9fb] border border-slate-200 grid place-items-center text-[12px]">YT</span></div>
          </div>
          <div><div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Product</div><div className="space-y-2 text-[13px] text-slate-600"><div>Services</div><div>API Docs</div><div>Pricing</div><div>Refill Policy</div></div></div>
          <div><div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Company</div><div className="space-y-2 text-[13px] text-slate-600"><div>{t.terms}</div><div>{t.privacy}</div><div>{t.contact}</div><div>Support</div></div></div>
          <div><div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Payments</div><div className="flex flex-wrap gap-2"><span className="px-3 py-1.5 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">Visa</span><span className="px-3 py-1.5 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">PayPal</span><span className="px-3 py-1.5 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">Crypto</span><span className="px-3 py-1.5 rounded-full bg-[#f8f9fb] border border-slate-200 text-[11px]">Vodafone Cash</span></div><div className="mt-4 text-[12px] text-slate-400">© 2025 GrowthX. Demo panel. No real charges.</div></div>
        </div>
      </footer>

      {/* AUTH MODALS */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setAuthMode(null)}></div>
          <div className="relative w-full md:max-w-[420px] bg-white rounded-t-[28px] md:rounded-[24px] border border-slate-200 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.4)] p-6 md:p-7 space-y-5 animate-[slideUp_0.3s]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5"><div className="h-9 w-9 rounded-[12px] bg-slate-900 text-white grid place-items-center font-bold">GX</div><span className="font-semibold tracking-tight">{authMode === 'signin' ? t.signin : authMode === 'signup' ? t.signup : 'Reset password'}</span></div>
              <button onClick={() => setAuthMode(null)} className="h-9 w-9 rounded-full bg-[#f8f9fb] border border-slate-200 grid place-items-center">×</button>
            </div>

            {authError && <div className="rounded-full bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 text-[13px]">{authError}</div>}

            <div className="space-y-3">
              <div className="space-y-1.5"><label className="text-[12px] font-medium text-slate-600">{t.email}</label><input value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} placeholder="you@example.com" className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[14px] outline-none focus:border-slate-900 focus:bg-white transition" /></div>
              {authMode !== 'forgot' && (
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-slate-600">{t.password}</label>
                  <div className="relative"><input type={showPass ? 'text' : 'password'} value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} placeholder="••••••••" className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 pr-12 text-[14px] outline-none focus:border-slate-900 focus:bg-white transition" />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-1 top-1 h-9 w-9 rounded-full bg-white border border-slate-200 grid place-items-center text-[12px]">{showPass ? '◐' : '◑'}</button>
                  </div>
                </div>
              )}
              {authMode === 'signup' && (
                <div className="space-y-1.5"><label className="text-[12px] font-medium text-slate-600">{t.confirmPass}</label><input type={showPass ? 'text' : 'password'} value={authForm.confirm} onChange={e => setAuthForm({ ...authForm, confirm: e.target.value })} placeholder="••••••••" className="w-full h-11 rounded-full bg-[#f8f9fb] border border-slate-200 px-4 text-[14px] outline-none focus:border-slate-900 focus:bg-white" /></div>
              )}
              {authMode === 'signin' && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-[12px] text-slate-600"><input type="checkbox" checked={authForm.remember} onChange={e => setAuthForm({ ...authForm, remember: e.target.checked })} className="h-4 w-4 rounded border-slate-300" />{t.remember}</label>
                  <button onClick={() => setAuthMode('forgot')} className="text-[12px] font-medium text-slate-900 underline underline-offset-4">{t.forgot}</button>
                </div>
              )}
            </div>

            <button disabled={authLoading} onClick={() => handleAuth(authMode)} className="w-full h-12 rounded-full bg-slate-900 text-white text-[14px] font-semibold hover:bg-black transition disabled:opacity-50 flex items-center justify-center gap-2">
              {authLoading ? <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> : null}
              {authMode === 'signin' ? t.signin : authMode === 'signup' ? t.signup : 'Send reset link'}
            </button>

            <div className="text-center text-[13px] text-slate-500">
              {authMode === 'signin' ? <>{t.noAccount} <button onClick={() => setAuthMode('signup')} className="font-semibold text-slate-900 underline">{t.signup}</button></> : authMode === 'signup' ? <>{t.haveAccount} <button onClick={() => setAuthMode('signin')} className="font-semibold text-slate-900 underline">{t.signin}</button></> : <><button onClick={() => setAuthMode('signin')} className="font-semibold text-slate-900 underline">{t.signin}</button></>}
            </div>

            <div className="pt-2 text-[11px] text-center text-slate-400">Demo: use any email • Try admin@admin.com for admin view • No real password check</div>
          </div>
        </div>
      )}

      <style>{`@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}