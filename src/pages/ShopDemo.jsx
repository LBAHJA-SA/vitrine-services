export default function ShopDemo(){
  const WA="212629277841"
  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Demo متجر إلكتروني جاهز</h2>
      <p style={{color:'#64748b'}}>متجر YouCan/Shopify كامل: منتجات، سلة، دفع عند التسليم، توصيل - جاهز في 48 ساعة.</p>
      <div className="grid2" style={{marginTop:14}}>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{height:160,background:'linear-gradient(135deg,#fef3c7,#fde68a)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>🛒 صورة متجر - منتجات</div>
          <div style={{padding:12}}>
            <h3>متجر "لباس مراكش"</h3><div style={{color:'#64748b',fontSize:13}}>15 منتج • دفع عند التسليم + MoPay</div>
            <div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}><span className="badge">YouCan</span><span className="badge">توصيل لكل المغرب</span></div>
          </div>
        </div>
        <div className="card">
          <h3>ماذا أسلمك بـ 2500 درهم؟</h3>
          <ul style={{lineHeight:1.9,fontSize:13,color:'#334155'}}>
            <li>✓ متجر كامل + دومين + استضافة سنة</li><li>✓ 10 منتجات مدخلة + صور</li><li>✓ دفع عند التسليم + واتساب</li><li>✓ ربط مع شركة توصيل</li>
          </ul>
          <a href={`https://wa.me/${WA}?text=أريد متجر الكتروني مثل Demo`} target="_blank" className="btn btn-primary" style={{marginTop:10,display:'block',textAlign:'center'}}>اطلب متجرك</a>
        </div>
      </div>
    </div>
  )
}
