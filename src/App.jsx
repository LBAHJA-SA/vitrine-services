import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Bot, FileText, Globe, MessageCircle, Zap, BarChart3, Mail, Phone, Dog, ShoppingCart, Palette, Users } from 'lucide-react'
import Fatourati from './pages/Fatourati.jsx'
import CvBuilder from './pages/CvBuilder.jsx'
import Pricing from './pages/Pricing.jsx'
import BotDemo from './pages/BotDemo.jsx'
import VitrineDemo from './pages/VitrineDemo.jsx'
import ExcelDemo from './pages/ExcelDemo.jsx'
import SeoDogArticle from './pages/SeoDogArticle.jsx'
import ShopDemo from './pages/ShopDemo.jsx'
import LogoDemo from './pages/LogoDemo.jsx'
import CrmDemo from './pages/CrmDemo.jsx'
import MirathDemo from './pages/MirathDemo.jsx'
import GoogleMapDemo from './pages/GoogleMapDemo.jsx'
import { dict } from './lib/i18n.js'

const WHATSAPP_NUMBER = "212629277841" // غيره لرقمك
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("السلام، أريد الاستفادة من خدماتكم")}`

function Navbar({lang,setLang}){
  const t=dict[lang]
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="logo">Khadamat <span>ARRAKHAE</span></div>
        <div className="nav-links">
          <NavLink to="/" className={({isActive})=>isActive?"active":""}>{t.nav_home}</NavLink>
          <NavLink to="/services" className={({isActive})=>isActive?"active":""}>{t.nav_services}</NavLink>
          <NavLink to="/fatourati" className={({isActive})=>isActive?"active":""}>{t.nav_fatourati}</NavLink>
          <NavLink to="/cv" className={({isActive})=>isActive?"active":""}>{t.nav_cv}</NavLink>
          <NavLink to="/pricing" className={({isActive})=>isActive?"active":""}>{t.nav_pricing}</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?"active":""}>{t.nav_contact}</NavLink>
          <div className="lang-switch">
            <button className={lang==='ar'?'active':''} onClick={()=>setLang('ar')}>AR</button>
            <button className={lang==='fr'?'active':''} onClick={()=>setLang('fr')}>FR</button>
            <button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" className="btn btn-primary">{t.whatsapp}</a>
        </div>
      </div>
    </nav>
  )
}

function Home({lang}){
  const t=dict[lang]
  return (
    <div className="container">
      <section className="hero">
        <div>
          <span className="badge badge-gold">{t.badge}</span>
          <h1>{t.hero_h1_1}<span>{t.hero_h1_2}</span>{t.hero_h1_3}</h1>
          <p>{t.hero_p}</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href={WHATSAPP_LINK} target="_blank" className="btn btn-primary">{t.cta_free}</a>
            <a href="/services" className="btn btn-outline">{t.cta_services}</a>
          </div>
          <div style={{marginTop:16,display:'flex',gap:12,flexWrap:'wrap'}}>
            <span className="badge">بدون خروج من البيت</span>
            <span className="badge">دفع آمن</span>
            <span className="badge">تسليم سريع 24-72 ساعة</span>
          </div>
        </div>
        <div className="card">
          <h3>{t.why}</h3>
          <p style={{color:'#475569',margin:'8px 0'}}>{t.why_p}</p>
          <div className="grid2">
            <div className="card" style={{padding:14}}><Zap size={20}/><b>سرعة</b><div style={{color:'#64748b'}}>تسليم في 1-3 أيام</div></div>
            <div className="card" style={{padding:14}}><BarChart3 size={20}/><b>نتيجة</b><div style={{color:'#64748b'}}>أداة تجيب زبناء</div></div>
          </div>
        </div>
      </section>

      <section style={{marginTop:10}} className="grid3">
        <div className="card"><div className="service-icon"><Bot/></div><h3>بوت واتساب ذكي</h3><p style={{color:'#64748b'}}>يرد على الزبناء 24/24، يحجز المواعيد ويجمع الطلبات.</p><div className="price" style={{fontSize:22}}>2000 درهم + <span>149/شهر</span></div><div style={{fontSize:12,color:'#64748b'}}>مصاريف الرقم والسيرفر والصيانة 24/24</div></div>
        <div className="card"><div className="service-icon"><FileText/></div><h3>نظام فاتورتي</h3><p style={{color:'#64748b'}}>فاتورة، Devis، Bon de livraison ب PDF احترافي.</p><div className="price">99 درهم/شهر</div></div>
        <div className="card"><div className="service-icon"><Globe/></div><h3>موقع Vitrine</h3><p style={{color:'#64748b'}}>موقع سريع يظهر في Google ويجيب اتصالات.</p><div className="price">1500 درهم</div></div>
      </section>
      <section style={{marginTop:12}} className="grid2">
        <div className="card" style={{borderColor:'#fde68a',background:'linear-gradient(135deg,#fef3c7,#fff)'}}><div className="service-icon" style={{background:'#fef3c7'}}><Dog size={20}/></div><h3>🐶 حضانة وترويض الكلاب - مراكش</h3><p style={{color:'#64748b',fontSize:13}}>نزهة ساعة يومياً + مبيت ورعاية + ترويض منزلي - مراكش فقط - ابتداء من 100 درهم</p><a href="/seo-dog" className="btn btn-primary" style={{marginTop:8,display:'inline-block'}}>شاهد التفاصيل</a></div>
        <div className="card"><div className="service-icon"><Zap/></div><h3>مولد السيرة الذاتية</h3><p style={{color:'#64748b',fontSize:13}}>قوالب AR/FR/EN/CA كندي - 5 قوالب PDF</p><div className="price">49 درهم</div></div>
      </section>
      <section style={{marginTop:12}}>
        <h2 style={{marginBottom:4}}>📁 نماذج من أعمالنا</h2>
        <p style={{color:'#64748b',fontSize:13}}>شوف الجودة بعينيك قبل ما تطلب - حمّل مثال أو جرّب بنفسك.</p>
        <div className="grid3" style={{marginTop:10}}>
          <div className="card"><h3>CV كندي مقبول</h3><p style={{color:'#64748b',fontSize:13}}>مثال PDF جاهز للإرسال للشركات.</p><div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}><a href="/samples/cv-exemple.pdf" target="_blank" className="btn btn-outline">حمّل المثال</a><a href="/cv" className="btn btn-primary">صايب ديالك - 49 درهم</a></div></div>
          <div className="card"><h3>فاتورة احترافية</h3><p style={{color:'#64748b',fontSize:13}}>مثال: Café Al Baraka - 1800 درهم TTC.</p><div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}><a href="/samples/facture-exemple.pdf" target="_blank" className="btn btn-outline">حمّل المثال</a><a href="/fatourati" className="btn btn-primary">جرّب فاتورتي</a></div></div>
          <div className="card"><h3>Google Map لمحل</h3><p style={{color:'#64748b',fontSize:13}}>خريطة + هاتف + صور + تقييمات - تسليم 48 ساعة.</p><div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}><a href="/map-demo" className="btn btn-outline">شوف التفاصيل</a><a href={WHATSAPP_LINK} target="_blank" className="btn btn-primary">اطلب - 200 درهم</a></div></div>
        </div>
      </section>

    </div>
  )
}

const services = [
  {icon: MessageCircle, title:"بوت واتساب + Messenger", desc:"رد تلقائي 24/24، حجز مواعيد، تجميع طلبات. جرّب الـ Demo الآن.", price:"2000 درهم + 149/شهر", benefits:["يرد في ثانية 24/24 حتى وأنت نائم","يحجز المواعيد ويجمع الطلبات في Google Sheets","يحوّل للإنسان عند كلمة 'موظف'","توفر راتب موظف 3000 درهم/شهر"], link:"/bot-demo"},
  {icon: FileText, title:"فاتورتي - الفوترة والاقتباس", desc:"إنشاء فاتورة، Devis، فاتورة إلكترونية، تصدير PDF وختم.", price:"99 درهم/شهر", benefits:["فاتورة/Devis/Bon بـ ICE/RC/IF في 15 ثانية","حفظ تلقائي للزبناء والفواتير + PDF احترافي","خمس وثائق مجانية ثم غير محدود","توفر ساعتين يومياً"], link:"/fatourati"},
  {icon: Globe, title:"موقع تعريفي سريع", desc:"تصميم + استضافة + دومين + تحسين Google. شاهد Demo", price:"1500 درهم", benefits:["يظهر في Google ويجيب اتصالات","سريع + زر واتساب ثابت + خرائط","دومين واستضافة سنة","تسجيل Google Business مجاني"], link:"/vitrine-demo"},
  {icon: ShoppingCart, title:"متجر إلكتروني جاهز", desc:"YouCan/Shopify - منتجات، دفع، توصيل. جاهز في 48 ساعة", price:"2500 درهم", benefits:["منتجات، سلة، دفع عند التسليم","توصيل لكل المغرب + واتساب","10 منتجات مدخلة + صور","جاهز في 48 ساعة"], link:"/shop-demo"},
  {icon: Palette, title:"تصميم شعار وهوية بصرية", desc:"شعار + ألوان + بطاقة زيارة بالذكاء الاصطناعي - تسليم ساعة", price:"300 درهم", benefits:["3 مقترحات شعار + تعديل مجاني","ألوان + بطاقة زيارة + غلاف Facebook","تسليم في ساعة واحدة","ملفات PDF و PNG جاهزة للطباعة"], link:"/logo-demo"},
  {icon: Users, title:"CRM تتبع الزبناء والديون", desc:"تتبع زبناء، ديون، مدفوعات، تنبيهات - مكمل لفاتورتي", price:"1200 درهم", benefits:["تتبع كل زبون: عليه/له/الباقي","تنبيه واتساب تلقائي للمتأخرين","تقرير ديون شهري","مكمل مباشر لفاتورتي"], link:"/crm-demo"},
  {icon: Bot, title:"أتمتة Excel و Google Sheets", desc:"تحويل ملفاتك لنظام يشتغل تلقائياً. جرّب Demo", price:"800 درهم", benefits:["يحسب HT/TVA تلقائياً","PDF + واتساب بضغطة واحدة","من ساعتين يومياً إلى 30 ثانية","تقرير شهري تلقائي"], link:"/excel-demo"},
  {icon: Zap, title:"مولد السيرة الذاتية", desc:"قوالب AR/FR/EN/CA كندي - 5 قوالب PDF", price:"49 درهم", benefits:["5 قوالب AR/FR/EN/CA كندي ATS","بدون صورة وبدون عمر للطريقة الكندية","معاينة مباشرة + PDF","جاهزة للإرسال للشركات"], link:"/cv"},
  {icon: BarChart3, title:"كتابة محتوى SEO بالذكاء الاصطناعي", desc:"مقالات تظهر في Google وتجيب زوار", price:"300 درهم / 10 مقالات", benefits:["مقالات 800-1000 كلمة SEO","تظهر أولاً في Google","مقال واحد = 5 اتصالات/شهر لسنة","كلمات مفتاحية مدروسة"], link:"/seo-dog"},
  {icon: Dog, title:"حضانة ومبيت وترويض الكلاب - مراكش", desc:"نزهة ساعة/يوم + مبيت ورعاية + ترويض منزلي - مراكش فقط", price:"ابتداء من 100 درهم", benefits:["نزهة ساعة يومياً في حدائق مراكش","مبيت دافئ + أكل + نظافة","فيديو وصور يومية على واتساب","ترويض منزلي احترافي"]},
  {icon: FileText, title:"حاسبة الميراث والزكاة", desc:"حاسبة شرعية 2.5% + قسمة الميراث - مطلوبة جداً في Google", price:"200 درهم", benefits:["حساب الزكاة 2.5% تلقائياً","قسمة الميراث حسب الشرع","شهادة PDF","بدون إعلانات - تعمل بدون أنترنيت"], link:"/mirath-demo"},
  {icon: Globe, title:"حساب Google Map للمحلات", desc:"ننشئ لك Google Business كامل: خريطة + هاتف + صور - تسليم 48 ساعة عن بعد", price:"200 درهم", benefits:["يبان محلك في Google و Maps ويجيب اتصالات","العنوان + الهاتف + ساعات العمل + صور","زر واتساب وطريق للمحل","شرح فيديو للتقييمات - عن بعد 100%"], link:"/map-demo"},
]

function Services(){
  const [open,setOpen]=useState(null)
  return (
    <div className="container" style={{paddingTop:20}}>
      <p style={{color:'#64748b'}}>كل خدمة أسلمها لك جاهزة للعمل.</p>
      <div className="grid3" style={{marginTop:16}}>
        {services.map((s,idx)=>(
          <div key={s.title} className="card">
            <div className="service-icon"><s.icon size={20}/></div>
            <h3>{s.title}</h3>
            <p style={{color:'#64748b',minHeight:50}}>{s.desc}</p>
            <div className="price" style={{fontSize:20}}>{s.price}</div>
            <button onClick={()=> setOpen(open===idx?null:idx)} className="btn btn-outline" style={{width:'100%',marginTop:10,padding:'8px'}}>{open===idx ? 'إخفاء الامتيازات ▲' : 'شاهد الامتيازات ▼'}</button>
            {open===idx && s.benefits && (
              <ul style={{marginTop:10,background:'#f8fafc',padding:10,borderRadius:10,border:'1px solid #e2e8f0',fontSize:13,lineHeight:1.8,color:'#334155'}}>
                {s.benefits.map(b=> <li key={b}>✓ {b}</li>)}
              </ul>
            )}
            {s.link ? <a href={s.link} className="btn btn-primary" style={{display:'block',textAlign:'center',marginTop:10}}>جرّب Demo</a> : null}
            <a href={WHATSAPP_LINK} target="_blank" className="btn btn-dark" style={{display:'block',textAlign:'center',marginTop:8}}>اطلب الآن</a>
          </div>
        ))}
      </div>
    </div>
  )
}

function Contact(){
  const onSubmit = (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    const msg = `طلب جديد: ${data.get('name')} - ${data.get('phone')} - ${data.get('service')} - ${data.get('msg')}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank')
  }
  return (
    <div className="container" style={{paddingTop:20}}>
      <h2>اتصل بي - أرد في أقل من ساعة</h2>
      <div className="grid2" style={{marginTop:16}}>
        <form onSubmit={onSubmit} className="card" style={{display:'grid',gap:12}}>
          <input name="name" placeholder="اسمك" required/>
          <input name="phone" placeholder="واتساب / هاتف" required/>
          <select name="service"><option>بوت واتساب</option><option>فاتورتي</option><option>موقع Vitrine</option><option>خدمة أخرى</option></select>
          <textarea name="msg" rows={4} placeholder="اكتب طلبك..."></textarea>
          <button className="btn btn-primary" type="submit">إرسال عبر واتساب</button>
        </form>
        <div className="card">
          <h3><Phone size={18}/> تواصل مباشر</h3>
          <p style={{color:'#64748b'}}>أعمل من البيت 24/24، أرد على الرسائل في أقل من ساعة - التواصل عبر رسائل واتساب فقط.</p>
          <div style={{marginTop:12,display:'flex',gap:10}}>
            <a href={WHATSAPP_LINK} target="_blank" className="btn btn-primary">💬 راسلنا على واتساب</a>
            <a href="mailto:contact@khadamati.ai" className="btn btn-outline"><Mail size={16}/> إيميل</a>
          </div>
          <p style={{marginTop:12,color:'#64748b',fontSize:11}}>الرقم مخفي - التواصل عبر الرسائل فقط بدون اتصال.</p>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [lang,setLang]=useState(()=> localStorage.getItem('lang')||'ar')
  useEffect(()=>{ localStorage.setItem('lang',lang); document.documentElement.lang=lang; document.documentElement.dir= lang==='ar' ? 'rtl':'ltr' },[lang])
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang}/>
      <Routes>
        <Route path="/" element={<Home lang={lang}/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/fatourati" element={<Fatourati/>}/>
        <Route path="/cv" element={<CvBuilder/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/bot-demo" element={<BotDemo/>}/>
        <Route path="/vitrine-demo" element={<VitrineDemo/>}/>
        <Route path="/excel-demo" element={<ExcelDemo/>}/>
        <Route path="/seo-dog" element={<SeoDogArticle/>}/>
        <Route path="/shop-demo" element={<ShopDemo/>}/>
        <Route path="/logo-demo" element={<LogoDemo/>}/>
        <Route path="/crm-demo" element={<CrmDemo/>}/>
        <Route path="/mirath-demo" element={<MirathDemo/>}/>
        <Route path="/map-demo" element={<GoogleMapDemo/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Home lang={lang}/>}/>
      </Routes>
      <a href={WHATSAPP_LINK} target="_blank" className="whatsapp">واتساب</a>
      <div className="footer container">
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
          <a href="/pricing">الأسعار</a> • <a href="/fatourati">فاتورتي</a> • <a href="/cv">السيرة الذاتية</a> • <span>CGV: اشتراك شهري غير ملتزم</span>
        </div>
        © {new Date().getFullYear()} Khadamat ARRAKHAE - حلول ذكية للمقاول الذاتي • جودة واحترافية • <a href={WHATSAPP_LINK} target="_blank">دعم واتساب 24/24</a>
      </div>
    </BrowserRouter>
  )
}
