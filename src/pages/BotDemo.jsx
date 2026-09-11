import { useState } from 'react'

const replies = {
  "السلام":"وعليكم السلام! أنا مساعد Khadamat ARRAKHAE 🤖 كيف أساعدك؟\n1️⃣ معرفة الأسعار\n2️⃣ حجز موعد\n3️⃣ تتبع طلب",
  "السعر":"باقاتنا:\n• Pro 99 درهم/شهر (فواتير غير محدودة)\n• Business 199 درهم (مع بوت واتساب)\nأرسل 'حجز' للتفعيل",
  "حجز":"ممتاز! أرسل اسمك ورقم هاتفك وسأحجز لك تفعيل في أقل من ساعة ✅",
  "default":"شكراً لرسالتك! سأحولك لموظف بشري في ثوان... (هذا رد تلقائي ذكي، يشتغل 24/24 حتى وأنت نائم)"
}

export default function BotDemo(){
  const [msgs,setMsgs]=useState([{from:'bot',text: replies["السلام"]}])
  const [input,setInput]=useState("")
  const send=()=>{
    if(!input.trim()) return
    const user=input
    setMsgs(m=>[...m,{from:'user',text:user}])
    setInput("")
    setTimeout(()=>{
      const key = Object.keys(replies).find(k=> user.includes(k)) || "default"
      setMsgs(m=>[...m,{from:'bot',text: replies[key]}])
    },600)
  }
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo بوت واتساب + Messenger</h2>
      <p style={{color:'#64748b'}}>جرّب البوت مباشرة - يرد تلقائياً 24/24، يحجز المواعيد ويجمع الطلبات، ويحوّل للإنسان عند الحاجة.</p>

      <div className="grid2" style={{marginTop:14, alignItems:'start'}}>
        <div className="card" style={{padding:0, overflow:'hidden', maxWidth:380, margin:'0 auto', border:'2px solid #1e3a8a'}}>
          <div style={{background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',color:'white',padding:12,display:'flex',gap:10,alignItems:'center'}}>
            <div style={{width:36,height:36,borderRadius:99,background:'white',color:'#1e3a8a',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>K</div>
            <div><b>Khadamat ARRAKHAE</b><div style={{fontSize:12,opacity:0.9}}>متصل الآن • يرد تلقائياً 🤖</div></div>
          </div>
          <div style={{height:360, overflowY:'auto', padding:12, background:'#f8fafc', display:'flex', flexDirection:'column', gap:8}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{alignSelf: m.from==='user'?'flex-end':'flex-start', background: m.from==='user'?'#1e3a8a':'white', color: m.from==='user'?'white':'#0f172a', padding:'8px 12px', borderRadius:12, maxWidth:'80%', whiteSpace:'pre-wrap', border: m.from==='bot'?'1px solid #e2e8f0':'' , boxShadow:'0 2px 8px rgba(0,0,0,0.06)', fontSize:13}}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:6,padding:10, borderTop:'1px solid #e2e8f0', background:'white'}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="اكتب: السلام، السعر، حجز..." />
            <button className="btn btn-primary" onClick={send} style={{padding:'10px 16px'}}>إرسال</button>
          </div>
          <div style={{padding:8, background:'#fef3c7', textAlign:'center', fontSize:12, color:'#92400e'}}>Demo تفاعلي - جرّب كتابة "السعر" أو "حجز"</div>
        </div>

        <div style={{display:'grid',gap:12}}>
          <div className="card" style={{background:'linear-gradient(135deg,#eef2ff,#faf5ff)',borderColor:'#c7d2fe'}}>
            <h3 style={{color:'#1e3a8a'}}>ماذا يفعل البوت؟</h3>
            <ul style={{marginTop:8, lineHeight:1.9, color:'#334155'}}>
              <li>✓ يرد في ثانية 24/24 حتى وأنت نائم</li>
              <li>✓ يجيب على الأسئلة المتكررة (الأسعار، العنوان، الخدمات)</li>
              <li>✓ يحجز المواعيد ويجمع الطلبات في Google Sheets</li>
              <li>✓ يحوّل للإنسان تلقائياً عند كلمة "موظف"</li>
              <li>✓ يشتغل على واتساب + Messenger بنفس الوقت</li>
            </ul>
          </div>
          <div className="card">
            <h3>السعر والتركيب</h3>
            <div className="price">2000 درهم <span style={{fontSize:14,color:'#64748b'}}>تركيب مرة واحدة</span></div>
            <p style={{color:'#64748b',fontSize:13}}>+ 149 درهم/شهر مصاريف الرقم والسيرفر والصيانة مضمونة 24/24</p>
            <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
              <a href={`https://wa.me/212629277841?text=${encodeURIComponent('أريد Demo بوت واتساب لمتجري')}`} target="_blank" className="btn btn-primary">اطلب Demo لمتجرك</a>
              <a href="/pricing" className="btn btn-outline">شاهد الباقات</a>
            </div>
          </div>
          <div className="card" style={{background:'#f8fafc'}}>
            <b>كيف نركبه لك؟</b>
            <div style={{color:'#475569',fontSize:13,marginTop:6}}>1. ترسل لنا رقم واتساب العمل 2. نربطه في 24 ساعة 3. ندرّب البوت على أسئلتك 4. تستلم فيديو شرح</div>
          </div>

        </div>
      </div>
    </div>
  )
}
