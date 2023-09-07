import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbarr from '../../components/navbar/Navbarr'
// import Ask from '../../components/single-category/ask/Ask'
import ProductCard from '../../components/single-category/productCard/ProductCard'
import Describtaion from '../../components/single-product/describtaion/Describtaion'
import Detail from '../../components/single-product/detail/Detail'
import Price from '../../components/single-product/price/Price'

import {productContext} from '../../App'

const SingleProduct = () => {
  const { productId } = useParams();
  const [productCon , setProductCon] = useContext(productContext)
  const [targetProduct,setTargetProduct] = useState()
  useEffect(()=>{
    setTargetProduct(productCon?.filter(item=>item._id === productId )[0])
  },[productCon])
  // console.log(targetProduct,'t')

  return (
    <Container fluid style={{margin:"0 !important",padding:"0 !important"}}>
    <header>
        <Navbarr/>
    </header>
    <main style={{backgroundColor: '#ededed',    marginBottom: 10}} >
      <section className='detail' >
       <Detail targetProduct={targetProduct} />
      </section>
      <section className='price'>
        <Price targetProduct={targetProduct}/>
      </section>
      
      
      <section className='ask'>
          <Describtaion targetProduct={targetProduct}/>
      </section>
  
    </main>
    <footer >
      <Footer/>
      
    </footer>
</Container>
  )
}

export default SingleProduct