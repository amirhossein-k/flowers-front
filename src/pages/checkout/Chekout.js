import React from 'react'
import { Container } from 'react-bootstrap'
import FormBuy from '../../components/checkout/form-buy/FormBuy'
import Footer from '../../components/footer/Footer'

import Navbarr from '../../components/navbar/Navbarr'
import './checkout.css'
const Checkout = () => {
  return (
    <Container fluid style={{margin:"0 !important",padding:"0 !important"}}>
    <header>
        <Navbarr/>
    </header>
    <main style={{backgroundColor: '#ededed',    marginBottom: 10}} >

      <section className='form-buy' >
        <FormBuy/>
      </section>
      
  
    </main>
    <footer >
      <Footer/>
      
    </footer>
</Container>
  )
}

export default Checkout