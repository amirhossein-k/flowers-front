import React from 'react'
import './detail.css'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import pony from '../../../pony.jpg'
import headerp from '../../../header-asl.jpg'
const Detail = ({targetProduct}) => {
  // console.log(targetProduct,'targetProduct')
  return (
    <div className='row detail-container' dir='rtl'>
      <div className='col-12 col-sm-6 '>
      <AwesomeSlider>
      {targetProduct &&  targetProduct ? targetProduct.pic.map((item,index)=>{
        return <div><img src={item}/></div>
      }) : (<div><img src={pony}/></div>)}

    {/* <div><img src={targetProduct.pic}/></div> */}
    {/* <div><img src={headerp}/></div> */}
    {/* <div><img src={pony}/></div>
    <div><img src={headerp}/></div> */}
    
  </AwesomeSlider>

      </div>
      {targetProduct &&(

      <div className='col-12 col-sm-6' key={targetProduct._id} >
        <div className='table-container'>
          <div className='row'>
            <div className='col-12 col-lg-4'>
              <div className='box'>
                <p>طول</p>
                <p>{targetProduct?.detail[0].length}</p>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
            <div className='box'>
                <p>عرض</p>
                <p>{targetProduct?.detail[0].width}</p>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='box'>
                  <p>ارتفاع</p>
                  <p>{targetProduct?.detail[0].height}</p>
                </div>
            </div>
            <div className='col-12 '>
              <div className='box'>
                  <p>توضیحات تکمیلی</p>
                  <p>حمل این محصول به سراسر تهران رایگان می‌باشد.

                 {/* <span>{targetProduct?.describrtion?.map((item,index)=>{
                    switch(item.type){
                        case 'a':
                          return <a>{item.body}</a>
                        case 'p':
                          return <p>{item.body}</p>
                        default:
                          return 'aaa'
                    }
                  
                 })}</span> */}


                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Detail