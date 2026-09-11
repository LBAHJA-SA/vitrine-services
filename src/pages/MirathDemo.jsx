import { useState } from 'react'
export default function MirathDemo(){
  const [zakatAmount,setZakatAmount]=useState(50000)
  const [mirathTotal,setMirathTotal]=useState(100000)
  const [sons,setSons]=useState(1)
  const [daughters,setDaughters]=useState(1)
  const nisab=35000
  const zakat = zakatAmount >= nisab ? zakatAmount*0.025 : 0

  const totalParts = sons*2 + daughters*1
  const sonShare = totalParts? (mirathTotal * 2 / totalParts) : 0
  const daughterShare = totalParts? (mirathTotal * 1 / totalParts) : 0

  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo حاسبة الميراث والزكاة</h2>
      <p style={{color:'#64748b'}}>حاسبة شرعية مبسطة - للتوضيح فقط، الفتوى النهائية للعدول. مطلوبة جداً في Google.</p>

      <div className="grid2" style={{marginTop:14}}>
        <div className="card">
          <h3>💰 حاسبة الزكاة (2.5%)</h3>
          <p style={{fontSize:12,color:'#64748b'}}>النصاب ≈ 35,000 درهم (85غ ذهب)</p>
          <label>مجموع المال (درهم)</label>
          <input type="number" value={zakatAmount} onChange={e=>setZakatAmount(Number(e.target.value))} />
          <div style={{marginTop:10,background: zakat? '#f0fdf4':'#fef2f2',padding:12,borderRadius:10,border:`1px solid ${zakat?'#bbf7d0':'#fecaca'}`}}>
            {zakat ? <><b style={{color:'#065f46'}}>الزكاة الواجبة: {zakat.toLocaleString()} درهم</b><div style={{fontSize:12,color:'#065f46'}}>2.5% من {zakatAmount.toLocaleString()} درهم</div></> : <b style={{color:'#991b1b'}}>لا زكاة - المال أقل من النصاب (35,000)</b>}
          </div>
          <div style={{fontSize:11,color:'#64748b',marginTop:6}}>الدليل: "وفي أموالهم حق للسائل والمحروم"</div>
        </div>

        <div className="card">
          <h3>📜 حاسبة الميراث المبسطة</h3>
          <p style={{fontSize:12,color:'#64748b'}}>حالة: أولاد فقط (للذكر مثل حظ الأنثيين)</p>
          <label>مجموع التركة (درهم)</label><input type="number" value={mirathTotal} onChange={e=>setMirathTotal(Number(e.target.value))} />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
            <div><label>عدد الأبناء</label><input type="number" value={sons} onChange={e=>setSons(Number(e.target.value))} /></div>
            <div><label>عدد البنات</label><input type="number" value={daughters} onChange={e=>setDaughters(Number(e.target.value))} /></div>
          </div>
          <div style={{marginTop:10,background:'#eef2ff',padding:12,borderRadius:10,border:'1px solid #c7d2fe'}}>
            <div style={{fontSize:13}}>مجموع الأسهم: {totalParts} سهم</div>
            <div style={{fontSize:13,marginTop:4}}>نصيب الابن: <b style={{color:'#1e3a8a'}}>{sonShare.toLocaleString()} درهم</b> (2 أسهم)</div>
            <div style={{fontSize:13}}>نصيب البنت: <b style={{color:'#7c3aed'}}>{daughterShare.toLocaleString()} درهم</b> (1 سهم)</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:6}}>مثال: 100,000 مع ابن وبنت → الابن 66,666 والبنت 33,333</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:12,background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',color:'white',textAlign:'center'}}>
        <h3 style={{color:'#fde68a'}}>200 درهم - نسخة كاملة</h3>
        <p style={{fontSize:13,opacity:0.9}}>حاسبة كاملة مع كل الحالات (زوجة، أم، أب) + شهادة PDF + بدون إعلانات</p>
        <a href={`https://wa.me/212629277841?text=${encodeURIComponent('أريد حاسبة الميراث والزكاة مثل Demo')}`} target="_blank" className="btn" style={{background:'white',color:'#1e3a8a',marginTop:8}}>اطلب الحاسبة</a>
      </div>
      <div style={{fontSize:11,color:'#64748b',textAlign:'center',marginTop:8}}>تنبيه: هذه حاسبة تعليمية مبسطة، للفتوى الرسمية راجع العدول.</div>
    </div>
  )
}
