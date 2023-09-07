import React, { createContext, useEffect, useState } from 'react'
import { memo } from 'react'
import { Container } from 'react-bootstrap'
import Category from '../../components/category-box/Category'
import Footer from '../../components/footer/Footer'
import Navbarr from '../../components/navbar/Navbarr'
import SpecialBox from '../../components/special-box/SpecialBox'





const Home = () => {


  return (
    
    <Container fluid style={{margin:"0 !important",padding:"0 !important"}}>
        <header>
            <Navbarr/>
        </header>
        {/* <main style={{backgroundColor: '#ededed',    marginBottom: 10}} > */}
        <main>
          <section className='header-img'>
            rt
          </section>
          <section className='category-box-product'>
            <Category/>
          </section>
          {/* <section className='special-product'>
          </section>
          <section className='comic'>
            
          </section> */}
      
        </main>
        <footer >
          <Footer/>
          
        </footer>
    </Container>


  )
}

export default memo(Home)