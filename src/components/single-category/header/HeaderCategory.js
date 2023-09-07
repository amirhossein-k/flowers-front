import React from 'react'
import './headerCategory.css'
import pony from '../../../pony.jpg'
import backk from '../../../header-asl.jpg'
const HeaderCategory = () => {
  return (
   <div className='row headercategory' >
      <div className='col-12 col-md-3 '>
        <div className='parent-box'>
        <div className="box-img">
          <img src={pony} alt="photo"/>
        </div>
        </div>
      </div>
      <div className='col-12 col-md-9 '>
      <div className='parent-box2'>
        {/* <div className="box-img">
          <img src={backk} alt="photo" style={{objectFit: 'cover'}}/>
        </div> */}
        <div className='menu'>
          <a> گرررز</a>
          <a>سللذذذ</a>
        </div>
        </div>
      </div>
      {/* <div className='col-12 col-sm-4'>tirf</div> */}

   </div>
  )
}

export default HeaderCategory