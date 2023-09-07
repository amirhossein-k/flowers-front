import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Register from '../../../pages/register/Register'
import './formbuy.css'
import styles from './formbuy.module.scss'
import '../../../pages/register/register.css'
import { Link, useLocation } from 'react-router-dom'
import SelectorInput from '../../selector/SelectorInput'
import { showToast } from '../../../actions/toastAction'
import { updateUser } from '../../../actions/userAction'
const FormBuy = () => {
  const dispatch = useDispatch()
  const Location = useLocation()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const [edite,setEdite]= useState(false)
  const [active,setActive]= useState(false)
  const [name,setName]= useState('')
  const [phone_number,setPhone_Number]= useState('')
  const [family,setFamily]= useState('')
  const [fullName,setFullName]= useState('')
  const [location,setLocation]= useState('')
  const [more,setMore]= useState('')
  const [time,setTime]= useState(Object)
  const [options,setOptions] = useState([])
  const [city,setCity]= useState('')
  const [state,setState]= useState('')
  const [Data,setData] = useState(null)
  const [options2,setOptions2] = useState([])
  const citylist = useSelector(state=>state.city)
  const {cityList} = citylist


  const [total_Price,setTotal_Price] = useState('')
  const [productListTarget,setProductListTarget] = useState([])

 
 
  // console.log(target,'ppp')
  useEffect(() => {
    if(userInfo){
  
     setFamily(userInfo.detail[0].family)
     setName(userInfo.name)
     setPhone_Number(userInfo.detail[0].phone_number)
     setLocation(userInfo.detail[0].address.location)
     setCity(userInfo.detail[0].address?.city)
     setState(userInfo.detail[0].address?.state)

    }
 }, [userInfo])
 
 const handlerCity =(value)=>{
  setCity(value)
  const targetState = Data.state.filter(item=>item.id=== value)
  console.log(targetState,'targetState')
  setOptions2(targetState[0].state)
 
}
const handlerState =(value)=>{
  setState(value)
 
}


  // const [finalCart, setFinalCart] = useState([
  //   {title:'1سبد گل',count:2,price:2100,id:1},
  //   {title:'2سبد گل',count:2,price:2100,id:2},
  //   {title:'3سبد گل',count:2,price:2100,id:3}
  // ]);
  const [calnderDay,setCalenderDay]= useState([
    {name_day:'دوشنبه',day:1,month:'اردیبهشت',year:1402,times:[{"time":'11-15'},{"time":'15-19'}],id:1},
    {name_day:'سه شنبه',day:2,month:'اردیبهشت',year:1402,times:[{"time":'11-15'},{"time":'15-19'}],id:2},
    {name_day:'چهارشنبه',day:3,month:'اردیبهشت',year:1402,times:[{"time":'11-15'},{"time":'15-19'}],id:3},
    {name_day:'پنج شنبه',day:4,month:'اردیبهشت',year:1402,times:[{"time":'11-15'},{"time":'15-19'}],id:4},
    {name_day:'جمعه',day:5,month:'اردیبهشت',year:1402,times:[{"time":'11-17'}],id:5},
  ])

  const [sendCart,setSendCart] = useState([]) 
  // const [total_price,setTotal_Price] = useState(0) 

  
useEffect(()=>{
  if(cityList){
   setData(cityList)
   setOptions(cityList.city)
  }
  
 },[])
  const handleChange =(e)=>{
  //   var total= 0
  //    finalCart.map(item=>{
  //    total += item.count * item.price
  // })
  //   total += Number(e.target.value)                 
  //   setTotal_Price(total)
  //   console.log(e.target.value)
  //   setSendCart(prevv=>{
  //     return {...prevv , id_final:finalCart.map(item=>item.id),title_final: finalCart.map(item=>item.title),final_price:total}
  //   })
  //   console.log(sendCart)
  }

  const calenderClick = (e,id)=>{
    e.preventDefault()
    setCalenderDay(prevv=>{
      return prevv.map(item=>{
        return {...item,active:false}
      })
    })
    setCalenderDay(prevv=>{
      return prevv.map(item=>{
        
        if(item.id === id){
          return {...item,active:true}
        }else{
          return {...item}
        }
      })
    })
  }
  const list = [
    {"title":"نام و نام خوانوادگی"},
    {"title":"استان"},
    {"title":"شهر"},
    {"title":'محل تحویل'},
    {"title":"تلفن همراه"},
    
  ]

  const submitHandler = ()=>{
    
  }
  var a 
  const timeHandeler =(e,id)=>{
  
   const targett = calnderDay.filter(item=>item.id===id)[0]

  const time = {"detail": targett,"hour": e.target.value}
  setTime(time)

}
const submitUpdate = async(e)=>{
  e.preventDefault();
// console.log(zipCode,'zip')
 const  address =  {"location":location,"city":city,"state":state}
 
  dispatch(updateUser(undefined,undefined,undefined,undefined,undefined,address))
  dispatch(showToast('اپدیت شد'))

  setTimeout(()=>{
    
    setEdite(false)
  },500)
  
}
console.log(sendCart,'sendCart')

  return (
    <div className='formbuy-container row' dir='rtl'>
      <div className='col-12 form-container'>
        <Form className='row form'>
          <div className='col-12 col-md-6'>
          {/* col 1 */}
            {/* سفارش دهنده */}
          {userInfo  ? (
            <>
              <div className='box-dahande row'>
                <span className='title'>اطلاعات سفارش دهنده</span>
                <div className={`${styles.formbuy_datail} row`}>
                <div className={`col-12  ${styles.edite} `} > <div className={`${edite ? styles.cancel : styles.normal}`}  onClick={e=>setEdite(!edite)}> {edite ? 'انصراف' : "ویرایش اطلاعات"}</div></div>
             {list.map(item=>{
              return(
                <div className='col-12 col-lg-8' key={item.title}>
                <div className='row w-100 '>

                  <div className='col-3 col-md-4'>{item.title}</div>
                  <div className='col-5 col-lg-4 col-md-4'>
                    <div className='row'>
                      <div className={`col-12 ${styles.item_child} ${!edite ? 'd-flex' : 'd-none'}`}> 
                        {(()=>{
                          switch(item.title){
                            case "نام و نام خوانوادگی":
                              return userInfo.name + userInfo.detail[0].family
                            case 'استان':
                              return userInfo.detail[0].address.city
                            case 'شهر':
                              return userInfo.detail[0].address.state
                            case 'محل تحویل':
                              return userInfo.detail[0].address.location
                            case "تلفن همراه":
                              return userInfo.detail[0].phone_number
                            default:
                              return ''
                          }
                        })()}
                       </div>
                       <div className={`col-12 ${styles.item_child} ${edite ? 'd-flex' : 'd-none'}`}>
                          {(()=>{
                             switch(item.title){
                              case "نام و نام خوانوادگی":
                                return <input className={`${styles.effect_19}`} type="text" placeholder="" value={name + family}  onChange={e=>setFullName(e.target.value)}/>
                              case "استان":
                                return <SelectorInput options={options} handler={handlerCity} />
                              case "شهر":
                                return <SelectorInput options={options2} handler={handlerState} />
                             
                              case 'محل تحویل':
                                return  <textarea 
                                className={`${styles.effect_19} w-100`}  value={location}  onChange={e=>setLocation(e.target.value)}
                                name="story"
                                        rows={2} >
                              
                                </textarea>
                              case "تلفن همراه":
                                return <input className={`${styles.effect_19}`} type="text" placeholder="" value={phone_number}  onChange={e=>setPhone_Number(e.target.value)}/>
                              default:
                                return ''
                            }
                          })()}
                                   
                          <label className={`${item.title=== 'استان' || item.title=== 'شهر' ? 'd-none' : 'd-block'}`}> {item.title}</label>
                           <span className={`${styles.focus_border}`}>
                               <i></i>
                            </span>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
              )
             })}
             
             </div>
             <div className={`row ${edite ? 'd-block': 'd-none'} `} >
                    <div className={`${styles.container_botton} justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-center m-md-3 m-3`}>
                        <button onClick={e=>submitUpdate(e)}>اپدیت </button>
                    </div>
              </div>
              
             

            </div>
          
           

            <div className='row box-girandeh'>
              <div className='col-12 col-md-9'>
                <div className='row w-100'>
                  <div className='col-3 col-xl-3 col-lg-4' style={{padding:" 8px 0"}}>توضیحات بیشتر</div>
                  <div className={`col-8 col-lg-7 ${styles.item_child}`}>
                    <textarea 
                    className={`${styles.effect_19} w-100`}  value={more}  onChange={e=>setMore(e.target.value)}
                    name="story"
                    rows={2} >
                                
                    </textarea>
                    <label> توضیحات بیشتر</label>
                           <span className={`${styles.focus_border}`}>
                               <i></i>
                            </span>
                  </div>
                </div>
              
              </div>
             
            </div>
            </>
          ) : (
            <div className={`row ${styles.contianer_register}`}>
              <div className={`col-12`}>لطفا برای انجام پرداخت وارد حساب کاربری خود شودید </div>
              <div className={`col-12`}>
              <Link  to={{
                pathname: '/register'
                }} state={{ title: false }}>ورود به حساب کاربری</Link>  
              </div>
              <div className={`col-12`}>
              <Link  to={{
                pathname: '/register'
                }} state={{ title: true }}>ساخت حساب کاربری</Link>  
              </div>
            </div>
          ) }
          
            

          </div>
          {/* col 2 */}
          <div className='col-12 col-md-6'>
            <div className='final_list row'>

              <div className='col-12 header'>
                <span>محصول</span>
                <span>قیمت کل</span>
              </div>

              <div className='detail_cart col-12'>
                {productListTarget.map((item,index)=>{
                  return (
                   <div className='detail_box' key={item.title}>
                    <span>{item.title} * {item.count}</span>
                    <span>{item.price}</span>
                    </div>
                  )
                })}
                <div className='total_1'>
                  <span>قیمت کل</span>
                  <span>
                    {(()=>{
                      var total= 0
                      productListTarget.map(item=>{
                          total += item.count * item.price
                      })
                      return total
                    })()}
                 </span>
                </div>

                <div className='transfer row'>
                  <div className='col-12 box_transfer'>
                    
                    <input className='d-block' type='radio' value='40' name='transfer'  onChange={(e)=>handleChange(e)}/> <span>ارسال پست معمولی</span>
                  </div>

                  <div className='col-12 box_transfer'>

                    <input className='d-block' type='radio' value='30' name='transfer'  onChange={(e)=>handleChange(e)}/> <span>ارسال با تیپاکس</span>
                  </div>
                </div>

                <div className='total_2'>
                <span>پرداختی شما</span>
                  
                   {total_Price===0 ? <span className='invalid'> یکی از گزینه های حمل نقل را انتخاب کنید</span> : <span>{total_Price}</span>}
                 
                    
                 
                </div>

              </div>
              {/* تقویم */}
              <div className='calender col-12'>
                <span className='title'>ساعت تحویل کالا را انتخاب کنید:</span>
                <div className='calender_box row'>
                  {calnderDay.map(item=>{
                    return(
                      <div className='col-lg-3 col-sm-4 col-4' key={item.id} onClick={e=>calenderClick(e,item.id)}>
                        <div className={`${item.active === true ?'box active' : 'box'}`}>
                          <span className='day'>{item.name_day}</span>
                          <div className='total'>
                          <span className='day'>{item.day}</span>
                          <span className='month'>{item.month}</span>
                          <span className='year'>{item.year}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  
                </div>
                <div className='time'>
                {calnderDay.filter(data=> data.active ===true).map((item,index)=>{
                  return item.times.map(i=>{
                    return (
                      <div className='time_box' key={i.time}>
                        <input className='d-block' type='radio' value={i.time} name='time' onChange={e=>timeHandeler(e,item.id)} />
                        <span>{i.time}</span>
                      </div>
                    )
                  })
                })}
                </div>

              </div>
              <div className='payment col-12'>
                <div className='payment_box'>
                  <input type='radio' className='d-block' value='mellat' name='pay' />
                  <span>به‌پرداخت ملت </span>
                </div>
                <div className='payment_box'>
                  <input type='radio' className='d-block'  value='parsian' name='pay' />
                  <span>تجارت الکترونیک پارسیان </span>
                </div>
               
              </div>
              <div className='rul col-12'>
                <input type='checkbox'/>
                <span>من <span className='rull'>شرایط و قوانین</span> را خواندم و آن را می پذیرم. *</span>
              </div>
              <div className='submitt'>
                <button type='submit' onClick={submitHandler}>پرداخت و ثبت نهایی سفارش</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default FormBuy