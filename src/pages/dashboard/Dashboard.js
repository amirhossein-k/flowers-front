import React from 'react'
import { Container } from 'react-bootstrap'
import Widgets from '../../components/dashboard/widgets/Widgets'
import Navbarr from '../../components/navbar/Navbarr'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './dashboard.module.scss'
const Dashboard = () => {
  return (
    <Container fluid style={{margin:"0 !important",padding:"0 !important" , minHeight: '100vh',height:' 100%'}}>
        <header>
            <Navbarr/>
        </header>
        {/* <main style={{height:'93%'}} > */}
            {/* <div className={`row ${styles.sidebar}`} style={{    '--bs-gutter-x': '0rem'}}>
               <Sidebar/>
            </div> */}
            <div className={`row ${styles.main}`} style={{    '--bs-gutter-x': '0rem'}}>

                {/* slidebar */}
               <div className={`col-md-2 col-lg-2 col-xs-12 g-0 flex-basis-0 ${styles.container_sidebar} ${styles.col_lg_2}`}>
                    <Sidebar/>
               </div>

               {/*content  */}
               <div className={`col ${styles.content}`}>
                   <div className={`row ${styles.container_content}`}  style={{    '--bs-gutter-x': '0rem'}}>
                        <div className='col col-md-6 col-lg-3' style={pad}>
                            <Widgets type="erarning"/>
                        </div>
                        <div className='col col-md-6 col-lg-3' style={pad}>
                            <Widgets type='order'/>
                        </div>
                        <div className='col col-md-6 col-lg-3' style={pad}>
                            <Widgets type='user'/>
                        </div>
                        <div className='col col-md-6 col-lg-3' style={pad}>
                            <Widgets type='order'/>
                        </div>
                   </div>
               </div>

               
            </div>
        {/* </main> */}
    </Container>
  )
}

const pad = {padding: '5px'}
export default Dashboard