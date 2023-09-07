import React from 'react'
import './describtaion.css'
const Describtaion = ({targetProduct}) => {
  return (
    <div className='describtion-container row' dir="rtl">
        {/* <p>
        گلدان آپارتمانی لیندا
لیندا گیاهی فوق مقاوم با نگهداری فوق آسان و همیشه سبز است. این گیاه مقاوم به هیج‌وجه مرگ ندارد!آفرینش این گیاه برای خوشحالی افراد پرمشغله اما گیاه دوست است. این گیاه مناسب فضاهای کوچک، اداره‌جات و افراد کم زمان است. گیاه لیندا سازگاری خوبی با هر نوع شرایطی دارد و نگهداری خاصی احتیاج ندارد. این گیاه برای کارمندان و افراد دائم سفر تنها گزینۀ مناسب است.

این گیاه به هیچ وجه شما را تنها نمی‌گذارد. با خریدگل آپارتمانی لیندا دیگر غم از دست دادن گل‌ خود را به دلیل کمبود زمان نداشته باشید.
        </p> */}
        
        {
          targetProduct && targetProduct?.describrtion.map((item,index)=>{
            switch(item.type){
              case 'a':
                return <div className='col-12' key={index}><a>{item.body}</a></div> 
              case 'p':
                return <div className='col-12' key={index}><p>{item.body}</p></div>
              case 'img':
                return <div className='col-12' key={index} style={{display:'flex',justifyContent: 'center'}}><img src={item.body} style={{    width: '400px'}}/> </div>
              default:
                return ''
          }
          })
        }
        

    </div>
  )
}

export default Describtaion