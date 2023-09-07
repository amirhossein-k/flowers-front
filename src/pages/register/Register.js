import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormControl, FormGroup, Form, Container } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login,register } from "../../actions/userAction";
import Navbarr from "../../components/navbar/Navbarr";
import "./register.css";

const Register = (props) => {
  const location = useLocation()
 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useEffect(()=>{})
  const [singup, setSingup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [personName, setPersonName] = useState('');
  const [ checkOutFrom ,setCheckOutFrom]  =useState(false)

  const userLogin = useSelector(state=>state.userLogin)
  const {error,loading,userInfo} = userLogin
  useEffect(()=>{
    if(userInfo)
      if(location.state){
        navigate('/checkout')
      }else{

        navigate('/')
      }
  },[userInfo])

  useEffect(()=>{
  
    if(location.state){

      setSingup(location.state.title)

    }
  },[location,checkOutFrom])
 
  // login
  const loginHandler = async(e)=>{
    e.preventDefault()
    dispatch(login(email, password))
  }
  const registerHandler = async(e)=>{
    e.preventDefault()
    if(password === password2){
      dispatch(register(personName,email,password))
    }

  }
  return (
    // {checkout ? () : ()}
    <Container fluid style={{margin:"0 !important",padding:"0 !important" ,height: '100%',
    minHeight: '100vh'}}>
      <header>
            <Navbarr/>
      </header>
    <main className="main-register">
    <div className="wrapper_register">
      <div className="title-text">
        <div
          className="title login"
          style={singup  ? { marginLeft: "-50%" } : { marginLeft: "0%" }}
        >
          ورود{" "}
        </div>
        <div className="title singup">عضویت</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked />
          <label
            htmlFor="login"
            className={`slide login `}
            style={
              !singup 
                ? { color: "#fff", cursor: "default" }
                : { color: "#000", cursor: "pointer" }
            }
            onClick={() => setSingup(false)}
          >
            ورود
          </label>
          <input type="radio" name="slide" id="signup" />
          <label
            htmlFor="login"
            className="slide signup"
            style={
              singup 
                ? { color: "#fff", cursor: "default" }
                : { color: "#000", cursor: "pointer" }
            }
            onClick={() => setSingup(true)}
          >
            عضویت
          </label>
          <div
            className={`${singup ? "slide-tab checked" : "slide-tab"}`}
          ></div>
        </div>
        <div
          className="form-inner"
          style={singup  ? { height: 414 } : { height: 250 }}
        >
          <Form
          onSubmit={loginHandler}
            className="login"
            style={singup  ? { marginLeft: "-50%" } : { marginLeft: "0%" }}
          >
            <pre></pre>
            <div className="field">
              <FormGroup>
                <FormControl type="text" placeholder="ایمیل" value={email} onChange={e=>setEmail(e.target.value)} required />
              </FormGroup>
            </div>
            <div className="field">
              <FormGroup>
                <FormControl type="password" placeholder="پسورد" value={password} onChange={e=>setPassword(e.target.value)} required />
              </FormGroup>
            </div>
            <div className="pass-link">
              <a href="#">فراموشی رمز</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <button type='submit'>ورود</button>
            </div>
          </Form>
          {/* عضویت */}
          <Form className="signup" onSubmit={registerHandler}>
            <pre></pre>
            <div className="field">
              <FormGroup>
                <FormControl type="text" placeholder="نام" value={personName} onChange={e=>setPersonName(e.target.value)} required />
              </FormGroup>
            </div>
            <div className="field">
              <FormGroup>
                <FormControl type="text" placeholder="ایمیل" value={email} onChange={e=>setEmail(e.target.value)} required />
              </FormGroup>
            </div>
            <div className="field">
              <FormGroup>
                <FormControl type="password" placeholder="پسورد" value={password} onChange={e=>setPassword(e.target.value)} required />
              </FormGroup>
            </div>
            <div className="field">
              <FormGroup>
                <FormControl
                  type="password"
                  placeholder="تکرارپسورد"
                  value={password2}
                   onChange={e=>setPassword2(e.target.value)}
                  required
                />
              </FormGroup>
            </div>

            <div className="field btn">
              <div className="btn-layer"></div>
              <button  type='submit'>عضویت</button>
            </div>
            <div className="signup-link">
              ایا عضو هستید؟ <a href="">ورود</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </main>
    </Container>
  );
};

export default Register;
