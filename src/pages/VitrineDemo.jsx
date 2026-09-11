export default function VitrineDemo(){
  const WA="212629277841"
  return (
    <div style={{background:'white'}}>
      {/* Demo banner */}
      <div style={{background:'#1e3a8a',color:'white',textAlign:'center',padding:'6px 10px',fontSize:13}}>
        Demo موقع Vitrine - نموذج لعرضه على الزبائن • هذا مثال لنجار في مراكش - يمكن تغييره لأي مهنة
      </div>
      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#7c3aed 100%)',color:'white',padding:'40px 0'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:20,alignItems:'center'}}>
          <div>
            <span style={{background:'rgba(255,255,255,0.15)',padding:'6px 12px',borderRadius:999,fontSize:13,border:'1px solid rgba(255,255,255,0.3)'}}>مراكش • منذ 2015 • تقييم 4.9/5 ⭐⭐⭐⭐⭐</span>
            <h1 style={{fontSize:38,marginTop:12,lineHeight:1.2}}>نجارة عصرية <span style={{color:'#fde68a'}}>مراكش</span></h1>
            <p style={{opacity:0.9,marginTop:8,fontSize:17}}>أبواب، مطابخ، غرف نوم - تصميم وتركيب في 48 ساعة - ضمان 2 سنوات - معاينة مجانية</p>
            <div style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap'}}>
              <a href={`https://wa.me/${WA}?text=السلام، أريد عرض سعر نجارة`} target="_blank" className="btn" style={{background:'#25D366',color:'white'}}>واتساب - عرض سعر مجاني</a>
              <a href="tel:0600000000" className="btn btn-outline" style={{background:'white',color:'#1e3a8a'}}>📞 06 00 00 00 00</a>
            </div>
            <div style={{display:'flex',gap:16,marginTop:14,fontSize:13,opacity:0.9,flexWrap:'wrap'}}>
              <span>✓ يظهر في Google "نجار مراكش"</span><span>✓ سريع ⚡</span><span>✓ زر اتصال ثابت</span>
            </div>
          </div>
          <div className="card" style={{padding:0,overflow:'hidden'}}>
            <div style={{height:220, background:'linear-gradient(135deg,#fef3c7,#fde68a)',display:'flex',alignItems:'center',justifyContent:'center',color:'#92400e',fontWeight:800, fontSize:18}}>📸 صورة أعمال النجار</div>
            <div style={{padding:12, display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,textAlign:'center',fontSize:12}}>
              <div><b>+850</b><div style={{color:'#64748b'}}>مشروع</div></div>
              <div><b>4.9/5</b><div style={{color:'#64748b'}}>تقييم</div></div>
              <div><b>48ساعة</b><div style={{color:'#64748b'}}>تسليم</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:18}}>
        <h2 style={{color:'#1e3a8a'}}>خدماتنا</h2>
        <div className="grid3" style={{marginTop:12}}>
          <div className="card"><h3>🚪 أبواب خشبية</h3><p style={{color:'#64748b',fontSize:13}}>أبواب داخلية وخارجية، عازلة للصوت، بتصاميم عصرية.</p></div>
          <div className="card"><h3>🍳 مطابخ عصرية</h3><p style={{color:'#64748b',fontSize:13}}>مطابخ MDF وخشب طبيعي، قياس وتركيب مجاني.</p></div>
          <div className="card"><h3>🛏️ غرف نوم</h3><p style={{color:'#64748b',fontSize:13}}>غرف نوم كاملة، خزانات حائطية، تفصيل حسب الطلب.</p></div>
        </div>

        <h2 style={{marginTop:18,color:'#1e3a8a'}}>أعمالنا - معرض صور</h2>
        <div className="grid3" style={{marginTop:10}}>
          {[1,2,3].map(i=>(
            <div key={i} className="card" style={{padding:0,overflow:'hidden'}}>
              <div style={{height:140, background:`linear-gradient(135deg,${i===1?'#e0e7ff,#ede9fe':i===2?'#fef3c7,#fde68a':'#dcfce7,#f0fdf4'})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800, color:'#334155'}}>صورة {i}</div>
              <div style={{padding:10}}><b>مشروع {i} - فيلا مراكش</b><div style={{color:'#64748b',fontSize:12}}>تم التسليم في 3 أيام - رضا 100%</div></div>
            </div>
          ))}
        </div>

        <div className="card" style={{marginTop:16, background:'linear-gradient(135deg,#eef2ff,#faf5ff)',borderColor:'#c7d2fe'}}>
          <h3>⭐ ماذا يقول زبائننا (Google Reviews)</h3>
          <div style={{display:'grid',gap:8,marginTop:8,fontSize:13,color:'#334155'}}>
            <div style={{background:'white',padding:10,borderRadius:10}}>⭐⭐⭐⭐⭐ "خدمة ممتازة وسريعة، أنصح به" - أحمد، مراكش</div>
            <div style={{background:'white',padding:10,borderRadius:10}}>⭐⭐⭐⭐⭐ "ثمن مناسب وجودة عالية" - فاطمة، مراكش</div>
          </div>
        </div>

        <div className="grid2" style={{marginTop:16}}>
          <div className="card">
            <h3>اتصل بنا - نرد في 10 دقائق</h3>
            <p style={{color:'#64748b',fontSize:13}}>العنوان: شارع محمد الخامس، مراكش - قرب محطة القطار</p>
            <div style={{height:120, background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b',marginTop:8}}>🗺️ خريطة Google Maps (نربطها لك)</div>
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <a href={`https://wa.me/${WA}`} target="_blank" className="btn btn-primary" style={{flex:1,textAlign:'center'}}>واتساب</a>
              <a href="tel:0600000000" className="btn btn-dark" style={{flex:1,textAlign:'center'}}>اتصال</a>
            </div>
          </div>
          <div className="card" style={{background:'#1e3a8a',color:'white'}}>
            <h3 style={{color:'#fde68a'}}>لماذا هذا الموقع يجيب اتصالات؟</h3>
            <ul style={{lineHeight:1.9, fontSize:13, opacity:0.95}}>
              <li>✓ عنوان SEO: "نجار مراكش - أبواب ومطابخ" → يظهر أولاً</li>
              <li>✓ سرعة ⚡ + متجاوب هاتف → Google يرفعه</li>
              <li>✓ زر واتساب ثابت + فورم → الزائر يتصل في ثانية</li>
              <li>✓ مربوط بـ Google Business + Maps</li>
            </ul>
            <div style={{marginTop:10, background:'white',color:'#1e3a8a',padding:8,borderRadius:10,textAlign:'center',fontWeight:800,fontSize:13}}>هذا ما أسلمك بـ 1500 درهم</div>
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:16}}>
          <a href={`https://wa.me/${WA}?text=أريد موقع Vitrine مثل Demo النجار`} target="_blank" className="btn btn-primary">أريد موقع مثل هذا لمهنتي</a>
          <div style={{color:'#64748b',fontSize:12,marginTop:6}}>نغير الصور والنصوص لمهنتك: محامي، طبيب، مقاول، مطعم...</div>
        </div>

      </div>
    </div>
  )
}
