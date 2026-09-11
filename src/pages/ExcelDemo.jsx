import { useState } from 'react'

export default function ExcelDemo(){
  const [rows,setRows]=useState([{id:1,prod:'باب خشبي',qty:2,pu:1200},{id:2,prod:'مطبخ MDF',qty:1,pu:8500}])
  const [client,setClient]=useState('أحمد - مراكش')
  const [auto,setAuto]=useState(false)
  const total = rows.reduce((s,r)=> s + r.qty*r.pu,0)
  const tva = total*0.2
  const ttc = total+tva
  const runAuto=()=>{ setAuto(true); setTimeout(()=>setAuto(false),2500) }
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo أتمتة Excel و Google Sheets</h2>
      <p style={{color:'#64748b'}}>شاهد الفرق: نفس الملف قبل وبعد الأتمتة. من عمل يدوي 2 ساعات → لضغطة واحدة.</p>

      <div className="grid2" style={{marginTop:14}}>
        <div className="card" style={{borderColor:'#fecaca',background:'#fef2f2'}}>
          <h3 style={{color:'#991b1b'}}>❌ قبل - عمل يدوي</h3>
          <ul style={{color:'#7f1d1d',fontSize:13,lineHeight:1.8,marginTop:6}}>
            <li>تكتب كل فاتورة يدوياً</li>
            <li>تحسب HT/TVA بآلة حاسبة</li>
            <li>تنسخ معلومات الزبون كل مرة</li>
            <li>تنشئ PDF يدوياً وترسله واتساب</li>
            <li>تضيع 2 ساعات يومياً + أخطاء</li>
          </ul>
          <div style={{marginTop:10,background:'white',padding:10,borderRadius:10,border:'1px solid #fecaca',textAlign:'center',color:'#991b1b',fontWeight:800}}>⏱️ 2 ساعات / يوم</div>
        </div>
        <div className="card" style={{borderColor:'#bbf7d0',background:'#f0fdf4'}}>
          <h3 style={{color:'#065f46'}}>✅ بعد - أتمتة Khadamat ARRAKHAE</h3>
          <ul style={{color:'#065f46',fontSize:13,lineHeight:1.8,marginTop:6}}>
            <li>تختار الزبون → يمتلئ كل شيء وحده</li>
            <li>تكتب الكمية → يحسب HT/TVA/TTC تلقائياً</li>
            <li>ضغطة واحدة → 3 فواتير PDF + حفظ + إرسال واتساب</li>
            <li>تقرير شهري يرسل وحده كل جمعة</li>
            <li>0 أخطاء</li>
          </ul>
          <div style={{marginTop:10,background:'white',padding:10,borderRadius:10,border:'1px solid #bbf7d0',textAlign:'center',color:'#065f46',fontWeight:800}}>⚡ 30 ثانية</div>
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
          <h3>جرّب الأتمتة بنفسك - عدّل الكمية وشاهد الحساب التلقائي</h3>
          <span className="badge badge-gold">Excel → Google Sheets → PDF → واتساب</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
          <div>
            <label style={{fontSize:13,fontWeight:700}}>الزبون (يُملى تلقائياً)</label>
            <select value={client} onChange={e=>setClient(e.target.value)}>
              <option>أحمد - مراكش - ICE 001</option>
              <option>فاطمة - الدار البيضاء - ICE 002</option>
              <option>شركة النور - الرباط - ICE 003</option>
            </select>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>عند اختيار الزبون، يُجلب ICE والعنوان تلقائياً من قاعدة البيانات</div>
          </div>
          <div style={{background:'#f8fafc',padding:10,borderRadius:12,border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:12,color:'#64748b'}}>الزبون المختار</div><b>{client}</b>
            <div style={{fontSize:12,color:'#065f46',marginTop:4}}>✓ تم الجلب تلقائياً</div>
          </div>
        </div>

        <div style={{overflowX:'auto',marginTop:12}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead><tr style={{background:'#1e3a8a',color:'white'}}><th style={{padding:8}}>المنتج</th><th>الكمية (عدّلها)</th><th>الثمن</th><th>المجموع HT (تلقائي)</th></tr></thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id} style={{borderTop:'1px solid #e2e8f0', background: auto?'#f0fdf4':''}}>
                  <td style={{padding:6}}>{r.prod}</td>
                  <td style={{padding:6}}><input type="number" value={r.qty} onChange={e=>setRows(rows.map(x=> x.id===r.id? {...x,qty:Number(e.target.value)}:x))} style={{width:80,borderColor:auto?'#10b981':''}}/></td>
                  <td style={{padding:6}}>{r.pu} MAD</td>
                  <td style={{padding:6,fontWeight:800,color:'#1e3a8a'}}>{(r.qty*r.pu).toLocaleString()} MAD {auto && '✓'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{display:'grid',gap:6,marginTop:12,maxWidth:320,marginInlineStart:'auto',background:'#f8fafc',padding:12,borderRadius:12,border: auto?'2px solid #10b981':'1px solid #e2e8f0'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>HT</span><b>{total.toLocaleString()} MAD</b></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>TVA 20%</span><b>{tva.toLocaleString()} MAD</b></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:16}}><span>TTC</span><b style={{color:'#1e3a8a'}}>{ttc.toLocaleString()} MAD</b></div>
          {auto && <div style={{color:'#065f46',fontWeight:800,textAlign:'center',marginTop:4}}>✓ حُسب تلقائياً</div>}
        </div>

        <div style={{display:'flex',gap:10,marginTop:14,flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={runAuto}>{auto?'⏳ جاري الأتمتة...':'⚡ أتمتة: إنشاء PDF + حفظ + إرسال واتساب'}</button>
          <a href={`https://wa.me/212629277841?text=${encodeURIComponent(`أريد أتمتة Excel مثل Demo - الزبون ${client} - المبلغ ${ttc} MAD`)}`} target="_blank" className="btn btn-dark">اطلب نفس الأتمتة لملفك</a>
        </div>
        {auto && (
          <div style={{marginTop:12,background:'#f0fdf4',border:'1px solid #bbf7d0',padding:12,borderRadius:12,color:'#065f46',fontSize:13,lineHeight:1.8}}>
            ✅ تم: 1) إنشاء PDF باسم {client} 2) حفظ في Google Sheets 3) إرسال واتساب للزبون 4) تحديث المخزون 5) تسجيل في تقرير المبيعات
          </div>
        )}
      </div>

      <div className="card" style={{marginTop:14,background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',color:'white'}}>
        <h3 style={{color:'#fde68a'}}>ماذا أسلمك بـ 800 درهم؟</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:8,fontSize:13,opacity:0.95}}>
          <div>✓ تحويل ملف Excel الحالي لنظام ذكي<br/>✓ ربط Google Sheets + Forms<br/>✓ زر PDF + واتساب تلقائي</div>
          <div>✓ تقرير شهري تلقائي<br/>✓ تنبيه نفاذ المخزون<br/>✓ فيديو شرح 10 دقائق</div>
        </div>
        <div style={{marginTop:10,background:'white',color:'#1e3a8a',padding:8,borderRadius:10,textAlign:'center',fontWeight:800}}>أرسل لي ملف Excel الحالي على واتساب وأحوله لك في 24 ساعة</div>
      </div>
    </div>
  )
}
