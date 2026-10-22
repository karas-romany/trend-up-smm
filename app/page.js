'use client'
import { useState, useEffect } from 'react'

const SERVICES_DATA = {
  'Instagram': [
    { id: 14011, name: 'Instagram Followers — Fast Start', desc: 'متابعين • بدء سريع', price: 0.89, min: 100, max: 10000 },
    { id: 14012, name: 'Instagram Followers — HQ', desc: 'متابعين • جودة عالية • ضمان', price: 1.20, min: 100, max: 50000 },
    { id: 14013, name: 'Instagram Likes — Real', desc: 'إعجابات • حقيقي', price: 0.25, min: 100, max: 10000 },
    { id: 14014, name: 'Instagram Views — Reels', desc: 'مشاهدات ريلز • سريع', price: 0.12, min: 100, max: 100000 },
  ],
  'TikTok': [
    { id: 14122, name: 'TikTok Views — Worldwide', desc: 'مشاهدات • عالمي', price: 0.12, min: 100, max: 1000000 },
    { id: 14123, name: 'TikTok Followers — Fast', desc: 'متابعين • سريع', price: 1.10, min: 100, max: 10000 },
    { id: 14124, name: 'TikTok Likes — HQ', desc: 'لايكات • جودة', price: 0.35, min: 100, max: 50000 },
  ],
  'YouTube': [
    { id: 13989, name: 'YouTube Views — High Quality', desc: 'مشاهدات • جودة متعددة', price: 0.45, min: 100, max: 50000 },
    { id: 13990, name: 'YouTube Subscribers — Real', desc: 'مشتركين • حقيقي', price: 3.50, min: 100, max: 5000 },
  ],
  'Facebook': [
    { id: 14201, name: 'Facebook Followers — Page', desc: 'متابعين صفحة', price: 0.95, min: 100, max: 20000 },
    { id: 14202, name: 'Facebook Likes — Post', desc: 'لايكات منشورات', price: 0.30, min: 100, max: 10000 },
  ],
  'Telegram': [
    { id: 13604, name: 'Telegram Members — Premium', desc: 'أعضاء • تنفيذ مستقر', price: 1.55, min: 100, max: 50000 },
  ],
  'Spotify': [
    { id: 13701, name: 'Spotify Plays — Real', desc: 'استماعات', price: 0.40, min: 1000, max: 100000 },
  ],
  'Discord': [
    { id: 13711, name: 'Discord Members — Online', desc: 'أعضاء سيرفر', price: 2.10, min: 100, max: 10000 },
  ],
  'Twitch': [
    { id: 13721, name: 'Twitch Views — Live', desc: 'مشاهدات بث', price: 0.80, min: 100, max: 50000 },
  ],
  'X / Twitter': [
    { id: 13731, name: 'X Followers — Real', desc: 'متابعين', price: 1.20, min: 100, max: 20000 },
  ],
  'SoundCloud': [
    { id: 13741, name: 'SoundCloud Plays — HQ', desc: 'تشغيلات', price: 0.35, min: 100, max: 100000 },
  ],
}

const PLATFORMS = [
  { name: 'Instagram', icon: '📸', desc: 'متابعين، إعجابات، مشاهدات، ريلز، تفاعل ومشاركات.' },
  { name: 'TikTok', icon: '🎵', desc: 'مشاهدات، متابعين، لايكات وخدمات متعددة للفيديوهات.' },
  { name: 'YouTube', icon: '▶️', desc: 'مشاهدات، مشتركين، لايكات وساعات مشاهدة للقنوات.' },
  { name: 'Facebook', icon: '👍', desc: 'متابعين، تفاعل، مشاهدات وخيارات للصفحات والمحتوى.' },
  { name: 'Telegram', icon: '✈️', desc: 'أعضاء، مشاهدات وتفاعل للقنوات والجروبات المختلفة.' },
  { name: 'Spotify', icon: '🎧', desc: 'استماعات، متابعين وخدمات تساعد على زيادة وصول المحتوى.' },
  { name: 'Discord', icon: '🎮', desc: 'أعضاء وخدمات دعم للسيرفرات والمجتمعات المختلفة.' },
  { name: 'Twitch', icon: '💜', desc: 'مشاهدات، متابعين وخيارات تناسب البثوص والمحتوى المباشر.' },
  { name: 'X / Twitter', icon: '𝕏', desc: 'متابعين، إعجابات، مشاهدات وإعادة نشر للحسابات والمنشورات.' },
  { name: 'SoundCloud', icon: '☁️', desc: 'تشغيلات، متابعين وتفاعل على المقاطع والحسابات.' },
]

export default function Home() {
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [showAuth, setShowAuth] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [balance, setBalance] = useState(10.736)
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram')
  const [selectedService, setSelectedService] = useState(SERVICES_DATA['Instagram'][0])
  const [link, setLink] = useState('')
  const [quantity, setQuantity] = useState(1000)
  const [orders, setOrders] = useState([
    { id: 14011, service: 'Instagram Followers — Fast Start', status: 'مكتمل', price: 0.89, link: 'https://instagram.com/...' },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('neworder')

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 900)
    const saved = localStorage.getItem('smmx_user')
    if(saved) setUser(JSON.parse(saved))
    const savedOrders = localStorage.getItem('smmx_orders')
    if(savedOrders) setOrders(JSON.parse(savedOrders))
    const savedBal = localStorage.getItem('smmx_balance')
    if(savedBal) setBalance(parseFloat(savedBal))
    return () => clearTimeout(t)
  }, [])

  const handleAuth = () => {
    if(!email || !password) return alert('اكتب الايميل والباسورد')
    const u = { email, id: Date.now() }
    setUser(u)
    localStorage.setItem('smmx_user', JSON.stringify(u))
    setShowAuth(false)
    setEmail(''); setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('smmx_user')
  }

  const handleOrder = () => {
    if(!user) { setShowAuth(true); return }
    if(!link) return alert('حط الرابط')
    if(quantity < selectedService.min) return alert(`الحد الأدنى ${selectedService.min}`)
    const cost = (selectedService.price * quantity / 1000).toFixed(2)
    if(parseFloat(cost) > balance) return alert('رصيدك لا يكفي - اشحن رصيد')
    const newOrder = {
      id: Math.floor(Math.random()*90000)+10000,
      service: selectedService.name,
      status: 'قيد التنفيذ',
      price: parseFloat(cost),
      link,
      quantity,
      platform: selectedPlatform
    }
    const newOrders = [newOrder, ...orders]
    setOrders(newOrders)
    localStorage.setItem('smmx_orders', JSON.stringify(newOrders))
    const newBal = balance - parseFloat(cost)
    setBalance(newBal)
    localStorage.setItem('smmx_balance', newBal.toString())
    setLink('')
    setActiveTab('orders')
    alert(`تم إرسال الطلب #${newOrder.id} - $${cost}`)
  }

  const charge = ((selectedService?.price || 0) * quantity / 1000).toFixed(2)

  const filteredServices = Object.entries(SERVICES_DATA).flatMap(([plat, list]) => 
    list.map(s => ({...s, platform: plat}))
  ).filter(s => 
    !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.platform.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0,6)

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fb] text-[#0f172a] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
        *{font-family:'IBM Plex Sans Arabic', system-ui, sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        .smooth{transition: all .25s cubic-bezier(.4,0,.2,1)}
        .card-shadow{box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.03)}
        .card-shadow-lg{box-shadow: 0 4px 6px rgba(0,0,0,.04), 0 10px 25px rgba(0,0,0,.06)}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
      `}</style>

      {initialLoading && (
        <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-[3px] border-slate-200 border-t-[#0f172a] rounded-full animate-[spin_0.7s_linear_infinite]" />
          <div className="text-[13px] font-semibold text-slate-600">جاري التحميل...</div>
        </div>
      )}

      {/* TOP LOADING BAR */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[9998] bg-transparent">
        <div className={`h-full bg-[#0f172a] transition-all duration-300 ${initialLoading ? 'w-full' : 'w-0'}`} />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-black text-[20px] tracking-tight">
              <div className="w-8 h-8 bg-[#0f172a] rounded-[10px] grid place-items-center text-white text-[14px]">S</div>
              smmx<span className="font-normal text-slate-400">social</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-500">
              <a href="#services" className="hover:text-slate-900 smooth">الخدمات</a>
              <a href="#how" className="hover:text-slate-900 smooth">كيف تعمل</a>
              <a href="#faq" className="hover:text-slate-900 smooth">الأسئلة</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 h-9 text-[13px] font-semibold">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  ${balance.toFixed(3)}
                </div>
                <div className="text-[13px] text-slate-600 hidden md:block">{user.email}</div>
                <button onClick={handleLogout} className="h-9 px-4 rounded-full bg-white border border-slate-200 text-[13px] font-semibold hover:bg-slate-50 smooth">خروج</button>
              </>
            ) : (
              <>
                <button onClick={()=>{setAuthMode('login'); setShowAuth(true)}} className="h-9 px-5 rounded-full bg-white border border-slate-200 text-[13px] font-semibold hover:bg-slate-50 smooth">تسجيل الدخول</button>
                <button onClick={()=>{setAuthMode('register'); setShowAuth(true)}} className="h-9 px-5 rounded-full bg-[#0f172a] text-white text-[13px] font-semibold hover:bg-black smooth">إنشاء حساب</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 pt-14 pb-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-medium text-slate-600 card-shadow">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> منصات متعددة • طلب في خطوات بسيطة • متابعة حالة الطلب
            </div>
            <h1 className="mt-6 text-[42px] md:text-[54px] font-[700] leading-[1.05] tracking-[-0.03em]">
              اختار الخدمة المناسبة<br/>لمنصتك، حدد الرابط<br/>والكمية، وابعت الطلب<br/><span className="text-slate-400">في ثواني.</span>
            </h1>
            <p className="mt-5 text-[15px] leading-7 text-slate-500 max-w-[520px]">
              متابعين، مشاهدات، إعجابات، تفاعل، أعضاء قنوات وخدمات إضافية لمنصات السوشيال المختلفة، مع متابعة واضحة لحالة كل طلب من حسابك.
            </p>
            <div className="mt-8 flex gap-3">
              <button onClick={()=> document.getElementById('order')?.scrollIntoView({behavior:'smooth'})} className="h-11 px-6 rounded-full bg-[#0f172a] text-white text-[14px] font-semibold hover:bg-black smooth">ابدأ أول طلب</button>
              <button onClick={()=> document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="h-11 px-6 rounded-full bg-white border border-slate-200 text-[14px] font-semibold hover:bg-slate-50 smooth">استعرض الخدمات</button>
            </div>
          </div>

          {/* ORDER WIDGET - Like smmxsocial */}
          <div id="order" className="bg-white rounded-[24px] border border-slate-200 card-shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white grid place-items-center text-[13px]">◧</div>
                <div>
                  <div className="font-semibold text-[14px]">طلب جديد <span className="text-[11px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full mr-2">● جاهز</span></div>
                  <div className="text-[11px] text-slate-500">الرصيد الحالي <b className="text-slate-900">${balance.toFixed(3)}</b></div>
                </div>
              </div>
              <div className="flex bg-slate-100 rounded-full p-1">
                <button onClick={()=>setActiveTab('neworder')} className={`px-4 h-7 rounded-full text-[12px] font-semibold smooth ${activeTab==='neworder' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>طلب جديد</button>
                <button onClick={()=>setActiveTab('orders')} className={`px-4 h-7 rounded-full text-[12px] font-semibold smooth ${activeTab==='orders' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>طلباتي</button>
              </div>
            </div>

            {activeTab==='neworder' ? (
              <div className="p-6 space-y-4">
                <div className="relative">
                  <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="ابحث عن خدمة" className="w-full h-11 pr-10 pl-4 rounded-full bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-slate-900 focus:bg-white smooth" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">القسم</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PLATFORMS.slice(0,6).map(p=>(
                      <button key={p.name} onClick={()=>{setSelectedPlatform(p.name); setSelectedService(SERVICES_DATA[p.name]?.[0])}} className={`h-10 rounded-full border text-[12px] font-medium smooth ${selectedPlatform===p.name ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 hover:border-slate-300'}`}>{p.icon} {p.name}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">الخدمة</label>
                  <select value={selectedService?.id} onChange={e=>{
                    const all = SERVICES_DATA[selectedPlatform] || []
                    setSelectedService(all.find(s=>s.id==e.target.value))
                  }} className="w-full h-11 px-4 rounded-full bg-white border border-slate-200 text-[13px] outline-none focus:border-slate-900">
                    {(SERVICES_DATA[selectedPlatform]||[]).map(s=>(
                      <option key={s.id} value={s.id}>#{s.id} {s.name} - ${s.price}</option>
                    ))}
                  </select>
                  {selectedService && (
                    <div className="mt-2 bg-slate-50 rounded-[12px] p-3 text-[11px] text-slate-600 border border-slate-100">
                      {selectedService.desc} • حد أدنى {selectedService.min} • حد أقصى {selectedService.max} • <b>${selectedService.price}/1000</b>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">الرابط</label>
                  <input value={link} onChange={e=>setLink(e.target.value)} placeholder="https://..." className="w-full h-11 px-4 rounded-full bg-white border border-slate-200 text-[13px] outline-none focus:border-slate-900" dir="ltr" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">الكمية</label>
                    <input type="number" value={quantity} onChange={e=>setQuantity(parseInt(e.target.value)||0)} className="w-full h-11 px-4 rounded-full bg-white border border-slate-200 text-[13px] outline-none focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">التكلفة</label>
                    <div className="h-11 px-4 rounded-full bg-slate-900 text-white grid place-items-center text-[14px] font-bold">${charge}</div>
                  </div>
                </div>

                <button onClick={handleOrder} className="w-full h-12 rounded-full bg-[#0f172a] text-white font-semibold text-[14px] hover:bg-black smooth">إرسال الطلب</button>
                <div className="text-[11px] text-slate-400 text-center">بدء سريع • متابعة من حسابك • دعم داخل المنصة</div>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-3 max-h-[420px] overflow-auto">
                  {orders.length===0 ? <div className="text-center py-10 text-slate-400 text-[13px]">لا يوجد طلبات بعد</div> : orders.map(o=>(
                    <div key={o.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-[14px] p-3">
                      <div>
                        <div className="text-[13px] font-semibold">#{o.id} {o.service.slice(0,30)}</div>
                        <div className="text-[11px] text-slate-500 mt-1">{o.platform || ''} • {o.quantity || ''} • ${o.price}</div>
                      </div>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${o.status==='مكتمل' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : o.status==='قيد التنفيذ' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600'}`}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section id="services" className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[28px] font-bold tracking-tight">خدمات لأشهر منصات التواصل</h2>
          <p className="text-[13px] text-slate-500 hidden md:block">بدل ما تدور في أكتر من مكان، هتلاقي كل الخدمات في لوحة واحدة</p>
        </div>
        <div className="grid md:grid-cols-5 gap-3 mt-8">
          {PLATFORMS.map(p=>(
            <button key={p.name} onClick={()=>{setSelectedPlatform(p.name); setSelectedService(SERVICES_DATA[p.name]?.[0]); document.getElementById('order')?.scrollIntoView({behavior:'smooth'})}} className="text-right bg-white border border-slate-200 rounded-[16px] p-4 hover:border-slate-900 hover:shadow-lg smooth group card-shadow">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 grid place-items-center text-[18px] group-hover:bg-slate-900 group-hover:text-white smooth">{p.icon}</div>
              <div className="font-semibold text-[14px] mt-3">{p.name}</div>
              <div className="text-[11px] text-slate-500 leading-5 mt-1 line-clamp-2">{p.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="max-w-[1280px] mx-auto px-6 pb-14">
        <h3 className="text-[20px] font-bold">اختار الخدمة اللي تناسب طلبك</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[16px] overflow-hidden card-shadow">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[13px] font-semibold">أمثلة لخدمات شائعة</span>
              <span className="text-[11px] text-slate-500">خيارات متعددة</span>
            </div>
            {filteredServices.map(s=>(
              <div key={s.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 smooth">
                <div>
                  <div className="text-[13px] font-medium">#{s.id} {s.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.desc} • {s.platform}</div>
                </div>
                <div className="text-[13px] font-bold">${s.price}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              {t:'بحث أسرع', d:'وصل للخدمة من الاسم أو المنصة بدل القوائم الطويلة.'},
              {t:'خدماتك المتكررة أقرب ليك', d:'استخدم المفضلة للوصول بسرعة للخدمات اللي بتطلبها باستمرار.'},
              {t:'كل تفاصيل الطلب واضحة', d:'راجع الخدمة والسعر والكمية قبل ما تبعت الطلب.'},
            ].map(i=>(
              <div key={i.t} className="bg-white border border-slate-200 rounded-[16px] p-4 card-shadow">
                <div className="font-semibold text-[13px]">{i.t}</div>
                <div className="text-[12px] text-slate-500 mt-1 leading-5">{i.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-white border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-14">
          <h2 className="text-[28px] font-bold">ابدأ أول طلب في 3 خطوات</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {n:'01', t:'شحن الرصيد', d:'اختار طريقة الدفع المناسبة ليك وأضف الرصيد', tags:['Visa','Wallet','Crypto']},
              {n:'02', t:'اختيار الخدمة', d:'حدد المنصة، قارن بين الخدمات، واقرأ الوصف', tags:['راجع التفاصيل']},
              {n:'03', t:'إرسال ومتابعة', d:'حط الرابط والكمية، ابعت الطلب، وتابع حالته', tags:['الطلب قيد المتابعة']},
            ].map(s=>(
              <div key={s.n} className="bg-[#f8f9fb] border border-slate-200 rounded-[20px] p-6">
                <div className="text-[12px] font-mono text-slate-400">{s.n}</div>
                <div className="font-bold text-[16px] mt-2">{s.t}</div>
                <div className="flex gap-2 mt-3">{s.tags.map(tag=><span key={tag} className="text-[10px] bg-white border border-slate-200 rounded-full px-2.5 py-1">{tag}</span>)}</div>
                <div className="text-[13px] text-slate-500 mt-4 leading-6">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-[1280px] mx-auto px-6 py-14">
        <h2 className="text-[28px] font-bold">أسئلة شائعة</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {[
            {q:'إزاي أبدأ أعمل طلب؟', a:'سجل دخولك أو أنشئ حساب جديد، أضف رصيد، وبعدها افتح صفحة طلب جديد واختار القسم والخدمة وحط الرابط والكمية المطلوبة.'},
            {q:'إيه الفرق بين الخدمات لنفس المنصة؟', a:'الخدمات ممكن تختلف في السعر، السرعة، الحد الأدنى والأقصى، مصدر التنفيذ، وخيارات إعادة التعبئة أو الضمان.'},
            {q:'أتابع حالة طلبي منين؟', a:'بعد إرسال الطلب هتلاقيه في سجل الطلبات، وهناك تقدر تراجع حالته والتفاصيل المرتبطة به.'},
            {q:'نسيت كلمة المرور، أعمل إيه؟', a:'استخدم رابط استعادة كلمة المرور الموجود تحت فورم تسجيل الدخول واتبع الخطوات.'},
          ].map(f=>(
            <div key={f.q} className="bg-white border border-slate-200 rounded-[16px] p-5 card-shadow">
              <div className="font-semibold text-[14px]">{f.q}</div>
              <div className="text-[13px] text-slate-500 mt-2 leading-6">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <div className="text-[24px] font-bold">ابدأ أول طلب على smmxsocial.com</div>
            <div className="text-[13px] text-slate-400 mt-2">أنشئ حسابك، أضف الرصيد، واختار الخدمة المناسبة</div>
          </div>
          <button onClick={()=>{setAuthMode('register'); setShowAuth(true)}} className="h-11 px-7 rounded-full bg-white text-slate-900 font-semibold text-[14px] hover:bg-slate-100 smooth">إنشاء حساب</button>
        </div>
      </section>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm grid place-items-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-[20px] border border-slate-200 card-shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="font-bold text-[18px]">{authMode==='login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</div>
                <button onClick={()=>setShowAuth(false)} className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center">✕</button>
              </div>
              <div className="mt-6 space-y-3">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="w-full h-11 px-4 rounded-full bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-slate-900 focus:bg-white" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full h-11 px-4 rounded-full bg-slate-50 border border-slate-200 text-[13px] outline-none focus:border-slate-900 focus:bg-white" />
                <button onClick={handleAuth} className="w-full h-11 rounded-full bg-[#0f172a] text-white font-semibold text-[14px] hover:bg-black smooth">{authMode==='login' ? 'دخول' : 'تسجيل'}</button>
                <div className="text-center">
                  <button onClick={()=>setAuthMode(authMode==='login'?'register':'login')} className="text-[12px] text-slate-500 hover:text-slate-900">{authMode==='login' ? 'ليس لديك حساب؟ إنشاء حساب' : 'لديك حساب؟ تسجيل دخول'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 py-6 text-center text-[12px] text-slate-400">
        © 2026 smmx clone — تصميم مطابق لـ smmxsocial.com • صنع بـ Meta AI
      </footer>
    </div>
  )
}