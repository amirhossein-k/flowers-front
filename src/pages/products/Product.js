import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../../components/footer/Footer'
import Navbarr from '../../components/navbar/Navbarr'
import Ask from '../../components/single-category/ask/Ask'
import HeaderCategory from '../../components/single-category/header/HeaderCategory'
import ProductCard from '../../components/single-category/productCard/ProductCard'

const Product = () => {
    const [mobile ,setMobile] = useState(false)
    window.onscroll = function () {
        myFunction();
      };
      function myFunction() {
        
        console.log(window.innerWidth)
        if (window.innerWidth > 768 ) {
          setMobile(true)
        } else {
          setMobile(false)
        }
      }
  return (
    <Container fluid style={{margin:"0 !important",padding:"0 !important"    , height: '100%',
    minHeight: '100vh',
    position: "relative"}}>
        <Row>
            <Col xs={12}>
                <header>
                 <Navbarr/>
                </header>
            </Col>
            <Col xs={12} style={{minHeight: "492px"}}>
                <main style={{backgroundColor: '#ededed',height: '100%'}} >
            
            
                    <section className=''>
                        <ProductCard/>
                    </section>
                
        
                 </main>
            </Col>
            <Col xs={12} style={{height: 399}}>
                <footer  className={`${mobile ? 'h-100' : 'h-auto' }`}>
                    <Footer/>
                
                </footer>
            </Col>
        </Row>
        
        
        
    </Container>
  )
}

export default Product