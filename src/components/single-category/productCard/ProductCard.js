import React,{ useContext,createContext, useEffect, useMemo, useCallback } from 'react'
import './productCard.css'
import pony from '../../../pony.jpg'
import styles from './product.module.scss'
import { useState } from 'react'
import FilterPrice from '../../filterprice/FilterPrice'
import {productContext} from '../../../App'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FilterCategory from '../../filterCategory/FilterCategory'



const ProductCard = () => {
  const productcategory = useSelector(state=>state.categoryListProduct)
  const {category_product} = productcategory

  const [ open,setOpen] = useState([false,false,false])
  const [ filterColor,setFilterColor] = useState(['صورتی','سفید', 'ابی', 'قرمز'])
  const [ filterCategory,setFilterCategory] = useState([])
  const [ filter,setFilter] = useState('جدیدترین')
  const [ sold,setSold] = useState(false)
  const [value1, setValue1] = useState([0, 200000]);
  const [productCon , setProductCon] = useContext(productContext)
  const navigate = useNavigate()
  // if( productCon !== undefined) {
  //   productCon.map(item=>console.log(item))
  // }
  
  useEffect(()=>{
    setFilterCategory(category_product?.categoryproduct)

  },[category_product])


//  if(localStorage.getItem('cart')?.length > 0){
//   const getCart = localStorage.getItem('cart')
//   const parsCart =JSON.parse(getCart)
//   console.log(parsCart,'produict')


//   localStorage.setItem('cartlist',JSON.stringify(parsCart))
//  }
  // مدیریت باز و بسته کردن بخش فیلتر

  const togglehandler = (index) =>{
 
    setOpen(prevOpen => [...prevOpen.slice(0,index),!prevOpen[index] , prevOpen.slice(index + 1 )].flat())
    
  }
  // فیلتر رنگ
  const colorhandler = (e,index) =>{
    console.log(filterColor,'e')
    setFilterColor(prev=> prev.filter(item=> item !== e.target.value))
    setFilterColor(prev=> [...prev, e.target.value])
    if(!e.target.checked){
      setFilterColor(prev=> prev.filter(item=> item !== e.target.value))

    }
  }
   // فیلتر رنگ
   const filterhandler = (e,index) =>{
    console.log(e.target.innerHTML,'e')
    setFilter(e.target.innerHTML)
   
  }
   // فیلتر دسته
   const filterCategoryhandler = (e,index) =>{
    console.log(e.target.innerHTML,'e')
    setFilterCategory(e.target.innerHTML)
   
  }
  const memoCallBackFilterCategory = useCallback((e,index)=>{
    
    setFilterCategory(prev=> prev.filter(item=> item.label !== e.target.value))
    setFilterCategory(prev=> [...prev, {'value':e.target.value,'label':e.target.value}])
    // setFilterCategory(prev=> [...prev,e.target.value])

    if(!e.target.checked){
      setFilterCategory(prev=> prev.filter(item=> item.label !== e.target.value))

    }
  },[setFilterCategory,filterCategory])


  

    console.log('product card categ', filterCategory)

  return (
    
    <div className={`productcard-container row ${styles.ProductCard_container}`} dir='rtl'>
      
      {/*  ستون چپ - فیلتر*/}
      <div className='col-12 col-lg-2'>
        <div className={styles.nav}>
          <div className={styles.title}>فیلتر</div>
          <ul>
            <li>
              <div className={styles.header}>
                <div className={styles.title}>قیمت</div>
                <div className={styles.icon} onClick={()=> togglehandler(0)}><i className="bi bi-caret-down"></i></div>
              </div>
              
              <div className={` row ${styles.body}`} style={!open[0] ? {'---display' : 'none '} : {'---display' : 'flex '}}>
                <FilterPrice value1={value1} setValue1={setValue1}/>
              </div>
            </li>
            <li>
              <div className={styles.header}>
                <div className={styles.title}>دسته بندی</div>
                <div className={styles.icon} onClick={()=> togglehandler(1)}><i className="bi bi-caret-down"></i></div>
              </div>
              
              <div className={`row ${styles.body}`} style={!open[1] ? {'---display' : 'none '} : {'---display' : 'flex '}} >
                <FilterCategory filterCategory={filterCategory} memoCallBackFilterCategory={memoCallBackFilterCategory}/>
              </div>
            </li>
            <li>
              <div className={styles.header}>
                <div className={styles.title}>رنگ گل</div>
                <div className={styles.icon} onClick={()=> togglehandler(2)}><i className="bi bi-caret-down"></i></div>
              </div>
              
              <div className={`row ${styles.body}`} style={!open[2] ? {'---display' : 'none '} : {'---display' : 'flex '}}>
                  <div className={` col-6 ${styles.inputcheck}`}>
                    <label className='col'>صورتی</label>
                    <input className='col-2' type='checkbox' onChange={e=>colorhandler(e,0)}  name='صورتی' value={'صورتی'} defaultChecked/>
                  </div>
                  <div className={` col-6 ${styles.inputcheck}`}>
                    <label className='col'>سفید</label>
                    <input className='col-2'  type='checkbox' onChange={e=>colorhandler(e,1)} value='سفید' defaultChecked />
                  </div>
                  <div className={` col-6 ${styles.inputcheck}`}>
                    <label className='col'>ابی</label> 
                    <input className='col-2' type='checkbox' onChange={e=>colorhandler(e,2)} value='ابی' defaultChecked />
                  </div>
                  <div className={` col-6 ${styles.inputcheck}`}>
                    <label className='col'>قرمز</label>
                    <input className='col-2' type='checkbox' onChange={e=>colorhandler(e,3)} value='قرمز' defaultChecked/>
                  </div>
              </div>
            </li>
            
            
          </ul>
        </div>
      </div>
      {/* ستون راست - محتوا */}
      <div className='col-lg-10'>

      <div className='col-12'>
        <div className='filter-container'>
          
          <div className='filter-box'>
            <div className='title'><i class="bi bi-funnel"></i></div>
            <a onClick={e=>filterhandler(e)} className={`${filter === 'جدیدترین' ? 'activee' : ''}`} >جدیدترین</a>
            <a onClick={e=>filterhandler(e)} className={`${filter === 'ارزان ترین' ? 'activee' : ''}`}>ارزان ترین</a>
            <a onClick={e=>filterhandler(e)} className={`${filter === 'گران ترین' ? 'activee' : ''}`}>گران ترین</a>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card-container'>
            <div className='card-box row'>


              { productCon !== undefined && filter &&
              
                filter === 'گران ترین' ? 
                  productCon?.filter(function(x){ return x.price >= value1[0] && x.price <= value1[1]  })?.filter(item=>   item.color.includes(filterColor[0])||item.color.includes(filterColor[1])||item.color.includes(filterColor[2]) ||item.color.includes(filterColor[3] ))?.sort((p1,p2)=>(p1.price < p2.price) ? 1 : (p1.price>p2.price) ? -1 : 0 )
                  ?.filter((item) => {
                    var u= item;
                    for (var i = 0; i < filterCategory.length; i++) {
                       
                        u= item.category_product[0]?.value?.includes(filterCategory[i].label);
                       if(u){
                         return u
                       }
                    }
                    return u
                
                  })
                  .map((item,index)=>{
                  return(
                      <div className='col-11 col-sm-6 col-md-4 col-lg-2  m-0' key={index} onClick={(e) => navigate(`/product/${item.id}`)}>
                        <div className='box'>
    
                          <div className='image-box'>
                            <img src={item.pic[0]} alt='photo' />
                            <span className={`${item.count === '0' ? 'd-flex' : 'd-none'}`}>ناموجود</span>
                          </div>
    
                          <div className='body'>
                            <span className='title'>{item.title}</span>
                            <span className='price'>{item.price}</span>
                          </div>
                          <div className='footer'>
                            
                              {(()=>{
                                
                                return(
                                  item.count === '0' ? 
                                  <span className='status red'>ناموجود</span> : <span className='status '> {item.count} عدد</span>
                                )
                                
                              })()}
                           
                          </div>
                        </div>
                      </div>
                    )
                }) : filter === 'ارزان ترین' ? 
                productCon?.filter(function(x){ return x.price >= value1[0] && x.price <= value1[1]  })?.filter(item=>   item.color.includes(filterColor[0])||item.color.includes(filterColor[1])||item.color.includes(filterColor[2]) ||item.color.includes(filterColor[3] ))?.sort((p1,p2)=>(p1.price < p2.price) ? -1 : (p1.price>p2.price) ? 1 : 0 )
                ?.filter((item) => {
                  var u= item;
                  for (var i = 0; i < filterCategory.length; i++) {
                     
                      u= item.category_product[0]?.value?.includes(filterCategory[i].label);
                     if(u){
                       return u
                     }
                  }
                  return u
              
                })
                .map((item,index)=>{
                return(
                    <div className='col-11 col-sm-6 col-md-4 col-lg-2 m-0' key={index} onClick={(e) => navigate(`/product/${item.id}`)}>
                      <div className='box'>
  
                        <div className='image-box'>
                          <img src={item.pic[0]} alt='photo' />
                          <span className={`${item.count === '0' ? 'd-flex' : 'd-none'}`}>ناموجود</span>
                        </div>
  
                        <div className='body'>
                          <span className='title'>{item.title}</span>
                          <span className='price'>{item.price}</span>
                        </div>
                        <div className='footer'>
                          
                            {(()=>{
                              
                              return(
                                item.count === '0' ? 
                                <span className='status red'>ناموجود</span> : <span className='status '> {item.count} عدد</span>
                              )
                              
                            })()}
                         
                        </div>
                      </div>
                    </div>
                  )
              }) : 
              productCon?.filter(function(x){ return x.price >= value1[0] && x.price <= value1[1]  })?.filter(item=>   item.color.includes(filterColor[0])||item.color.includes(filterColor[1])||item.color.includes(filterColor[2]) ||item.color.includes(filterColor[3] ))
              .reverse()
              ?.filter((item) => {
                var u= item;
                for (var i = 0; i < filterCategory.length; i++) {
                   
                    u= item.category_product[0]?.value?.includes(filterCategory[i].label);
                   if(u){
                     return u
                   }
                }
                return u
            
              })
              .map((item,index)=>{
              return(
                  <div className=' col-11 col-sm-6 col-md-4 col-lg-2  m-0'  key={index} onClick={(e) => navigate(`/product/${item._id}`)}>
                    <div className='box'>

                      <div className='image-box'>
                        <img src={item.pic[0]} alt='photo' />
                        <span className={`${item.count === '0' ? 'd-flex' : 'd-none'}`}>ناموجود</span>
                      </div>

                      <div className='body'>
                        <span className='title'>{item.title}</span>
                        <span className='price'>{item.price}</span>
                      </div>
                      <div className='footer'>
                        
                          {(()=>{
                            
                            return(
                              item.count === '0' ? 
                              <span className='status red'>ناموجود</span> : <span className='status '> {item.count} عدد</span>
                            )
                            
                          })()}
                       
                      </div>
                    </div>
                  </div>
                )
            })
                
                // return(
                //   <div className='col-11 col-sm-6 col-md-4 col-lg-2 ' key={index}>
                //     <div className='box'>

                //       <div className='image-box'>
                //         <img src={item.pic} alt='photo' />
                //         <span className={`${item.count === '0' ? 'd-flex' : 'd-none'}`}>ناموجود</span>
                //       </div>

                //       <div className='body'>
                //         <span className='title'>{item.title}</span>
                //         <span className='price'>{item.price}</span>
                //       </div>
                //       <div className='footer'>
                        
                //           {(()=>{
                            
                //             return(
                //               item.count === '0' ? 
                //               <span className='status red'>ناموجود</span> : <span className='status '> {item.count} عدد</span>
                //             )
                            
                //           })()}
                       
                //       </div>
                //     </div>
                //   </div>
                // )
              }

              

             
            </div>
          </div>
      </div>
      </div>

      
    </div>
    
  )
}

export default memo(ProductCard) 