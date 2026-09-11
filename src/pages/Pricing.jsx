import { setSub, getSub } from '../lib/subscription.js'

const WHATSAPP = "212629277841"
function wa(msg){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` }

export default function Pricing(){
  const sub=getSub()
  const activate=(plan)=>{
    if(plan==='free'){ setSub('free'); alert('تم تفعيل المجاني - لديك وثيقة واحدة مجانية'); location.reload(); return }
    if(confirm(`تفعيل ${plan} ؟ (تجريبي - سيتم تأكيده عبر واتساب)`)){ setSub(plan); alert(`تم تفعيل ${plan} محلياً. أرسل إثبات الدفع على واتساب للتأكيد النهائي.`); window.open(wa(`أريد تفعيل باقة ${plan} - إثبات الدفع`), '_blank') }
  }
  const plans=[
    {id:'free',name:'مجاني',price:'0 درهم',features:['خمس وثائق مجانية (فاتورة أو CV)','علامة مائية','تحميل PDF'],cta:'جرب مجاناً',color:'#e2e8f0'},
    {id:'pro',name:'Pro',price:'99 درهم / شهر',popular:true,features:['فواتير غير محدودة','Devis + Bon de livraison','سيرة ذاتية بلا علامة مائية','حفظ الزبناء','دعم واتساب 24/24'],cta:'اشترك Pro',color:'#0ea5e9'},
    {id:'business',name:'Business',price:'199 درهم / شهر',features:['كل مزايا Pro','بوت واتساب أساسي','موقع Vitrine هدية','تدريب 1 ساعة'],cta:'اشترك Business',color:'#0f172a'},
  ]
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>أسعار فاتورتي - اشتراك بسيط وواضح</h2>
      <p style={{color:'#64748b'}}>هذه الأسعار خاصة بنظام <b>فاتورتي</b> فقط (فاتورة، Devis، Bon de livraison). ادفع شهرياً عبر Wafacash / MoPay / تحويل بنكي. التفعيل في أقل من ساعة.</p>
      <div className="badge" style={{marginTop:8}}>حالتك الحالية: {sub.plan} {sub.count?`• استعملت ${sub.count} وثيقة مجانية`:''}</div>

      <div className="grid3" style={{marginTop:16}}>
        {plans.map(p=>(
          <div key={p.id} className="card" style={{border: p.popular?'2px solid #0ea5e9':'1px solid #e2e8f0', transform: p.popular?'scale(1.03)':''}}>
            {p.popular && <span className="badge" style={{background:'#0ea5e9',color:'white'}}>الأكثر طلباً</span>}
            <h3 style={{marginTop:8}}>{p.name}</h3>
            <div className="price" style={{color:p.color==='white'?'#0f172a':p.color}}>{p.price}</div>
            <ul style={{marginTop:10, color:'#334155', lineHeight:1.9}}>
              {p.features.map(f=> <li key={f}>✓ {f}</li>)}
            </ul>
            <button className={p.popular?'btn btn-primary':'btn btn-outline'} style={{width:'100%',marginTop:12}} onClick={()=>activate(p.id)}>{p.cta}</button>
            {p.id!=='free' && <div style={{fontSize:12,color:'#64748b',marginTop:6, textAlign:'center'}}>بعد الضغط سنتواصل واتساب للتفعيل</div>}
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3>طرق الدفع المتاحة في المغرب</h3>
        <div className="grid3" style={{marginTop:10}}>
          <div className="card" style={{background:'#f8fafc'}}><b>Wafacash / CashPlus</b><div style={{color:'#64748b',fontSize:13}}>الدفع عبر واتساب - أرسل صورة الوصل في المحادثة</div><a href={wa('أريد الدفع عبر Wafacash')} target="_blank" className="btn btn-dark" style={{display:'block',textAlign:'center',marginTop:8}}>إرسال الوصل عبر واتساب</a></div>
          <div className="card" style={{background:'#f8fafc'}}><b>MoPay / Barid Cash</b><div style={{color:'#64748b',fontSize:13}}>الدفع عبر واتساب - تفعيل فوري بعد التوصل</div><a href={wa('أريد الدفع عبر MoPay')} target="_blank" className="btn btn-dark" style={{display:'block',textAlign:'center',marginTop:8}}>إرسال الوصل عبر واتساب</a></div>
          <div className="card" style={{background:'#f8fafc'}}><b>تحويل بنكي CIH / Attijari</b><div style={{color:'#64748b',fontSize:13}}>RIB: 230 010 0000000000 - أرسل إشعار التحويل</div><a href={wa('أريد RIB للدفع')} target="_blank" className="btn btn-dark" style={{display:'block',textAlign:'center',marginTop:8}}>طلب RIB</a></div>
        </div>
        <p style={{color:'#64748b',fontSize:12,marginTop:10}}>ملاحظة احترافية: بعد الدفع نرسل لك كود تفعيل يفتح كل المزايا. يمكنك تغيير الأرقام والـ RIB في src/pages/Pricing.jsx</p>
      </div>

      <div className="grid2" style={{marginTop:14}}>
        <div className="card"><h3>CGV - شروط البيع</h3><p style={{color:'#64748b',fontSize:13}}>اشتراك شهري غير ملتزم، يمكنك الإلغاء في أي وقت. لا استرجاع بعد تفعيل الشهر الجاري. الدعم عبر واتساب 24/24.</p></div>
        <div className="card"><h3>الخصوصية</h3><p style={{color:'#64748b',fontSize:13}}>بياناتك تُحفظ في جهازك فقط (localStorage). لا نبيع معطياتك. ملفات PDF تُنشأ محلياً ولا تُرسل لخادم.</p></div>
      </div>
    </div>
  )
}
