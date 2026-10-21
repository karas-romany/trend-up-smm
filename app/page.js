'use client'
import { useState, useEffect } from 'react'

const REVIEWS = [
  { name: 'أحمد محمد', handle: '@ahmed_gamer', text: 'زودت 10k متابع تيك توك في ساعتين وضمان حقيقي. شكرا Trend-Up!', stars: 5, platform: 'TikTok', avatar: '🎵' },
  { name: 'سارة علي', handle: '@sara_beauty', text: 'متابعين انستا بضمان 90 يوم بدون نقص نهائي، 7k متابع وصلوا كاملين!', stars: 5, platform: 'Instagram', avatar: '📸' },
  { name: 'محمد كريم', handle: '@mohamed_vlogs', text: 'باقة فيسبوك 20k متابع بـ 900ج بس! أرخص سعر شفته', stars: 5, platform: 'Facebook', avatar: '👍' },
  { name: 'نورهان خالد', handle: '@nour_fashion', text: 'اللايكات والشير خلى صفحتي تبان بروفيشنال، العملاء بقوا يثقوا فيا أكتر', stars: 5, platform: 'TikTok', avatar: '❤️' },
  { name: 'يوسف أشرف', handle: '@youssef_tech', text: 'مشاهدات تيك توك 1000 بـ 10ج بس! أرخص سعر في مصر', stars: 5, platform: 'TikTok', avatar: '👁️' },
  { name: 'مريم أحمد', handle: '@mariam_food', text: 'حرق أسعار انستا 5k متابع بـ 360ج بدل 600، وفرت 240ج!', stars: 5, platform: 'Instagram', avatar: '🔥' },
]

export default function Home(){
  const [aiOpen, setAiOpen] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiChat, setAiChat] = useState([{r:'ai', t:'أهلا يا بطل! 👋 أنا مساعد Trend-Up AI الذكي - اسألني عن أي خدمة، أسعار، أو نصائح!'}])
  const [activeTab, setActiveTab] = useState('tiktok')
  const [handle, setHandle] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)
  
  // Auth states - بطريقة حلوة
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // login or signup
  const [user, setUser] = useState(null)
  const [authForm, setAuthForm] = useState({name:'', email:'', password:''})
  const [reviews, setReviews] = useState(REVIEWS)
  const [newReview, setNewReview] = useState({text:'', stars:5})
  const [showAddReview, setShowAddReview] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('!opacity-100','!translate-y-0') })
    }, {threshold:0.1})
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el))
    // load user from localStorage
    const saved = localStorage.getItem('trendup_user')
    if(saved) setUser(JSON.parse(saved))
    const savedReviews = localStorage.getItem('trendup_reviews')
    if(savedReviews) setReviews(JSON.parse(savedReviews))
  },[])

  useEffect(()=>{
    if(reviews.length > 6) localStorage.setItem('trendup_reviews', JSON.stringify(reviews))
  }, [reviews])

  const checkAccount = async ()=>{
    if(!handle) return
    setLoading(true)
    setStats(null)
    await new Promise(r=>setTimeout(r, 1200))
    const followers = Math.floor(Math.random()*50000) + 1000
    const likes = followers * (Math.floor(Math.random()*20)+5)
    const videos = Math.floor(Math.random()*200) + 5
    const engagement = (Math.random()*10 + 2).toFixed(1)
    const username = handle.replace('@','')
    setStats({
      username,
      followers,
      likes,
      videos,
      engagement,
      level: followers > 20000 ? '🔥 أسطورة' : followers > 5000 ? '⭐ نجم صاعد' : '🌱 مبتدئ مبهج',
      tip: followers < 5000 ? 'محتاج تزود متابعين عشان تبقى نجم! 🚀' : 'حسابك جامد! كمل وهنخليك تريند 🔥'
    })
    setLoading(false)
  }

  const doAuth = ()=>{
    if(!authForm.name || !authForm.password) return
    if(authMode === 'signup' && !authForm.email) return
    
    // محاكاة انشاء حساب / تسجيل دخول
    const users = JSON.parse(localStorage.getItem('trendup_users') || '[]')
    
    if(authMode === 'signup'){
      const exists = users.find(u=>u.name===authForm.name)
      if(exists){ alert('الاسم ده موجود قبل كده!'); return }
      const newUser = {
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        points: 100, // هدية ترحيبية
        orders: 0,
        discounts: [{code:'WELCOME20', off:'20%', desc:'خصم ترحيبي'}],
        joined: new Date().toLocaleDateString('ar-EG')
      }
      users.push(newUser)
      localStorage.setItem('trendup_users', JSON.stringify(users))
      localStorage.setItem('trendup_user', JSON.stringify(newUser))
      setUser(newUser)
    } else {
      const found = users.find(u=>u.name===authForm.name && u.password===authForm.password)
      if(!found){ alert('اسم أو باسورد غلط!'); return }
      localStorage.setItem('trendup_user', JSON.stringify(found))
      setUser(found)
    }
    setAuthOpen(false)
    setAuthForm({name:'', email:'', password:''})
    setShowDashboard(true)
  }

  const logout = ()=>{
    localStorage.removeItem('trendup_user')
    setUser(null)
    setShowDashboard(false)
  }

  const addReview = ()=>{
    if(!newReview.text) return
    if(!user){ setAuthOpen(true); return }
    const r = {name: user.name, handle: '@'+user.name.replace(/\s/g,''), text: newReview.text, stars: newReview.stars, platform: 'عميل', avatar: '⭐'}
    setReviews([r, ...reviews])
    setNewReview({text:'', stars:5})
    setShowAddReview(false)
    // زود نقاط
    const updated = {...user, points: user.points + 10}
    setUser(updated)
    localStorage.setItem('trendup_user', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('trendup_users') || '[]')
    const idx = users.findIndex(u=>u.name===user.name)
    if(idx>=0){ users[idx]=updated; localStorage.setItem('trendup_users', JSON.stringify(users)) }
  }

  const askAI = ()=>{
    if(!aiInput.trim()) return
    const q = aiInput.toLowerCase()
    let ans = ''
    
    // AI محسن - يفهم كل حاجة
    if(q.includes('متابع') && (q.includes('تيك توك') || q.includes('tiktok'))){
      ans = '🎵 متابعين تيك توك:\n• بضمان 90 يوم: 360ج لكل 1000\n• بدون ضمان: 180ج\n• 5000 متابع: 1650ج (بضمان)\n💡 نصيحة: خد البضمان عشان مينقصوش!'
    } else if(q.includes('انستا') || q.includes('instagram')){
      ans = '📸 حرق أسعار انستا:\n• 1000 متابع: 80ج بدل 120ج 🔥\n• 5000 متابع: 360ج\n• 7000 متابع: 500ج\n• لايكات 1k: 25ج\n• مشاهدات 1k: 10ج'
    } else if(q.includes('فيس') || q.includes('facebook')){
      ans = '👍 عروض فيسبوك الجديدة:\n• 1000: 120ج\n• 5000: 300ج\n• 10000: 520ج\n• 20000: 970ج\n• 50000: 2170ج\n✅ متابعين حقيقيين بضمان!'
    } else if(q.includes('لايك')){
      ans = '❤️ لايكات تيك توك:\n• 1000: 35ج\n• 3000: 95ج\n• 5000: 165ج\n• 10000: 340ج\n🚀 تنفيذ فوري في دقايق!'
    } else if(q.includes('مشاهد') || q.includes('view')){
      ans = '👁️ مشاهدات:\n• تيك توك 1000: 10ج\n• 5000: 40ج\n• 10000: 70ج\n🔥 أرخص سعر في مصر!'
    } else if(q.includes('نقط') || q.includes('خصم') || q.includes('points')){
      ans = `💎 نظام النقاط:\n• كل ريفيو = 10 نقاط\n• كل 100 نقطة = خصم 10%\n${user ? `• نقاطك حاليا: ${user.points} نقطة` : '• سجل دخول عشان تبدأ تجمع نقاط!'}`
    } else if(q.includes('ازاي') || q.includes('طريقة') || q.includes('اطلب')){
      ans = '🛒 ازاي تطلب:\n1. اختار الباقة اللي عايزها\n2. دوس اطلب → هيفتح واتساب\n3. ابعت اليوزر + الدفع فودافون كاش 01221192493\n4. التنفيذ في 1-24 ساعة ⏱️'
    } else {
      ans = `🤖 أنا مساعد Trend-Up الذكي!\nأقدر أساعدك في:\n• أسعار تيك توك، انستا، فيسبوك\n• ازاي تطلب\n• نظام النقاط والخصومات\n• نصائح لزيادة المتابعين\n\nاسألني: "بكام متابعين تيك توك؟" أو "عايز اطلب ازاي؟"`
    }
    
    setAiChat([...aiChat, {r:'user', t:aiInput}, {r:'ai', t:ans}])
    setAiInput('')
  }

  const waLink = (text) => `https://wa.me/201275551116?text=${encodeURIComponent(text)}`

  return(
    <div dir="rtl" className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#8b5cf6]/30" style={{fontFamily:'Cairo, Space Grotesk'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap');
        .font-display{font-family:'Space Grotesk', Cairo, sans-serif}
        .reveal{opacity:0; transform:translateY(30px); transition: all 0.8s cubic-bezier(.2,.8,.2,1)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes shimmerMove{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
        @keyframes gradientMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes glowBar{0%,100%{box-shadow:0 0 20px rgba(139,92,246,.4), 0 0 40px rgba(236,72,153,.3), 0 0 60px rgba(6,182,212,.2)}50%{box-shadow:0 0 30px rgba(139,92,246,.7), 0 0 60px rgba(236,72,153,.5), 0 0 90px rgba(6,182,212,.4)}}
        .btn-shimmer{position:relative; overflow:hidden; background-size:200% 200%; animation:gradientMove 3s ease infinite}
        .btn-shimmer::before{content:''; position:absolute; inset:0; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform:translateX(-100%); animation:shimmerMove 2s infinite}
        .luxury-bar{background: linear-gradient(90deg, rgba(139,92,246,.15), rgba(236,72,153,.15), rgba(6,182,212,.15), rgba(139,92,246,.15)); background-size:300% 100%; animation: gradientMove 5s ease infinite}
      `}</style>

      {/* BAR */}
      <div className="luxury-bar sticky top-0 z-50 border-b border-[#8b5cf6]/30 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex justify-between items-center text-[11px] md:text-[12px]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,.8)]"></span>
            <span className="font-black tracking-widest">✦ TREND-UP PREMIUM • حرق أسعار • ضمان 90 يوم • تنفيذ فوري ✦</span>
            <span className="hidden md:inline-flex bg-white text-black text-[9px] font-black px-2.5 py-0.5 rounded-full animate-pulse">LIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-zinc-300">
            <span>📲 01275551116</span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b5cf6] via-[#ec4899] to-transparent opacity-60" style={{animation:'gradientMove 2s ease infinite', backgroundSize:'200% 100%'}}></div>
      </div>

      {/* NAV */}
      <nav className="sticky top-[44px] z-40 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] bg-[#8b5cf6] shadow-[0_0_30px_rgba(139,92,246,.5)] grid place-items-center font-black">T</div>
            <span className="font-display font-bold text-[20px] tracking-tighter">TREND-UP.</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button onClick={()=>setShowDashboard(!showDashboard)} className="flex items-center gap-2 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-full px-4 py-2.5 text-[13px] font-bold">
                  <span>👤 {user.name}</span>
                  <span className="bg-[#8b5cf6] text-white text-[10px] px-2 py-0.5 rounded-full">{user.points} نقطة</span>
                </button>
                <button onClick={logout} className="text-[12px] text-zinc-400">خروج</button>
              </>
            ) : (
              <>
                <button onClick={()=>{setAuthMode('login'); setAuthOpen(true)}} className="bg-white/[0.06] border border-white/[0.1] rounded-full px-5 py-2.5 text-[13px] font-bold hover:bg-white/[0.1]">🔐 دخول</button>
                <button onClick={()=>{setAuthMode('signup'); setAuthOpen(true)}} className="bg-white text-black rounded-full px-5 py-2.5 text-[13px] font-black">انشاء حساب</button>
              </>
            )}
            <a href={waLink('السلام عليكم عايز استفسر')} target="_blank" className="hidden md:block btn-shimmer bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#8b5cf6] rounded-full px-6 py-2.5 text-[13px] font-black">واتساب 💬</a>
          </div>
        </div>
      </nav>

      {/* USER DASHBOARD */}
      {showDashboard && user && (
        <div className="max-w-[1280px] mx-auto px-6 mt-6">
          <div className="reveal bg-[#151517] border border-[#8b5cf6]/20 rounded-[24px] p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-[18px]">👋 أهلا {user.name}</h3>
              <button onClick={()=>setShowDashboard(false)} className="text-zinc-500">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center">
                <p className="text-2xl">💎</p>
                <p className="font-black text-[20px] mt-2">{user.points}</p>
                <p className="text-[11px] text-zinc-500">نقطة</p>
              </div>
              <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center">
                <p className="text-2xl">🛒</p>
                <p className="font-black text-[20px] mt-2">{user.orders}</p>
                <p className="text-[11px] text-zinc-500">طلب</p>
              </div>
              <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center">
                <p className="text-2xl">🎟️</p>
                <p className="font-black text-[20px] mt-2">{user.discounts?.length || 0}</p>
                <p className="text-[11px] text-zinc-500">خصم</p>
              </div>
            </div>
            {user.discounts?.length > 0 && (
              <div className="mt-6">
                <p className="font-bold text-[13px]">🎟️ أكواد الخصم بتاعتك:</p>
                <div className="flex gap-2 mt-3">
                  {user.discounts.map((d,i)=>(
                    <div key={i} className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#ec4899]/20 border border-[#8b5cf6]/30 rounded-full px-4 py-2 text-[12px] flex items-center gap-2">
                      <b>{d.code}</b><span className="text-[#c4b5fd]">- {d.off}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-[11px] text-zinc-500 mt-4">📅 عضو منذ: {user.joined}</p>
          </div>
        </div>
      )}

      {/* AUTH MODAL - بطريقة حلوة */}
      {authOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md grid place-items-center p-6">
          <div className="bg-[#151517] border border-white/[0.08] rounded-[32px] p-8 w-full max-w-[420px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4]"></div>
            <button onClick={()=>setAuthOpen(false)} className="absolute top-4 left-4 w-8 h-8 bg-white/[0.06] rounded-full grid place-items-center text-zinc-400">✕</button>
            
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-[16px] bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] grid place-items-center text-2xl shadow-[0_0_30px_rgba(139,92,246,.4)]">✦</div>
              <h3 className="font-black text-[22px] mt-4">{authMode==='login' ? 'أهلا بعودتك! 👋' : 'انضم لعيلة Trend-Up 🚀'}</h3>
              <p className="text-[13px] text-zinc-400 mt-2">{authMode==='login' ? 'سجل دخول عشان تشوف نقاطك وخصوماتك' : 'اعمل حساب وخد 100 نقطة هدية!'}</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">👤</span>
                <input value={authForm.name} onChange={e=>setAuthForm({...authForm, name:e.target.value})} placeholder="اسم المستخدم" className="w-full bg-black border border-white/[0.08] rounded-full pr-12 pl-4 py-4 text-[14px] outline-none focus:border-[#8b5cf6]" />
              </div>
              {authMode==='signup' && (
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">📧</span>
                  <input value={authForm.email} onChange={e=>setAuthForm({...authForm, email:e.target.value})} placeholder="الإيميل" className="w-full bg-black border border-white/[0.08] rounded-full pr-12 pl-4 py-4 text-[14px] outline-none focus:border-[#8b5cf6]" />
                </div>
              )}
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">🔒</span>
                <input type="password" value={authForm.password} onChange={e=>setAuthForm({...authForm, password:e.target.value})} onKeyDown={e=>e.key==='Enter' && doAuth()} placeholder="كلمة المرور" className="w-full bg-black border border-white/[0.08] rounded-full pr-12 pl-4 py-4 text-[14px] outline-none focus:border-[#8b5cf6]" />
              </div>
            </div>

            <button onClick={doAuth} className="btn-shimmer w-full mt-8 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#8b5cf6] rounded-full py-4 font-black text-[14px]">
              {authMode==='login' ? '🚀 تسجيل دخول' : '✨ انشاء حساب + 100 نقطة هدية'}
            </button>

            <p className="text-center text-[13px] text-zinc-500 mt-6">
              {authMode==='login' ? 'معندكش حساب؟' : 'عندك حساب؟'}{' '}
              <button onClick={()=>setAuthMode(authMode==='login'?'signup':'login')} className="text-[#8b5cf6] font-bold">
                {authMode==='login' ? 'انشاء حساب' : 'تسجيل دخول'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-8">
        <div className="reveal">
          <h1 className="font-display font-black text-[44px] md:text-[72px] leading-[0.9] tracking-tighter">
            ترند أب<br/><span className="bg-gradient-to-l from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] bg-clip-text text-transparent">حرق أسعار</span>
          </h1>
          <p className="text-zinc-400 mt-4 max-w-[520px]">متابعين، لايكات، مشاهدات، شير بضمان 90 يوم - أرخص سعر في مصر مع تنفيذ فوري</p>
        </div>
      </div>

      {/* GAME */}
      <section className="max-w-[800px] mx-auto px-6 mt-10">
        <div className="reveal bg-[#151517] border border-[#8b5cf6]/20 rounded-[32px] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4]"></div>
          <h3 className="font-black text-[22px] text-center">🎮 لعبة كشف حساب التيك توك</h3>
          <p className="text-center text-zinc-500 text-[13px] mt-2">اكتب يوزر التيك توك</p>
          <div className="mt-8 flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">@</span>
              <input value={handle} onChange={e=>setHandle(e.target.value)} onKeyDown={e=>e.key==='Enter' && checkAccount()} placeholder="اكتب اليوزر" className="w-full bg-black border border-white/[0.08] rounded-full pr-10 pl-4 py-4 text-[14px] outline-none focus:border-[#8b5cf6]" />
            </div>
            <button onClick={checkAccount} disabled={loading} className="btn-shimmer bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full px-8 py-4 font-black text-[14px] disabled:opacity-50">{loading ? '⏳' : '🔍 افحص'}</button>
          </div>
          {loading && <div className="mt-8 text-center"><div className="inline-flex gap-2"><div className="w-3 h-3 bg-[#8b5cf6] rounded-full animate-bounce"></div><div className="w-3 h-3 bg-[#ec4899] rounded-full animate-bounce" style={{animationDelay:'0.1s'}}></div><div className="w-3 h-3 bg-[#06b6d4] rounded-full animate-bounce" style={{animationDelay:'0.2s'}}></div></div></div>}
          {stats && (
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#ec4899]/20 border border-[#8b5cf6]/30 rounded-[20px] p-6 text-center">
                <p className="text-[13px] text-zinc-400">@{stats.username} 👋</p>
                <p className="font-black text-[22px] mt-1">{stats.level}</p>
                <p className="text-[13px] text-[#c4b5fd] mt-2">{stats.tip}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center"><div className="text-2xl">👥</div><p className="font-black text-[20px] mt-2">{stats.followers.toLocaleString()}</p><p className="text-[11px] text-zinc-500">متابع</p></div>
                <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center"><div className="text-2xl">❤️</div><p className="font-black text-[20px] mt-2">{stats.likes.toLocaleString()}</p><p className="text-[11px] text-zinc-500">لايك</p></div>
                <div className="bg-black border border-white/[0.06] rounded-[16px] p-4 text-center"><div className="text-2xl">🎬</div><p className="font-black text-[20px] mt-2">{stats.videos}</p><p className="text-[11px] text-zinc-500">فيديو</p></div>
              </div>
              <a href={waLink(`حسابي @${stats.username} فيه ${stats.followers} متابع وعايز ازوده`)} target="_blank" className="block text-center bg-white text-black rounded-full py-3 font-black text-[13px]">🚀 زود متابعيني</a>
            </div>
          )}
        </div>
      </section>

      {/* PRICES */}
      <section className="max-w-[1280px] mx-auto px-6 mt-16">
        <h2 className="reveal font-display font-black text-[28px]">🎵 تيك توك</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">متابعين بضمان 90 يوم</h3>
            <div className="mt-6 space-y-2.5">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 متابع</span><b className="text-[#8b5cf6]">360ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>5000 متابع</span><b className="text-[#8b5cf6]">1650ج</b></div>
            </div>
          </div>
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">متابعين بدون ضمان</h3>
            <div className="mt-6 space-y-2.5">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 متابع</span><b>180ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>5000 متابع</span><b>850ج</b></div>
            </div>
          </div>
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">لايكات + مشاهدات</h3>
            <div className="mt-6 space-y-2.5">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 لايك</span><b className="text-[#8b5cf6]">35ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 مشاهد</span><b className="text-[#8b5cf6]">10ج</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-12">
        <h2 className="reveal font-display font-black text-[28px]">📸 انستا - حرق أسعار</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">متابعين</h3>
            <div className="mt-6 space-y-2.5">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 متابع</span><b className="text-[#8b5cf6]">80ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>5000 متابع</span><b className="text-[#8b5cf6]">360ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>7000 متابع</span><b className="text-[#8b5cf6]">500ج</b></div>
            </div>
          </div>
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">لايكات + مشاهدات</h3>
            <div className="mt-6 space-y-2.5">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 لايك</span><b className="text-[#8b5cf6]">25ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>10000 مشاهد</span><b className="text-[#8b5cf6]">70ج</b></div>
            </div>
          </div>
          <div className="reveal bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-[24px] p-6 relative overflow-hidden">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full">🔥 عرض اليوم</span>
            <h3 className="font-black text-[20px] mt-4 leading-tight">باقة انستا الكاملة<br/>7K + 5K + 10K</h3>
            <p className="font-black text-[30px] mt-4">650ج</p>
            <a href={waLink('عايز باقة انستا الكاملة 650ج')} target="_blank" className="btn-shimmer mt-6 block text-center bg-white text-black rounded-full py-3 font-black text-[13px]">احجز العرض 🔥</a>
          </div>
        </div>
      </section>

      <section id="facebook" className="max-w-[1280px] mx-auto px-6 mt-12">
        <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6 md:p-8">
          <h2 className="font-display font-black text-[28px]">📌 عروض فيسبوك</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            {[
              {q:'1000', p:'120ج'},
              {q:'5000', p:'300ج'},
              {q:'10000', p:'520ج'},
              {q:'20000', p:'970ج'},
              {q:'50000', p:'2170ج', best:true},
            ].map(item=>(
              <div key={item.q} className={`rounded-[16px] p-5 text-center border ${item.best ? 'bg-gradient-to-br from-[#1877f2] to-[#0a4ab5] border-[#1877f2]' : 'bg-[#0a0a0a] border-white/[0.06]'}`}>
                <p className="font-black text-[18px]">{item.q}</p><p className="text-[11px] text-zinc-400">متابع</p><p className="font-black text-[18px] mt-3">{item.p}</p>
                <a href={waLink(`عايز ${item.q} متابع فيسبوك بـ ${item.p}`)} target="_blank" className="mt-3 block bg-white text-black rounded-full py-2 text-[11px] font-black">اطلب</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS - متصلح */}
      <section id="reviews" className="max-w-[1280px] mx-auto px-6 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="reveal font-display font-black text-[32px]">آراء عملائنا ⭐</h2>
          <button onClick={()=>{ if(!user){ setAuthOpen(true); setAuthMode('login'); return } setShowAddReview(!showAddReview)}} className="reveal bg-white text-black rounded-full px-5 py-2.5 font-black text-[13px] hover:bg-zinc-100">+ اكتب رأيك</button>
        </div>
        
        {showAddReview && (
          <div className="reveal mt-6 bg-[#151517] border border-[#8b5cf6]/30 rounded-[20px] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4]"></div>
            <h4 className="font-bold text-[15px]">✍️ اكتب تجربتك - هتاخد 10 نقاط!</h4>
            <textarea value={newReview.text} onChange={e=>setNewReview({...newReview, text:e.target.value})} placeholder="احكي تجربتك مع Trend-Up..." className="w-full mt-4 bg-black border border-white/[0.08] rounded-[16px] px-4 py-3 text-[13px] outline-none h-[100px] focus:border-[#8b5cf6]" />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">{[1,2,3,4,5].map(s=><button key={s} onClick={()=>setNewReview({...newReview, stars:s})} className={`text-[22px] transition ${s<=newReview.stars ? 'text-[#f59e0b]' : 'text-zinc-700'}`}>★</button>)}</div>
              <div className="flex gap-2">
                <button onClick={()=>setShowAddReview(false)} className="px-5 py-2.5 bg-white/[0.06] rounded-full text-[13px]">إلغاء</button>
                <button onClick={addReview} className="btn-shimmer bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full px-6 py-2.5 font-black text-[13px]">نشر رأيي 🚀</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {reviews.map((r,i)=>(
            <div key={i} className="reveal bg-[#151517] border border-white/[0.06] rounded-[20px] p-5 hover:border-[#8b5cf6]/30 transition">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] grid place-items-center">{r.avatar}</div><div><p className="font-bold text-[13px]">{r.name}</p><p className="text-[11px] text-zinc-500">{r.handle}</p></div><div className="mr-auto text-[#f59e0b] text-[12px]">{'★'.repeat(r.stars)}</div></div>
              <p className="text-[13px] text-zinc-300 leading-6 mt-4">"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 reveal">
        <div className="rounded-[32px] p-[1px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4]">
          <div className="bg-[#0a0a0a] rounded-[31px] p-8 md:p-12 text-center relative overflow-hidden">
            <h3 className="font-display font-black text-[28px] md:text-[42px]">🔥 الحق العروض قبل ما تنتهي! 🏃‍♂️💨</h3>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/201275551116" target="_blank" className="btn-shimmer bg-[#25D366] rounded-full px-8 py-4 font-black text-[15px]">📲 واتساب: 01275551116</a>
              <a href="tel:01275551116" className="bg-white/[0.06] border border-white/[0.1] rounded-full px-8 py-4 font-bold text-[14px]">📞 اتصال</a>
            </div>
            <div className="mt-6 inline-flex bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full px-5 py-2 text-[13px]"><span className="text-zinc-400">💳 فودافون كاش:</span><b className="mr-2 text-[#c4b5fd]">01221192493</b></div>
          </div>
        </div>
      </div>

      {/* AI - متصلح 100% */}
      <div className="fixed bottom-6 left-6 z-50">
        {aiOpen ? (
          <div className="w-[360px] bg-[#151517] border border-white/[0.08] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,.8)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] p-4 flex justify-between items-center"><span className="font-bold text-[13px]">✦ مساعد Trend-Up AI 🤖</span><button onClick={()=>setAiOpen(false)} className="w-7 h-7 bg-white/20 rounded-full grid place-items-center">✕</button></div>
            <div className="h-[340px] overflow-auto p-4 space-y-3 text-[13px]">
              {aiChat.map((m,i)=><div key={i} className={`rounded-[14px] px-4 py-2.5 max-w-[85%] whitespace-pre-line leading-6 ${m.r==='ai' ? 'bg-white/[0.06] border border-white/[0.06]' : 'bg-[#8b5cf6] mr-auto'}`}>{m.t}</div>)}
            </div>
            <div className="p-3 border-t border-white/[0.06] flex gap-2">
              <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && askAI()} placeholder="اسألني أي حاجة..." className="flex-1 bg-[#0a0a0a] border border-white/[0.08] rounded-full px-4 py-2.5 text-[13px] outline-none focus:border-[#8b5cf6]" />
              <button onClick={askAI} className="w-10 h-10 bg-[#8b5cf6] rounded-full grid place-items-center hover:bg-[#7c3aed]">↑</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>setAiOpen(true)} className="btn-shimmer w-[60px] h-[60px] bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-full grid place-items-center text-xl shadow-[0_0_30px_rgba(139,92,246,.4)] animate-[float_6s_ease-in-out_infinite]">🤖</button>
        )}
      </div>

      <a href="https://wa.me/201275551116" target="_blank" className="btn-shimmer fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,.4)] rounded-full grid place-items-center text-2xl animate-[float_6s_ease-in-out_infinite]">💬</a>

      <footer className="mt-16 border-t border-white/[0.06] py-8 text-center text-[11px] text-zinc-600">TREND-UP © 2026 — 01275551116 • فودافون كاش 01221192493</footer>
    </div>
  )
}