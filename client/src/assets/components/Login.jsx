
import React ,{useState,useRef}from 'react'
import axios from 'axios'
    
function Login() {
    let userName=useRef(null)
    let password=useRef(null)
    const [loginData,setLoginData]=useState({
        userLogin:"",
        passwordLogin:"",
    })
    const loginchange=(e)=>{
        setLoginData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleLoginSubmit=async(e)=>{
        e.preventDefault()
        let name=userName.current.value;
        let pass=password.current.value
        // console.log(name,pass)
        try {
           const resp=await axios.post("http://localhost:5000/login",{
            userName:name,
            password:pass
           }) 
           console.log(resp.data);
        } catch (error) {
            console.log(error);
        }


        setLoginData({
        userLogin:"",
        passwordLogin:"",
    })
    }


  
    
  return (
    <div id='login-main-div'>
    <form onSubmit={handleLoginSubmit}>
        <p className='login-form-para'>Enter Your Username</p>
        <input type="text" onChange={loginchange} name="userLogin" className='login-form' value={loginData.userLogin} ref={userName}/><br /><br /><br />
        <p className='login-form-para'>Enter Your Password</p>
        <input type="password" onChange={loginchange} name="passwordLogin" className='login-form' value={loginData.passwordLogin} ref={password} /> <br />
        <input type="submit" value={"Login"} id='login-btn'/>
    </form>
    </div>

  )
}

export default Login
