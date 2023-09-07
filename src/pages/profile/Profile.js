import { style } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbarr from "../../components/navbar/Navbarr";
import Address from "../../components/profile/address/Address";
import History from "../../components/profile/history/History";
import Information from "../../components/profile/information/Information";
import Sidebar from "../../components/sidebar/Sidebar";
import Toast from "../../components/toast/Toast";

import styles from './profile.module.scss'

const Profile = () => {
  const [open,setOpen] = useState([<Information key={'information'}/>])
  const [done,setDone] = useState(false)

  const getToast = useSelector(state=>state.Toast)
  const {toast} = getToast
   const to =useMemo(() => {
    console.log(toast,'tost')
    if(done !== null || done !== undefined){
     return <Toast title={toast}/>
    } 
   }, [toast])

  const openHandlerCallback =useCallback((title)=>{
    switch(title){
      case 'Address':
        return setOpen(<Address key={title}/>)
      case "Information":
        return setOpen(<Information  key={title}/>)
      case "History":
        return setOpen(<History key={title}/>)
      case "Home":
      return window.location.replace('/')
    }
    // setOpen(component)
  },[open])

  useEffect(()=>{
    console.log(toast,'toast')
    setDone(toast)
  },[toast])
  return (

    <Container fluid style={{margin:"0 !important",padding:"0 !important"}}>
      {done && to}
      {/* {done !== null || done !== undefined && <Toast title={toast}/>} */}
      {/* <Toast title="hw"/> */}
      <header>
          <Navbarr/>
      </header>

      <main style={{backgroundColor: '#ededed',    marginBottom: 10 ,minHeight: "492px"}} className="row">
        <section style={{minHeight: "492px"}}>
        
          <div className={`${styles.profile_container} row h-100`} dir='rtl'>
            <div className='col-12 col-lg-2'>
              <Sidebar openHandlerCallback={openHandlerCallback}/>
              
            </div>
            <div className='col-12 col-lg-10 my-2' style={{paddingTop:25,paddingBottom:25}}>
              {open && open }
            </div>
          </div>
        </section>
  
      </main>
      <footer >
        <Footer/>
      
      </footer>
    </Container>
  );
};

export default  Profile;
