import React from 'react'
import { Container } from 'react-bootstrap'
import BoxList from '../../components/box-list/BoxList'
import Footer from '../../components/footer/Footer'
import Navbarr from '../../components/navbar/Navbarr'
import Price from '../../components/single-product/price/Price'
import './cart.css'

const Cart = () => {
  return (
    <Container fluid style={{margin:"0 !important",padding:"0 !important"}} className="cart">
    <header>
        <Navbarr/>
    </header>
    <main style={{backgroundColor: '#ededed',    marginBottom: 10}} >
      <section className='noties' >
       
      </section>
      <section className='price' >
        <Price/>
      </section>
      
      
      <section className='other-things'>
        <p className='title-outer-things'>محصولات مراقبت برای گیاهان</p>
          <BoxList/>
      </section>
  
    </main>
    <footer >
      <Footer/>
    </footer>
</Container>
  )
}

export default Cart