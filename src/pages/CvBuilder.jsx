import { useState, useMemo } from 'react'
import jsPDF from 'jspdf'
import { getSub, incCount, canUseFree } from '../lib/subscription.js'

const presets = {
  ar: { name:'احمد المحمدي', title:'محاسب - مسير مقاولة', city:'الدار البيضاء', summary:'محترف بخبرة 10 سنوات في المحاسبة وتسيير المقاولات.' },
  fr: { name:'AHMED EL MOHAMADI', title:'Comptable - Gestionnaire', city:'Casablanca', summary:'Professionnel avec 10 ans d\'experience en comptabilite et gestion d\'entreprise.' },
  en: { name:'AHMED EL MOHAMADI', title:'Accountant - Manager', city:'Casablanca', summary:'Professional with 10 years experience in accounting and business management.' },
  ca: { name:'AHMED EL MOHAMADI', title:'Accountant | Financial Analyst', city:'Montreal, QC', summary:'CPA candidate with 10+ years in accounting, seeking opportunity in Canada. Eligible for work permit.' },
}

export default function CvBuilder(){
  const [cvLang,setCvLang]=useState(()=> localStorage.getItem('cv_lang')||'ar')
  const [data,setData]=useState(()=> JSON.parse(localStorage.getItem('cv_data')||'null') || {
    name: presets[localStorage.getItem('cv_lang')||'ar'].name,
    title: presets[localStorage.getItem('cv_lang')||'ar'].title,
    phone:'06 12 34 56 78', email:'mohamed@email.com', city: presets[localStorage.getItem('cv_lang')||'ar'].city,
    summary: presets[localStorage.getItem('cv_lang')||'ar'].summary,
    exps:[{id:1,poste: cvLang==='ar' ? 'محاسب' : cvLang==='fr' ? 'Comptable' : 'Accountant', company:'STE ANNOUAR', dates:'2018 - 2024',desc: cvLang==='ar' ? 'تسيير الفوترة والمحاسبة' : 'Financial reporting & invoicing'}],
    edus:[{id:1,diplome: cvLang==='ar' ? 'إجازة في الاقتصاد' : 'Licence en Economie', ecole:'Universite Hassan II', dates:'2014 - 2017'}],
    skills:'Excel, Sage, Facturation, Gestion',
    langs: cvLang==='ar' ? 'عربية (أم) - فرنسية (جيد) - إنجليزية (متوسط)' : 'Francais (natif) - Anglais (intermediaire)'
  })
  const [tpl,setTpl]=useState(()=> localStorage.getItem('cv_tpl')||'modern')

  const switchLang=(l)=>{
    setCvLang(l); localStorage.setItem('cv_lang',l)
    // keep data but update placeholders
  }

  const save=()=>{ localStorage.setItem('cv_data', JSON.stringify(data)); localStorage.setItem('cv_tpl',tpl); alert(cvLang==='ar'?'تم الحفظ':'Enregistre / Saved') }
  const addExp=()=> setData({...data, exps:[...data.exps,{id:Date.now(),poste:'',company:'',dates:'',desc:''}]})
  const addEdu=()=> setData({...data, edus:[...data.edus,{id:Date.now(),diplome:'',ecole:'',dates:''}]})
  const exportPDF=()=>{
    const sub=getSub()
    if(!canUseFree()){ alert('انتهت وثائقك الخمس المجانية. اشترك في Pro للمتابعة.'); location.href='/pricing'; return }
    if(sub.plan==='free') incCount()
    const doc = new jsPDF({unit:'mm',format:'a4'})
    let y=12
    const isCA = tpl==='canadian'
    doc.setFontSize(isCA?14:16); doc.text(data.name, 10, y); y+=6
    doc.setFontSize(10); doc.setTextColor(80,80,80); doc.text(data.title,10,y); y+=4
    doc.text(`${data.phone} | ${data.email} | ${data.city}`,10,y); y+=6
    if(isCA){ doc.setFontSize(8); doc.setTextColor(120,120,120); doc.text('No photo • No age • No marital status - Canadian ATS compliant',10,y); y+=4 }
    doc.setTextColor(0,0,0); doc.setFontSize(11); doc.text(cvLang==='ar'?'الملخص المهني:': cvLang==='fr'?'Profil:':'Professional Summary:',10,y); y+=5
    doc.setFontSize(9); doc.text(doc.splitTextToSize(data.summary, 190),10,y); y+= doc.splitTextToSize(data.summary,190).length*5 +2
    doc.setFontSize(11); doc.text(cvLang==='ar'?'الخبرات:': cvLang==='fr'?'Experiences:':'Work Experience:',10,y); y+=5
    data.exps.forEach(e=>{ doc.setFontSize(9); doc.text(`${e.poste} - ${e.company} (${e.dates})`,10,y); y+=4; doc.text(doc.splitTextToSize(e.desc,190),10,y); y+=6; if(y>270){doc.addPage(); y=12}})
    doc.setFontSize(11); doc.text(cvLang==='ar'?'التعليم:':'Formation / Education:',10,y); y+=5
    data.edus.forEach(e=>{ doc.setFontSize(9); doc.text(`${e.diplome} - ${e.ecole} (${e.dates})`,10,y); y+=5})
    y+=2; doc.text(`${cvLang==='ar'?'المهارات':'Competences / Skills'}: ${data.skills}`,10,y); y+=5; doc.text(`${cvLang==='ar'?'اللغات':'Langues / Languages'}: ${data.langs}`,10,y)
    doc.save(`CV_${cvLang}_${data.name.replace(/\s+/g,'_')}.pdf`)
  }

  const previewStyle = useMemo(()=>{
    if(tpl==='canadian') return {header:{background:'#ffffff',color:'#1e3a8a',padding:16,borderBottom:'3px solid #1e3a8a',borderTop:'4px solid #c1121f'}, body:{padding:16}}
    if(tpl==='classic') return {header:{background:'#0f172a',color:'white',padding:16}, body:{padding:16}}
    if(tpl==='minimal') return {header:{background:'#f8fafc',color:'#0f172a',borderBottom:'3px solid #1e3a8a',padding:16}, body:{padding:16}}
    return {header:{background:'#1e3a8a',color:'white',padding:16}, body:{padding:16}}
  },[tpl])

  const labels = {
    ar:{ personal:"المعلومات الشخصية", exps:"الخبرات", edu:"التعليم", skills:"المهارات واللغات", preview:"معاينة مباشرة", name:"الاسم الكامل", title:"المسمى الوظيفي" },
    fr:{ personal:"Informations personnelles", exps:"Expériences", edu:"Formation", skills:"Compétences & Langues", preview:"Aperçu", name:"Nom complet", title:"Titre professionnel" },
    en:{ personal:"Personal Info", exps:"Experience", edu:"Education", skills:"Skills & Languages", preview:"Preview", name:"Full name", title:"Professional title" },
    ca:{ personal:"Personal Info (Canadian)", exps:"Work Experience", edu:"Education", skills:"Skills & Languages", preview:"Canadian ATS Preview", name:"Full name", title:"Professional title" },
  }[cvLang] || {personal:"المعلومات", exps:"الخبرات"}

  const isCA = tpl==='canadian'

  return (
    <div className="container" style={{paddingTop:16}}>
      <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
        <h2>مولد السيرة الذاتية</h2>
        <div style={{display:'flex',gap:4,border:'1px solid #c7d2fe',borderRadius:999,padding:3,background:'white'}}>
          <button onClick={()=>switchLang('ar')} className={cvLang==='ar'?'btn btn-primary':'btn'} style={{padding:'6px 10px',borderRadius:999}}>AR</button>
          <button onClick={()=>switchLang('fr')} className={cvLang==='fr'?'btn btn-primary':'btn'} style={{padding:'6px 10px',borderRadius:999}}>FR</button>
          <button onClick={()=>switchLang('en')} className={cvLang==='en'?'btn btn-primary':'btn'} style={{padding:'6px 10px',borderRadius:999}}>EN</button>
          <button onClick={()=>switchLang('ca')} className={cvLang==='ca'?'btn btn-primary':'btn'} style={{padding:'6px 10px',borderRadius:999}}>CA 🇨🇦</button>
        </div>
        <select value={tpl} onChange={e=>setTpl(e.target.value)} style={{width:'auto'}}>
          <option value="modern">عصري أزرق</option>
          <option value="classic">كلاسيكي أسود</option>
          <option value="minimal">هادئ</option>
          <option value="canadian">كندي ATS 🇨🇦</option>
        </select>
        <span className="badge">5 قوالب • AR/FR/EN/CA • PDF</span>
      </div>
      {isCA && <div className="card" style={{marginTop:10,background:'#fff7ed',borderColor:'#fde68a',color:'#92400e',fontSize:13}}>🇨🇦 الطريقة الكندية: بدون صورة، بدون عمر/حالة عائلية، صفحة واحدة، كلمات مفتاحية ATS، تاريخ بصيغة YYYY-MM</div>}

      <div className="grid2" style={{marginTop:14,alignItems:'start'}}>
        <div style={{display:'grid',gap:12}}>
          <div className="card">
            <h3>{labels.personal}</h3>
            <div style={{display:'grid',gap:8,marginTop:8}}>
              <input value={data.name} onChange={e=>setData({...data,name:e.target.value})} placeholder={labels.name}/>
              <input value={data.title} onChange={e=>setData({...data,title:e.target.value})} placeholder={labels.title}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><input value={data.phone} onChange={e=>setData({...data,phone:e.target.value})} placeholder="Phone / Téléphone"/><input value={data.email} onChange={e=>setData({...data,email:e.target.value})} placeholder="Email"/></div>
              <input value={data.city} onChange={e=>setData({...data,city:e.target.value})} placeholder={cvLang==='ar'?'المدينة':'Ville / City'}/>
              <textarea rows={3} value={data.summary} onChange={e=>setData({...data,summary:e.target.value})} placeholder={cvLang==='ar'?'نبذة مختصرة':'Résumé / Summary'}/>
            </div>
          </div>

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}><h3>{labels.exps}</h3><button className="btn btn-primary" style={{padding:'6px 10px'}} onClick={addExp}>+ إضافة</button></div>
            {data.exps.map((ex,i)=>(
              <div key={ex.id} style={{borderTop:'1px solid #e2e8f0',paddingTop:8,marginTop:8,display:'grid',gap:6}}>
                <input value={ex.poste} onChange={e=>{const a=[...data.exps]; a[i].poste=e.target.value; setData({...data,exps:a})}} placeholder={cvLang==='ar'?'المنصب':'Poste / Position'}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}><input value={ex.company} onChange={e=>{const a=[...data.exps]; a[i].company=e.target.value; setData({...data,exps:a})}} placeholder="Entreprise / Company"/><input value={ex.dates} onChange={e=>{const a=[...data.exps]; a[i].dates=e.target.value; setData({...data,exps:a})}} placeholder={isCA?'2022-01 - 2024-12':'Dates'}/></div>
                <textarea rows={2} value={ex.desc} onChange={e=>{const a=[...data.exps]; a[i].desc=e.target.value; setData({...data,exps:a})}} placeholder={cvLang==='ar'?'الوصف':'Description'}/>
                <button className="btn btn-outline" style={{padding:'4px 8px'}} onClick={()=> setData({...data, exps: data.exps.filter(x=>x.id!==ex.id)})}>حذف</button>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}><h3>{labels.edu}</h3><button className="btn btn-primary" style={{padding:'6px 10px'}} onClick={addEdu}>+ إضافة</button></div>
            {data.edus.map((ed,i)=>(
              <div key={ed.id} style={{borderTop:'1px solid #e2e8f0',paddingTop:8,marginTop:8,display:'grid',gap:6}}>
                <input value={ed.diplome} onChange={e=>{const a=[...data.edus]; a[i].diplome=e.target.value; setData({...data,edus:a})}} placeholder={cvLang==='ar'?'الشهادة':'Diplôme / Degree'}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}><input value={ed.ecole} onChange={e=>{const a=[...data.edus]; a[i].ecole=e.target.value; setData({...data,edus:a})}} placeholder="École / School"/><input value={ed.dates} onChange={e=>{const a=[...data.edus]; a[i].dates=e.target.value; setData({...data,edus:a})}} placeholder="Dates"/></div>
                <button className="btn btn-outline" style={{padding:'4px 8px'}} onClick={()=> setData({...data, edus: data.edus.filter(x=>x.id!==ed.id)})}>حذف</button>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>{labels.skills}</h3>
            <input value={data.skills} onChange={e=>setData({...data,skills:e.target.value})} placeholder="Excel, Sage..."/>
            <input value={data.langs} onChange={e=>setData({...data,langs:e.target.value})} placeholder="Langues / Languages" style={{marginTop:8}}/>
            <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
              <button className="btn btn-dark" onClick={save}>حفظ / Save</button>
              <button className="btn btn-primary" onClick={exportPDF}>تحميل PDF ({cvLang.toUpperCase()})</button>
              <button className="btn btn-outline" onClick={()=>window.print()}>طباعة</button>
            </div>
          </div>
        </div>

        <div className="card" style={{padding:0,overflow:'hidden',position:'sticky',top:70}}>
          <div style={previewStyle.header}>
            <div style={{fontSize:isCA?18:22,fontWeight:900}}>{data.name}</div>
            <div style={{opacity:0.9, fontSize:isCA?12:14}}>{data.title}</div>
            <div style={{fontSize:12,marginTop:6}}>{data.phone} • {data.email} • {data.city}</div>
            {isCA && <div style={{fontSize:10,marginTop:4,color:'#c1121f',fontWeight:700}}>No photo • No DOB • ATS Friendly • Canada</div>}
          </div>
          <div style={previewStyle.body}>
            <h4 style={{borderBottom:'2px solid #1e3a8a',paddingBottom:4, fontSize:13}}>{cvLang==='ar'?'نبذة': cvLang==='fr'?'Profil':'Summary'}</h4><p style={{color:'#334155',fontSize:13,marginTop:6}}>{data.summary}</p>
            <h4 style={{borderBottom:'2px solid #1e3a8a',paddingBottom:4,marginTop:12, fontSize:13}}>{cvLang==='ar'?'الخبرات': cvLang==='fr'?'Expériences':'Experience'}</h4>
            {data.exps.map(e=>(
              <div key={e.id} style={{marginTop:8}}><b style={{fontSize:13}}>{e.poste} - {e.company}</b><div style={{color:'#64748b',fontSize:12}}>{e.dates}</div><div style={{fontSize:13}}>{e.desc}</div></div>
            ))}
            <h4 style={{borderBottom:'2px solid #1e3a8a',paddingBottom:4,marginTop:12, fontSize:13}}>{cvLang==='ar'?'التعليم': cvLang==='fr'?'Formation':'Education'}</h4>
            {data.edus.map(e=>(
              <div key={e.id} style={{marginTop:6}}><b style={{fontSize:13}}>{e.diplome}</b><div style={{fontSize:13}}>{e.ecole} • {e.dates}</div></div>
            ))}
            <h4 style={{borderBottom:'2px solid #1e3a8a',paddingBottom:4,marginTop:12, fontSize:13}}>{cvLang==='ar'?'المهارات':'Skills'}</h4><div style={{fontSize:13}}>{data.skills}</div>
            <h4 style={{borderBottom:'2px solid #1e3a8a',paddingBottom:4,marginTop:8, fontSize:13}}>{cvLang==='ar'?'اللغات':'Languages'}</h4><div style={{fontSize:13}}>{data.langs}</div>
          </div>
          <div style={{padding:12,background:'#f8fafc',textAlign:'center',color:'#64748b',fontSize:12}}>معاينة {cvLang.toUpperCase()} - {tpl}</div>
        </div>
      </div>
    </div>
  )
}
