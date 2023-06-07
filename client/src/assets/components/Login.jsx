
import React ,{useState,useRef,useContext}from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
    
function Login() {
    const navigate=useNavigate()

    // const getUserName=useContext(UserContext)
    // console.log(getUserName.getName);
    let userName=useRef(null)
    let password=useRef(null)
    const [loginData,setLoginData]=useState({
        userLogin:"",
        passwordLogin:"",
    })
    let errStyle={}
    const [errLogin,setErrLogin]=useState(false)
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
           const resp=await axios.post(`${import.meta.env.VITE_CL_DOMAIN}/login`,{
            userName:name,
            password:pass
           }) 
           console.log(resp.data);
           if(resp.data.msg=="successful")
           {
                Cookies.set("username",name)
            // getUserName.loggedUser=name
            navigate('/chat')}
           else{
            setErrLogin(true)
           }

        } 
        catch (error) {
            console.log(error);
        }


        setLoginData({
        userLogin:"",
        passwordLogin:"",
    })
    }

    if(errLogin){
                errStyle={display:'block'}
                setTimeout(()=>{
                    setErrLogin(false)
                    errStyle={}
                },3000)
            }


  
    
  return (
    <div id='login-main-div'>
    <form onSubmit={handleLoginSubmit}>
        <p className='login-form-para'>Enter Your Username</p>
        <input type="text" onChange={loginchange} name="userLogin" className='login-form' value={loginData.userLogin} ref={userName}/><br /><br /><br />
        <p className='login-form-para'>Enter Your Password</p>
        <input type="password" onChange={loginchange} name="passwordLogin" className='login-form' value={loginData.passwordLogin} ref={password} /> <br />
        <p id="login-error-msg" style={errStyle}>*Invalid Credentials</p>
        <input type="submit" value={"Login"} id='login-btn'/>
        
    </form>
    </div>

  )
}

export default Login
