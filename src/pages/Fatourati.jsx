import { useState, useMemo } from 'react'
import jsPDF from 'jspdf'
import { getSub, incCount, canUseFree } from '../lib/subscription.js'

export default function Fatourati(){
  const [docType,setDocType]=useState('فاتورة')
  const [company,setCompany]=useState(()=>JSON.parse(localStorage.getItem('fat_company')||'null')||{name:'شركتي',ice:'',rc:'',if:'',addr:'الدار البيضاء، المغرب',phone:'06 00 00 00 00',email:''})
  const [client,setClient]=useState({name:'',ice:'',addr:'',phone:''})
  const [meta,setMeta]=useState({num:`FAC-${new Date().getFullYear()}-001`,date:new Date().toISOString().slice(0,10),echeance:''})
  const [items,setItems]=useState([{id:1,desc:'تصميم موقع',qty:1,pu:1500,tva:20}])
  const [notes,setNotes]=useState('شكراً لثقتكم. الدفع عند التسليم.')
  const addItem=()=>setItems([...items,{id:Date.now(),desc:'',qty:1,pu:0,tva:20}])
  const upd=(id,f,v)=>setItems(items.map(it=> it.id===id? {...it,[f]:v}:it))
  const del=(id)=>setItems(items.filter(it=>it.id!==id))
  const totals = useMemo(()=>{
    let ht=0,tva=0
    items.forEach(it=>{ const l = Number(it.qty)*Number(it.pu); ht+=l; tva+= l*Number(it.tva)/100 })
    return {ht, tva, ttc: ht+tva}
  },[items])
  const saveCompany=()=>{ localStorage.setItem('fat_company', JSON.stringify(company)); alert('تم حفظ معلومات شركتك - سيتم الحفظ التلقائي للفواتير القادمة') }
  const exportPDF=()=>{
    const sub=getSub()
    if(!canUseFree()){ alert('انتهت وثيقتك المجانية. اشترك في Pro (99 درهم/شهر) للمتابعة.'); location.href='/pricing'; return }
    if(sub.plan==='free') incCount()
    // حفظ تلقائي للزبناء والفواتير
    try{
      const history = JSON.parse(localStorage.getItem('fat_history')||'[]')
      history.unshift({num:meta.num, date:meta.date, client:client.name, type:docType, total: totals.ttc, at: new Date().toISOString()})
      localStorage.setItem('fat_history', JSON.stringify(history.slice(0,50)))
      const clients = JSON.parse(localStorage.getItem('fat_clients')||'[]')
      if(client.name && !clients.find(c=>c.name===client.name)) { clients.push(client); localStorage.setItem('fat_clients', JSON.stringify(clients)) }
    }catch{}
    const doc = new jsPDF({unit:'mm',format:'a4'})
    let y=15
    doc.setFontSize(16); doc.text(`${docType} - ${meta.num}`, 105, y, {align:'center'}); y+=8
    doc.setFontSize(9); doc.text(`Date: ${meta.date}  |  Echeance: ${meta.echeance||'-'}`, 105, y, {align:'center'}); y+=8
    doc.setFontSize(10); doc.text(`Emetteur: ${company.name} | ICE:${company.ice} RC:${company.rc} IF:${company.if}`, 10, y); y+=5
    doc.text(`Adresse: ${company.addr} Tel:${company.phone}`, 10, y); y+=7
    doc.text(`Client: ${client.name} | ICE:${client.ice}`, 10, y); y+=5
    doc.text(`Adresse client: ${client.addr} Tel:${client.phone}`, 10, y); y+=7
    // table header
    doc.setFontSize(9); doc.setFillColor(14,165,233); doc.setTextColor(255,255,255)
    doc.rect(10,y,190,8,'F'); doc.text('Designation',11,y+5); doc.text('Qte',110,y+5); doc.text('PU HT',130,y+5); doc.text('TVA',155,y+5); doc.text('Total HT',170,y+5)
    doc.setTextColor(0,0,0); y+=10
    items.forEach(it=>{
      const total = Number(it.qty)*Number(it.pu)
      doc.text(String(it.desc||'-').slice(0,40),11,y)
      doc.text(String(it.qty),110,y)
      doc.text(String(it.pu),130,y)
      doc.text(String(it.tva)+"%",155,y)
      doc.text(String(total.toFixed(2)),170,y)
      y+=6; if(y>270){doc.addPage(); y=15}
    })
    y+=4; doc.setFontSize(10)
    doc.text(`Total HT: ${totals.ht.toFixed(2)} MAD`, 150, y); y+=6
    doc.text(`TVA: ${totals.tva.toFixed(2)} MAD`, 150, y); y+=6
    doc.setFontSize(12); doc.text(`TTC: ${totals.ttc.toFixed(2)} MAD`, 150, y); y+=8
    doc.setFontSize(9); doc.text(`Notes: ${notes}`, 10, y)
    doc.save(`${meta.num}.pdf`)
  }

  return (
    <div className="container" style={{paddingTop:18}}>
      <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
        <h2>فاتورتي - {docType}</h2>
        <select value={docType} onChange={e=>setDocType(e.target.value)} style={{width:'auto'}}>
          <option>فاتورة</option><option>Devis</option><option>Bon de livraison</option>
        </select>
        <span className="badge">يعمل 100% بدون أنترنيت بعد التحميل</span>
      </div>

      <div className="grid2" style={{marginTop:14}}>
        <div className="card">
          <h3>معلومات شركتك</h3>
          <div style={{display:'grid',gap:8,marginTop:8}}>
            <input value={company.name} onChange={e=>setCompany({...company,name:e.target.value})} placeholder="اسم الشركة"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}><input value={company.ice} onChange={e=>setCompany({...company,ice:e.target.value})} placeholder="ICE"/><input value={company.rc} onChange={e=>setCompany({...company,rc:e.target.value})} placeholder="RC"/><input value={company.if} onChange={e=>setCompany({...company,if:e.target.value})} placeholder="IF"/></div>
            <input value={company.addr} onChange={e=>setCompany({...company,addr:e.target.value})} placeholder="العنوان"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><input value={company.phone} onChange={e=>setCompany({...company,phone:e.target.value})} placeholder="هاتف"/><input value={company.email} onChange={e=>setCompany({...company,email:e.target.value})} placeholder="إيميل"/></div>
            <button className="btn btn-dark" onClick={saveCompany}>حفظ معلوماتي</button>
          </div>
        </div>
        <div className="card">
          <h3>معلومات الزبون + الوثيقة</h3>
          <div style={{display:'grid',gap:8,marginTop:8}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><input value={meta.num} onChange={e=>setMeta({...meta,num:e.target.value})} placeholder="رقم الفاتورة"/><input type="date" value={meta.date} onChange={e=>setMeta({...meta,date:e.target.value})}/></div>
            <input type="date" value={meta.echeance} onChange={e=>setMeta({...meta,echeance:e.target.value})} placeholder="تاريخ الاستحقاق"/>
            <input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder="اسم الزبون"/>
            <input value={client.ice} onChange={e=>setClient({...client,ice:e.target.value})} placeholder="ICE الزبون"/>
            <input value={client.addr} onChange={e=>setClient({...client,addr:e.target.value})} placeholder="عنوان الزبون"/>
            <input value={client.phone} onChange={e=>setClient({...client,phone:e.target.value})} placeholder="هاتف الزبون"/>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3>المنتجات / الخدمات</h3><button className="btn btn-primary" onClick={addItem}>+ إضافة سطر</button>
        </div>
        <div style={{overflowX:'auto',marginTop:10}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{background:'#f1f5f9'}}><th style={{padding:8,textAlign:'right'}}>البيان</th><th>الكمية</th><th>الثمن HT</th><th>TVA %</th><th>المجموع</th><th></th></tr></thead>
            <tbody>
              {items.map(it=>(
                <tr key={it.id} style={{borderTop:'1px solid #e2e8f0'}}>
                  <td style={{padding:6}}><input value={it.desc} onChange={e=>upd(it.id,'desc',e.target.value)} placeholder="البيان"/></td>
                  <td style={{padding:6}}><input type="number" value={it.qty} onChange={e=>upd(it.id,'qty',e.target.value)} style={{width:70}}/></td>
                  <td style={{padding:6}}><input type="number" value={it.pu} onChange={e=>upd(it.id,'pu',e.target.value)} style={{width:100}}/></td>
                  <td style={{padding:6}}><input type="number" value={it.tva} onChange={e=>upd(it.id,'tva',e.target.value)} style={{width:70}}/></td>
                  <td style={{padding:6,whiteSpace:'nowrap'}}>{(Number(it.qty)*Number(it.pu)).toFixed(2)} MAD</td>
                  <td style={{padding:6}}><button onClick={()=>del(it.id)} className="btn btn-outline" style={{padding:'6px 10px'}}>حذف</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:'grid',gap:6,marginTop:14,maxWidth:320,marginInlineStart:'auto',background:'#f8fafc',padding:12,borderRadius:12}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Total HT</span><b>{totals.ht.toFixed(2)} MAD</b></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>TVA</span><b>{totals.tva.toFixed(2)} MAD</b></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:18}}><span>TTC</span><b style={{color:'#0ea5e9'}}>{totals.ttc.toFixed(2)} MAD</b></div>
        </div>
        <div style={{marginTop:12}}>
          <label>ملاحظات</label>
          <textarea rows={2} value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>
        <div style={{display:'flex',gap:10,marginTop:12,flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={exportPDF}>تحميل PDF {getSub().plan==='free' && !canUseFree() ? '(مقفل)' : ''}</button>
          <button className="btn btn-outline" onClick={()=>window.print()}>طباعة</button>
          <a href="/pricing" className="btn btn-dark">الترقية لـ Pro</a>
          <span className="badge">المجاني: 5 وثائق • Pro: غير محدود • استعملت {getSub().count||0}/5</span>
        </div>
      </div>

      <div className="card" style={{marginTop:14,background:'linear-gradient(135deg,#eef2ff,#faf5ff)',borderColor:'#c7d2fe'}}>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <span className="badge badge-gold">عرض احترافي</span>
          <b style={{color:'#1e3a8a'}}>Khadamat ARRAKHAE - موثوق من المقاول الذاتي</b>
        </div>
        <div style={{color:'#334155',marginTop:6,lineHeight:1.8}}>
          جرّب مجاناً خمس وثائق مجانية بلا التزام • <b>Pro 99 درهم/شهر</b> للفواتير والـ Devis و Bon de livraison غير المحدودة • حفظ تلقائي للزبناء والفواتير • دعم واتساب في أقل من ساعة • <a href="/pricing" style={{color:'#7c3aed',fontWeight:800}}>شاهد كل الباقات →</a>
        </div>
      </div>

    </div>
  )
}
