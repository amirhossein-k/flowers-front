import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './filtercategory.module.scss'
const FilterCategory = (props) => {
    const {memoCallBackFilterCategory,filterCategory} = props

    const productcategory = useSelector(state=>state.categoryListProduct)
    const {category_product} = productcategory

    const [newList ,setNewList] = useState([])
    useEffect(()=>{
        setNewList(category_product?.categoryproduct)
    },[category_product])
    
  return (
    <>
    { newList?.length !== 0 &&
        newList?.map((item,index)=>{
            return(
                <div className={` col-6 ${styles.inputcheck}`} key={`${index}${item.value}`}>
                    <label className='col'>{item.value}</label>
                    <input className='col-2' type='checkbox' onChange={e=>memoCallBackFilterCategory(e,0)}  name={item.value} value={item.value} defaultChecked/>
                </div>
            )
        })
    }
        {/* <div className='col-6'>
            <label className='col'></label>
            <input className='col-2' type='checkbox' onChange={e=>memoCallBackFilterCategory(e,0)}  name='صورتی' value={"اپارتمانی"} defaultChecked/>
        </div> */}

    </>
  )
}

export default memo(FilterCategory)