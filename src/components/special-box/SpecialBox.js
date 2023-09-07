import React from 'react'
import { Col } from 'react-bootstrap'
import pony from '../../pony.jpg'
import './special_box.css'
const SpecialBox = () => {
  return (
    <div className='special-container row'>
        <Col sm={4}>
            <div className='box' >
                <img src={pony}/>
                <span>سبد گل</span>
            </div>
        </Col>
    </div>
  )
}

export default SpecialBox