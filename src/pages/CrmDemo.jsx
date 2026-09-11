import { useState } from 'react'
export default function CrmDemo(){
  const [clients,setClients]=useState([{name:'أحمد',due:1200,paid:800},{name:'فاطمة',due:2500,paid:2500}])
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo CRM تتبع الزبناء والديون</h2>
      <p style={{color:'#64748b'}}>مكمل لفاتورتي: تتبع كل زبون، كم عليه، كم دفع، وتنبيه واتساب للمتأخرين.</p>
      <div className="card" style={{marginTop:14}}>
        <div style={{display:'flex',justifyContent:'space-between'}}><h3>الزبناء</h3><span className="badge">مكمل لفاتورتي</span></div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13,marginTop:10}}>
          <thead><tr style={{background:'#1e3a8a',color:'white'}}><th style={{padding:8}}>الزبون</th><th>المطلوب</th><th>المدفوع</th><th>الباقي</th><th>حالة</th></tr></thead>
          <tbody>
            {clients.map(c=>(
              <tr key={c.name} style={{borderTop:'1px solid #e2e8f0'}}>
                <td style={{padding:8}}>{c.name}</td><td style={{padding:8}}>{c.due} MAD</td><td style={{padding:8}}>{c.paid} MAD</td><td style={{padding:8,fontWeight:800,color: c.due>c.paid ? '#dc2626':'#065f46'}}>{c.due-c.paid} MAD</td>
                <td style={{padding:8}}>{c.due>c.paid ? '⏰ متأخر':'✅ خالص'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:12,background:'#fef3c7',padding:10,borderRadius:10,fontSize:13}}>🔔 تنبيه تلقائي: "السلام أحمد، تذكير بمبلغ 400 درهم متبقي" - يرسل واتساب تلقائيا</div>
        <div style={{marginTop:10,display:'flex',gap:8}}><a href={`https://wa.me/212629277841?text=أريد CRM مثل Demo`} target="_blank" className="btn btn-primary">اطلب CRM</a><span className="badge">1200 درهم - مرة واحدة</span></div>
      </div>
    </div>
  )
}
