import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../../actions/toastAction'
import { updateUser } from '../../../actions/userAction'
import styles from './address.module.scss'
import { SingleSelect } from 'react-select-material-ui';
import axios from 'axios';
import SelectorInput from '../../selector/SelectorInput'
const Address = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {error,loading,userInfo} = userLogin
  
  const citylist = useSelector(state=>state.city)
  const {cityList,loading:loadingCity} = citylist

  const userUpdate = useSelector(state=>state.userUpdate)
  const {success} = userUpdate

  const [edite,setEdite]= useState(false)
  const [location,setLocation]= useState('')
  const [city,setCity]= useState('')
  const [state,setState]= useState('')
  const [zipCode,setZipCode]= useState('')
  const [Data,setData] = useState(null)
  const [options,setOptions] = useState([])
  const [options2,setOptions2] = useState([])
  useEffect(() => {
    if(userInfo){
      setCity(userInfo.detail[0].address?.city)
      setState(userInfo.detail[0].address?.state)
      setLocation(userInfo.detail[0].address?.location)
      setZipCode(userInfo.detail[0].address?.zipcode)
    }
 }, [userInfo]);
 

//  const fetch = async()=>{
//   const {data} = await axios.get('http://localhost:9000/api/city')
//   console.log('data',data)
//   if(data) setOptions(data.cityList[0].city); setData(data.cityList[0])

// }

useEffect(()=>{
 if(cityList){
  console.log(cityList,'ci')
  setData(cityList)
  setOptions(cityList.city)
 }
 
},[])
// useEffect(()=>{
    
//   if( Data !==null ){
//     console.log(Data,'DATa')
//     console.log(city,'city')
//     if(city){
//       console.log(city,'city in')
//       const targetState = Data.state.filter(item=>item.id=== city)
//     console.log(targetState,'targetState')
//     setOptions2(targetState[0].state)
//     }
    
//   }
// },[city])

const handlerCity =(value)=>{
  setCity(value)
  console.log(Data,'data')
  const targetState = Data.state.filter(item=>item.id=== value)
  console.log(targetState,'targetState')
  setOptions2(targetState[0].state)
 
}
const handlerState =(value)=>{
  setState(value)
 
}

  const items = [
  
  {
      "title": 'استان',
   
      "icon": <i className={`bi bi-globe-europe-africa ${styles.i}`}></i>
  },
    {
        "title": 'شهر',
        "icon": <i className={`bi bi-geo-fill ${styles.i}`} ></i>
    },
    {
        "title": 'ادرس',
        "icon": <i className={`bi bi-geo-alt ${styles.i}`}></i>
    },{
        "title": 'کدپستی',
        "icon": <i className={`bi bi-geo-alt ${styles.i}`}></i>
    },
   
]

const submitUpdate = async(e)=>{
  e.preventDefault();
// console.log(zipCode,'zip')
 const  address =  {"location":location,"city":city,"state":state,"zipcode":zipCode}
 console.log(address,'addrees')
  dispatch(updateUser(undefined,undefined,undefined,undefined,undefined,address))
  dispatch(showToast('اپدیت شد'))

  setTimeout(()=>{
    
    setEdite(false)
  },500)
  
}
console.log(city,'city')
  return (
    <div className={`row h-100 position-relative ${styles.address_container}  g-4 `} dir='rtl'>
        <div className={`col-12  ${styles.edite} `} > <div className={`${edite ? styles.cancel : styles.normal}`}  onClick={e=>{
          setEdite(!edite)
          setCity('')
         }}> {edite ? 'انصراف' : "ویرایش اطلاعات"}</div></div>

              <div className='col-8 col-lg-7'>
                <div className={`row ${styles.container_item}`}>
                {userInfo && items&& items.map((item,index)=>{
                  return(
              
                      <div key={item.title}>
            
                            {/* item 1 */}
                            <div className={`col-10`} key={items.title}>
                              <div className={`row ${styles.item_child}`}>
                                <div className={`col-4 d-flex justify-content-end align-items-center ${styles.item_child_box}`}>
                                  <div className={`row w-100`}>
                                    <div className={`col-4`}>{item.icon}</div>
                                    <div className={`col-8 ${styles.cursor}`}>{item.title}</div>
                                  </div>
                                </div>
                                <div className={`col ${!edite ? 'd-flex' : 'd-none'}`} >
                                  {(()=>{
                                        switch(item.title){
                                           
                                            case 'ادرس':
                                              return  userInfo.detail[0]?.address?.location
                                            case 'استان':
                                              return  userInfo.detail[0]?.address?.city
                                            case 'شهر':
                                              return  userInfo.detail[0]?.address?.state
                                            case 'کدپستی':
                                              return  userInfo.detail[0]?.address?.zipcode
                                           
                                             default:
                                                return 'ggg'
                                        }
                                    })()}
                                  </div>
                               
                                 <div className={`col ${styles.item_child_input} ${edite ? 'd-flex' : 'd-none'}`}>
                                 {(()=>{
                                     switch(item.title){
                                         case 'ادرس':
                                     //  return   <input className={`${styles.effect_19}`} type="text" placeholder="" value={address}  onChange={e=>setAddress(e.target.value)}/>
                                     return (
                                       <textarea 
                                       className={`${styles.effect_19} w-100`}  value={location || ''}  onChange={e=>setLocation(e.target.value)}
                                       name="story"
                                               rows={2} >
                                       {/* {address} */}
                                       </textarea>

                                     )
                             
                                     case 'استان':
                                       return  <SelectorInput options={options} handler={handlerCity} />
                                     case 'شهر':
                                       return city && <SelectorInput options={options2}  handler={handlerState} />
                                     case 'کدپستی':
                                       return  <input className={`${styles.effect_19}`} type="text" placeholder="کدپستی" value={zipCode || ''} onChange={e=>setZipCode(e.target.value)}/>
                       
                                      default:
                                         return ''
                                     }
                                 })()}
                                     {/* <input className={`${styles.effect_19}`} type="text" placeholder=""/> */}
                                     <label className={`${item.title=== 'استان' || item.title=== 'شهر' ? 'd-none' : 'd-block'}`}> {item.title}</label>
                                     <span className={`${styles.focus_border}`}>
                                         <i></i>
                                     </span>
                           </div>
                              
                              </div>
                            </div>
                      </div>
                  )
                } ) }
                 </div>
                 <div className={`row ${edite ? 'd-block': 'd-none'} `} >
                    <div className={`${styles.container_botton} justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-center m-md-3 m-3`}>
                        <button onClick={e=>submitUpdate(e)}>اپدیت </button>
                    </div>
                  </div>
              </div>
              
        
    </div>
     
      
  )
}

export default Address