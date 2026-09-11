export default function LogoDemo(){
  const WA="212629277841"
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo تصميم شعار وهوية</h2>
      <p style={{color:'#64748b'}}>شعار + ألوان + بطاقة زيارة + غلاف Facebook - تسليم في ساعة بالذكاء الاصطناعي.</p>
      <div className="grid3" style={{marginTop:14}}>
        <div className="card" style={{textAlign:'center'}}><div style={{width:80,height:80,borderRadius:16,background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900}}>K</div><h3 style={{marginTop:8}}>شعار Khadamat</h3><div style={{color:'#64748b',fontSize:12}}>3 مقترحات + تعديل مجاني</div></div>
        <div className="card"><h3>🎨 الألوان</h3><div style={{display:'flex',gap:6,marginTop:6}}><span style={{width:30,height:30,borderRadius:99,background:'#1e3a8a'}}></span><span style={{width:30,height:30,borderRadius:99,background:'#7c3aed'}}></span><span style={{width:30,height:30,borderRadius:99,background:'#f59e0b'}}></span></div><div style={{fontSize:12,color:'#64748b',marginTop:6}}>كحلي + بنفسجي + ذهبي</div></div>
        <div className="card"><h3>💳 بطاقة زيارة</h3><div style={{height:80,background:'#0f172a',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:12}}>Khadamat ARRAKHAE<br/>06 00 00 00 00</div></div>
      </div>
      <div className="card" style={{marginTop:12,background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',color:'white',textAlign:'center'}}>
        <h3 style={{color:'#fde68a'}}>300 درهم - تسليم ساعة</h3>
        <a href={`https://wa.me/${WA}?text=أريد شعار مثل Demo`} target="_blank" className="btn" style={{background:'white',color:'#1e3a8a',marginTop:8}}>اطلب شعارك</a>
      </div>
    </div>
  )
}
