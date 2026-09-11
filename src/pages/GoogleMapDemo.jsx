export default function GoogleMapDemo(){
  const WHATSAPP = "212629277841"
  const wa = (msg)=> `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
  const onSubmit = (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    const msg = `طلب Google Map جديد: ${data.get('name')} - ${data.get('phone')} - النشاط: ${data.get('biz')} - المدينة: ${data.get('city')}`
    window.open(wa(msg),'_blank')
  }
  return (
    <div className="container" style={{paddingTop:20}}>
      <span className="badge">جديد - عن بعد 100% بدون خروج</span>
      <h2 style={{marginTop:8}}>حساب Google Map لمحلك - يبان في البحث ويجيب اتصالات</h2>
      <p style={{color:'#64748b'}}>ننشئ لك حساب Google Business كامل: الاسم، العنوان على الخريطة، الهاتف، ساعات العمل، الصور، وزر واتساب. التسليم في 48 ساعة عبر واتساب فقط.</p>
      <div className="grid2" style={{marginTop:16}}>
        <div className="card">
          <h3>شنو كتستلم بـ 200 درهم؟</h3>
          <ul style={{marginTop:10,color:'#334155',lineHeight:2}}>
            <li>✓ إنشاء / إصلاح حساب Google Business</li>
            <li>✓ العنوان على الخريطة + الهاتف + ساعات العمل</li>
            <li>✓ 10 صور مرتبة + وصف بالعربية والفرنسية</li>
            <li>✓ زر اتصال وواتساب وطريق للمحل</li>
            <li>✓ شرح فيديو 5 دقائق كيفاش تجاوب على التقييمات</li>
          </ul>
          <div className="price" style={{marginTop:10}}>200 درهم <span style={{fontSize:13,color:'#64748b'}}>دفعة واحدة</span></div>
          <a href={wa('أريد حساب Google Map لمحلي - 200 درهم')} target="_blank" className="btn btn-primary" style={{display:'block',textAlign:'center',marginTop:10}}>اطلب عبر واتساب</a>
        </div>
        <form onSubmit={onSubmit} className="card" style={{display:'grid',gap:10}}>
          <h3>اطلب الآن - نرد في أقل من ساعة</h3>
          <input name="name" placeholder="اسمك" required/>
          <input name="phone" placeholder="واتساب / هاتف" required/>
          <input name="biz" placeholder="نوع النشاط (قهوة، حلاقة، محل...)" required/>
          <input name="city" placeholder="المدينة" required/>
          <button className="btn btn-dark" type="submit">إرسال الطلب واتساب</button>
          <p style={{color:'#64748b',fontSize:12}}>الدفع بعد التسليم عبر Wafacash / تحويل - نرسل لك المعاينة أولا.</p>
        </form>
      </div>
    </div>
  )
}
