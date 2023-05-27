import React,{useState} from 'react'
import Login from '/src/assets/components/Login.jsx'
import Signup from '/src/assets/components/Signup.jsx'


function Home() {
  const [loginState, setLoginState]=useState(true)
 let loginBtnStyle,registerBtnStyle={}
 let mainheight={}
 let btnStyle={boxShadow: "1px 1px 5px 1px rgba(255, 255, 255, 0.782)",
            opacity: "1"}

 if(loginState){
     loginBtnStyle=btnStyle
  
 }
 else{
   registerBtnStyle=btnStyle
   mainheight={padding:"1rem"}
 }

  return (
    <div id='home-main-container' style={mainheight}>
      <h1 id='home-title'>VAARTA</h1>
      <p id='home-main-para'>Because conversation is the only way</p>
      <div id="login-signup-toggle">
      <span style={loginBtnStyle} onClick={()=>{setLoginState(true)}}>Login</span>
      <span style={registerBtnStyle} onClick={()=>{setLoginState(false)}}>Register</span>
      </div>
      {loginState?<Login/>:<Signup/>}
    </div>
  )
}

export default Home
