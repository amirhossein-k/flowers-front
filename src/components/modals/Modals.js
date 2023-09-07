import React from 'react'
import './modals.css'
import ReactLoading from 'react-loading'
const Modals = () => {
  return (
    <div className='container-modal'> 
    
      <div className='header'>
        لطفا شکیبا باشید
        <ReactLoading
            type={"bubbles"}
            color="#fff"
            height={"100%"}
            width={"100%"}
          />
      </div>
      

    
    </div>
  )
}

export default Modals