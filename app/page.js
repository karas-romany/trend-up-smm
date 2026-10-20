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
  const [aiChat, setAiChat] = useState([{r:'ai', t:'أهلا يا بطل! 👋 أنا مساعد Trend-Up AI بأسعارك الحقيقية. اسألني عن أي خدمة!'}])
  const [activeTab, setActiveTab] = useState('tiktok')
  const [handle, setHandle] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('!opacity-100','!translate-y-0') })
    }, {threshold:0.1})
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el))
  },[])

  const askAI = ()=>{
    if(!aiInput) return
    const q = aiInput.toLowerCase()
    let ans = 'اسألني: أسعار تيك توك؟ انستا؟ فيسبوك؟'
    if(q.includes('تيك توك') && q.includes('متابع')) ans = 'متابعين تيك توك: بضمان 90 يوم 360ج لكل 1000 ⚡ بدون ضمان 180ج 👍'
    else if(q.includes('انستا')) ans = 'حرق أسعار انستا: 1k متابع=80ج بدل 120، 5k=360ج، 7k=500ج، لايكات 1k=25ج!'
    else if(q.includes('فيس')) ans = 'فيسبوك: 1k=50ج، 5k=230ج، 10k=450ج، 20k=900ج، 50k=2100ج'
    else if(q.includes('لايك')) ans = 'تيك توك لايكات: 1k=35ج، 3k=95ج، 5k=165ج، 10k=340ج ❤️'
    setAiChat([...aiChat, {r:'user', t:aiInput}, {r:'ai', t:ans}]); setAiInput('')
  }

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
        @keyframes borderGlow{0%{border-color:rgba(139,92,246,.3)}25%{border-color:rgba(236,72,153,.4)}50%{border-color:rgba(6,182,212,.4)}75%{border-color:rgba(139,92,246,.4)}100%{border-color:rgba(139,92,246,.3)}}
        @keyframes textGlow{0%,100%{text-shadow:0 0 10px rgba(139,92,246,.5)}50%{text-shadow:0 0 20px rgba(236,72,153,.8), 0 0 30px rgba(139,92,246,.6)}}
        .btn-shimmer{position:relative; overflow:hidden; background-size:200% 200%; animation:gradientMove 3s ease infinite}
        .btn-shimmer::before{content:''; position:absolute; inset:0; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform:translateX(-100%); animation:shimmerMove 2s infinite}
        .luxury-bar{animation: glowBar 3s ease-in-out infinite, borderGlow 4s ease-in-out infinite; background: linear-gradient(90deg, rgba(139,92,246,.15), rgba(236,72,153,.15), rgba(6,182,212,.15), rgba(139,92,246,.15)); background-size:300% 100%; animation: glowBar 3s ease-in-out infinite, gradientMove 5s ease infinite}
        .luxury-text{animation: textGlow 2s ease-in-out infinite}
      `}</style>

      {/* 🔥 BAR FAKHER BETWEENWAR - البار الفاخر اللي بينور */}
      <div className="luxury-bar sticky top-0 z-50 border-b border-[#8b5cf6]/30 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex justify-between items-center text-[11px] md:text-[12px]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,.8)]"></span>
            <span className="luxury-text font-black tracking-widest">✦ TREND-UP PREMIUM • حرق أسعار • ضمان 90 يوم • تنفيذ فوري ✦</span>
            <span className="hidden md:inline-flex bg-white text-black text-[9px] font-black px-2.5 py-0.5 rounded-full animate-pulse">LIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-zinc-300">
            <span>📲 01275551116</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span>💳 01221192493</span>
            <span className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-ping"></span>
          </div>
        </div>
        {/* خط نور متحرك */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b5cf6] via-[#ec4899] to-transparent opacity-60" style={{animation:'gradientMove 2s ease infinite', backgroundSize:'200% 100%'}}></div>
      </div>

      {/* NAV */}
      <nav className="sticky top-[44px] z-40 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] bg-[#8b5cf6] shadow-[0_0_30px_rgba(139,92,246,.5)] grid place-items-center font-black">T</div>
            <span className="font-display font-bold text-[20px] tracking-tighter">TREND-UP.</span>
          </div>
          <a href={waLink('السلام عليكم عايز استفسر عن خدمات Trend-Up')} target="_blank" className="btn-shimmer bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#8b5cf6] rounded-full px-6 py-2.5 text-[13px] font-black">تواصل واتساب 💬</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-8">
        <div className="reveal text-center max-w-[900px] mx-auto">
          <h1 className="font-display font-black text-[44px] md:text-[80px] leading-[0.85] tracking-[-0.04em]">حرق أسعار<br/><span className="bg-gradient-to-l from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] bg-clip-text text-transparent">السوشيال ميديا</span></h1>
          <p className="text-zinc-400 text-[16px] mt-6">عروض تيك توك وانستا وفيسبوك بأرخص أسعار في مصر - بدون تسجيل دخول</p>
        </div>
      </div>

      {/* BAR FAKHER TANI - بار فاصل فاخر بين الأقسام */}
      <div className="max-w-[1280px] mx-auto px-6 my-10">
        <div className="luxury-bar rounded-full h-[2px] w-full"></div>
        <div className="flex justify-center -mt-[9px]">
          <div className="bg-[#0a0a0a] border border-[#8b5cf6]/30 rounded-full px-6 py-1.5 text-[10px] font-black tracking-widest text-[#c4b5fd] shadow-[0_0_20px_rgba(139,92,246,.4)]">✦ PREMIUM OFFERS ✦</div>
        </div>
      </div>

      {/* TIKTOK OFFERS - بعد ما شيلنا بفتح لايف */}
      <section id="tiktok" className="max-w-[1280px] mx-auto px-6">
        <div className="reveal">
          <h2 className="font-display font-black text-[32px] md:text-[44px]">🎵 عروض تيك توك</h2>
          <p className="text-zinc-500 text-[13px] mt-2">TikTok Offers - أرخص أسعار في مصر</p>
        </div>

        {/* 1 - متابعين بدون لايف فقط - شيلنا بفتح لايف */}
        <div className="reveal mt-8 bg-[#151517] border border-white/[0.06] rounded-[24px] p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent opacity-60"></div>
          <h3 className="font-black text-[18px] flex items-center gap-2">👥 متابعين تيك توك</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 border border-[#8b5cf6]/30 rounded-[20px] p-6 relative overflow-hidden luxury-bar">
              <div className="absolute top-4 left-4 bg-[#8b5cf6] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_20px_rgba(139,92,246,.6)]">بضمان 90 يوم ⚡</div>
              <h4 className="font-bold mt-8">بدون نقص نهائي - مضمون</h4>
              <p className="font-black text-[32px] mt-3 luxury-text">360ج <span className="text-[14px] font-normal text-zinc-400">/ 1000 متابع</span></p>
              <p className="text-[11px] text-zinc-400 mt-2">✓ ضمان 90 يوم بدون نقص نهائي ✓ تنفيذ خلال 24 ساعة</p>
              <a href={waLink('عايز متابعين تيك توك بضمان 90 يوم - 1000 متابع 360ج')} target="_blank" className="btn-shimmer mt-5 block text-center bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full py-3.5 font-black text-[13px] shadow-[0_0_30px_rgba(139,92,246,.4)]">اطلب واتساب 🚀</a>
            </div>
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-[20px] p-6 hover:border-white/[0.12] transition">
              <div className="inline-flex bg-white/[0.06] text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-full">الساحر الموفر 👍</div>
              <h4 className="font-bold mt-4">بدون ضمان - موفر</h4>
              <p className="font-black text-[32px] mt-3">180ج <span className="text-[14px] font-normal text-zinc-400">/ 1000 متابع</span></p>
              <p className="text-[11px] text-zinc-500 mt-2">أرخص سعر في السوق</p>
              <a href={waLink('عايز متابعين تيك توك بدون ضمان - 1000 متابع 180ج')} target="_blank" className="btn-shimmer mt-5 block text-center bg-white text-black rounded-full py-3.5 font-black text-[13px]">اطلب واتساب 👍</a>
            </div>
          </div>
        </div>

        {/* تفاعلات */}
        <div className="reveal mt-6 bg-[#151517] border border-white/[0.06] rounded-[24px] p-6 md:p-8">
          <h3 className="font-black text-[18px]">❤ تفاعلات تيك توك</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="text-[13px] font-bold text-[#ec4899] mb-3">لايكات ❤️</h4>
              <div className="space-y-2">
                {[
                  ['1000 لايك','35ج'],
                  ['3000 لايك','95ج'],
                  ['5000 لايك','165ج'],
                  ['10000 لايك','340ج'],
                  ['20000 لايك','670ج'],
                  ['50000 لايك','1680ج'],
                ].map(([n,p])=><div key={n} className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px] hover:border-[#8b5cf6]/30 transition"><span className="text-zinc-300">{n}</span><span className="font-bold text-[#8b5cf6]">{p}</span></div>)}
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#06b6d4] mb-3">مشاركات ومفضلة 📌</h4>
              <div className="space-y-2">
                {[
                  ['1000 مشاركة','20ج'],
                  ['2000 مشاركة','35ج'],
                  ['1000 مفضلة','15ج'],
                  ['2000 مفضلة','30ج'],
                  ['3000 مفضلة','40ج'],
                  ['1000 مشاهدة','10ج 🌹'],
                ].map(([n,p])=><div key={n} className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px] hover:border-[#8b5cf6]/30 transition"><span className="text-zinc-300">{n}</span><span className="font-bold text-[#8b5cf6]">{p}</span></div>)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#8b5cf6]/10 to-[#ec4899]/10 border border-[#8b5cf6]/20 rounded-[16px] p-5 luxury-bar">
              <p className="font-bold text-[14px]">💡 نصيحة ذهبية</p><p className="text-[12px] text-zinc-400 mt-2 leading-6">المشاهدات بـ 10ج بس! زود مشاهداتك أولا عشان الفيديو يضرب اكسبلور.</p>
              <a href={waLink('عايز تفاعلات تيك توك')} target="_blank" className="btn-shimmer mt-4 block text-center bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full py-3 font-black text-[12px]">اطلب كل التفاعلات 🚀</a>
            </div>
          </div>
        </div>
      </section>

      {/* BAR FAKHER */}
      <div className="max-w-[1280px] mx-auto px-6 my-12">
        <div className="luxury-bar rounded-full h-[1px] w-full"></div>
      </div>

      {/* INSTAGRAM */}
      <section id="insta" className="max-w-[1280px] mx-auto px-6">
        <div className="reveal">
          <h2 className="font-display font-black text-[32px] md:text-[44px]">📸 حرق أسعار إنستجرام</h2>
          <p className="text-[#ec4899] font-bold text-[14px] mt-2">خصومات تصل لـ 50% 🔥</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold flex items-center gap-2">✨ المتابعين <span className="text-[10px] bg-[#8b5cf6] px-2 py-1 rounded-full">خصم 40%</span></h3>
            <div className="mt-5 space-y-3">
              {[
                {q:'1000 متابع', p:'80ج', old:'120ج'},
                {q:'5000 متابع', p:'360ج', old:'600ج'},
                {q:'7000 متابع', p:'500ج', old:'840ج'},
              ].map(item=>(
                <div key={item.q} className="bg-[#0a0a0a] border border-white/[0.06] rounded-[14px] p-4 flex justify-between items-center hover:border-[#8b5cf6]/30 transition">
                  <span className="text-[13px] font-bold">{item.q}</span>
                  <div className="text-left"><p className="font-black text-[16px] text-[#8b5cf6]">{item.p}</p><p className="text-[11px] line-through text-zinc-500">{item.old}</p></div>
                </div>
              ))}
            </div>
            <a href={waLink('عايز متابعين انستا')} target="_blank" className="btn-shimmer mt-5 block text-center bg-white text-black rounded-full py-3 font-black text-[13px]">اطلب انستا 📸</a>
          </div>
          <div className="reveal bg-[#151517] border border-white/[0.06] rounded-[24px] p-6">
            <h3 className="font-bold">❤ اللايكات + 👁 المشاهدات</h3>
            <div className="mt-5 space-y-2">
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>1000 لايك</span><b className="text-[#ec4899]">25ج بدل 45ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>5000 لايك</span><b className="text-[#ec4899]">80ج بدل 195ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>5000 مشاهد</span><b className="text-[#8b5cf6]">40ج</b></div>
              <div className="flex justify-between bg-[#0a0a0a] border border-white/[0.04] rounded-[12px] px-4 py-2.5 text-[12px]"><span>10000 مشاهد</span><b className="text-[#8b5cf6]">70ج</b></div>
            </div>
          </div>
          <div className="reveal bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-[24px] p-6 glow relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full animate-pulse">🔥 عرض اليوم</span>
              <h3 className="font-black text-[20px] mt-4 leading-tight">باقة انستا الكاملة<br/>7K + 5K + 10K</h3>
              <p className="font-black text-[30px] mt-4">650ج <span className="text-[13px] font-normal line-through opacity-70">1080ج</span></p>
              <a href={waLink('عايز باقة انستا الكاملة 650ج')} target="_blank" className="btn-shimmer mt-6 block text-center bg-white text-black rounded-full py-3 font-black text-[13px]">احجز العرض 🔥</a>
            </div>
          </div>
        </div>
      </section>

      {/* FACEBOOK */}
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
              <div key={item.q} className={`rounded-[16px] p-5 text-center border ${item.best ? 'bg-gradient-to-br from-[#1877f2] to-[#0a4ab5] border-[#1877f2] glow' : 'bg-[#0a0a0a] border-white/[0.06] hover:border-white/[0.12] transition'}`}>
                <p className="font-black text-[18px]">{item.q}</p><p className="text-[11px] text-zinc-400">متابع</p><p className="font-black text-[18px] mt-3">{item.p}</p>
                <a href={waLink(`عايز ${item.q} متابع فيسبوك بـ ${item.p}`)} target="_blank" className="btn-shimmer mt-3 block bg-white text-black rounded-full py-2 text-[11px] font-black">اطلب</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-[1280px] mx-auto px-6 mt-16">
        <h2 className="reveal font-display font-black text-[32px]">آراء عملائنا ⭐</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {REVIEWS.map((r,i)=>(
            <div key={i} className="reveal bg-[#151517] border border-white/[0.06] rounded-[20px] p-5 hover:border-[#8b5cf6]/30 transition">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] grid place-items-center">{r.avatar}</div><div><p className="font-bold text-[13px]">{r.name}</p><p className="text-[11px] text-zinc-500">{r.handle}</p></div><div className="mr-auto text-[#f59e0b] text-[12px]">{'★'.repeat(r.stars)}</div></div>
              <p className="text-[13px] text-zinc-300 leading-6 mt-4">"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA WITH LUXURY BAR */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 reveal">
        <div className="rounded-[32px] p-[1px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#06b6d4] glow">
          <div className="bg-[#0a0a0a] rounded-[31px] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 via-transparent to-[#ec4899]/10"></div>
            <div className="luxury-bar absolute top-0 left-0 w-full h-[1px]"></div>
            <h3 className="font-display font-black text-[28px] md:text-[42px] relative luxury-text">🔥 الحق العروض قبل ما تنتهي! 🏃‍♂️💨</h3>
            <div className="mt-8 flex flex-wrap justify-center gap-4 relative">
              <a href="https://wa.me/201275551116" target="_blank" className="btn-shimmer bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,.5)] rounded-full px-8 py-4 font-black text-[15px]">📲 واتساب: 01275551116</a>
              <a href="tel:01275551116" className="bg-white/[0.06] border border-white/[0.1] rounded-full px-8 py-4 font-bold text-[14px] hover:bg-white/[0.1] transition">📞 اتصال</a>
            </div>
            <div className="mt-6 inline-flex bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full px-5 py-2 text-[13px] luxury-bar"><span className="text-zinc-400">💳 فودافون كاش:</span><b className="mr-2 text-[#c4b5fd]">01221192493</b></div>
          </div>
        </div>
      </div>

      {/* AI */}
      <div className="fixed bottom-6 left-6 z-50">
        {aiOpen ? (
          <div className="w-[360px] bg-[#151517] border border-white/[0.08] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,.8)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] p-4 flex justify-between"><span className="font-bold text-[13px]">✦ مساعد Trend-Up AI</span><button onClick={()=>setAiOpen(false)}>✕</button></div>
            <div className="h-[300px] overflow-auto p-4 space-y-3 text-[13px]">
              {aiChat.map((m,i)=><div key={i} className={`rounded-[14px] px-4 py-2.5 max-w-[85%] ${m.r==='ai' ? 'bg-white/[0.06] border border-white/[0.06]' : 'bg-[#8b5cf6] mr-auto'}`}>{m.t}</div>)}
            </div>
            <div className="p-3 border-t border-white/[0.06] flex gap-2"><input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && askAI()} placeholder="بكام متابعين تيك توك؟" className="flex-1 bg-[#0a0a0a] border border-white/[0.08] rounded-full px-4 py-2.5 text-[13px] outline-none"/><button onClick={askAI} className="w-10 h-10 bg-[#8b5cf6] rounded-full grid place-items-center">↑</button></div>
          </div>
        ) : (
          <button onClick={()=>setAiOpen(true)} className="btn-shimmer w-[60px] h-[60px] bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-full grid place-items-center text-xl glow animate-[float_6s_ease-in-out_infinite]">🤖</button>
        )}
      </div>

      <a href="https://wa.me/201275551116" target="_blank" className="btn-shimmer fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,.4)] rounded-full grid place-items-center text-2xl animate-[float_6s_ease-in-out_infinite]">💬</a>

      <footer className="mt-16 border-t border-white/[0.06] py-8 text-center text-[11px] text-zinc-600">TREND-UP © 2026 — 01275551116 • فودافون كاش 01221192493</footer>
    </div>
  )
}