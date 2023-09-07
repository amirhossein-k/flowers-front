import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../../actions/toastAction'
import { updateUser } from '../../../actions/userAction'
import { productContext } from '../../../App'
import styles from './informtion.module.scss'
const Information = ({setDone}) => {
    const dispatch = useDispatch()
    const [productCon , setProductCon] = useContext(productContext)
    const userLogin = useSelector(state=>state.userLogin)
    const {error,loading,userInfo} = userLogin
    // console.log(userInfo,'user')
    const userupdate = useSelector(state=>state.userUpdate)
    const {userInfo:userInfoUpdate} = userupdate


    // useEffect(()=>{
    //     if(userInfoUpdate){
    //      setDone(true)
    //         console.log('done info')
    //     }
    // },[userInfoUpdate])
    // 
    
    // 

    const [ name , setName ] = useState()
    const [ family , setFamily ] = useState()
    const [ phone_number , setPhone_Number ] = useState()
    const [ email , setEmail ] = useState()
    const [ password , setPassword ] = useState()
    const [edite,setEdite]= useState(false)

    useEffect(() => {
       if(userInfo){
        setEmail(userInfo.email)
        setFamily(userInfo.detail[0].family)
        setName(userInfo.name)
        setPhone_Number(userInfo.detail[0].phone_number)
        setPassword(userInfo?.password)
       }
    }, [userInfo]);
    // useEffect(()=>{
    //     console.log('family',family)
    // },[name,email,password,family,phone_number])

    const submitUpdate = async(e)=>{
        e.preventDefault();
console.log(family,'name')
        dispatch(updateUser(name,family,phone_number,email))
        dispatch(showToast('اپدیت شد'))
    }

    const items = [
        {
            "title": 'نام'
        },
        {
            "title": 'نام خانوادگی'
        },
        {
            "title": 'شماره تماس'
        },
        {
            "title": 'ایمیل'
        },
        {
            "title": 'رمز'
        },
    ]
  return (
    <div className={`row h-100 position-relative ${styles.information_container}  g-4 `} dir='rtl'>
        <div className={`col-12  ${styles.edite} `} > <div className={`${edite ? styles.cancel : styles.normal}`}  onClick={e=>setEdite(!edite)}> {edite ? 'انصراف' : "ویرایش اطلاعات"}</div></div>
        {/* item 1 */}
        {
            userInfo && items.map((item,index)=>{
                return(
                    <div className='col-12 col-lg-7' key={item.title}>
                        <div className={`row ${styles.item}`}>
                            <div className={`col-3 ${styles.item_title}`}>{item.title}</div>
                            <div className='col-5 col-lg-4 col-md-4 '>
                                <div className='row'>
                                    <div className={`col-12 ${styles.item_child} ${!edite ? 'd-flex' : 'd-none'}`}>{
                                    (()=>{
                                        switch(item.title){
                                           
                                            case 'نام':
                                              return  userInfo.name
                                            case 'شماره تماس':
                                              return  userInfo.detail[0].phone_number
                                            case 'ایمیل':
                                              return  userInfo.email;
                                            case 'رمز':
                                              return  'haha';
                                            case 'نام خانوادگی':
                                             return   userInfo.detail[0].family
                                             default:
                                                return 'ggg'
                                        }
                                    })()
                                    }</div>
                                    <div className={`col-12 ${styles.item_child} ${edite ? 'd-flex' : 'd-none'}`}>
                                        {(()=>{
                                            switch(item.title){
                                                case 'نام':
                                             return   <input className={`${styles.effect_19}`} type="text" placeholder="نام" value={name || ''}  onChange={e=>setName(e.target.value)}/>
                                    
                                            case 'شماره تماس':
                                              return  <input className={`${styles.effect_19}`} type="text" placeholder="شماره تماس" value={phone_number || ''} onChange={e=>setPhone_Number(e.target.value)}/>
                                            case 'ایمیل':
                                              return  <input className={`${styles.effect_19}`} type="text" placeholder="ایمیل" value={email || ''} onChange={e=>setEmail(e.target.value)}/>
                                            case 'رمز':
                                              return  'haha';
                                            case 'نام خانوادگی':
                                             return   <input className={`${styles.effect_19}`} type="text" placeholder="نام خانوادگی" value={family || ''} onChange={e=>setFamily(e.target.value)}/>
                                             default:
                                                return ''
                                            }
                                        })([family])}
                                            {/* <input className={`${styles.effect_19}`} type="text" placeholder=""/> */}
                                            <label> {item.title}</label>
                                            <span className={`${styles.focus_border}`}>
                                                <i></i>
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        <div className={`col-10 col-lg-5 ${edite ? 'd-block': 'd-none'}`} >
            <div className={`${styles.container_botton} justify-content-xl-start justify-content-lg-start justify-content-md-center justify-content-center`}>
                <button onClick={e=>submitUpdate(e)}>اپدیت </button>
            </div>
        </div>
        
    </div>
  )
}

export default Information