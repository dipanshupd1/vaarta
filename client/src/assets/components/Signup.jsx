import React,{useState,useRef} from 'react'
import axios from 'axios'

function Signup() {
    let changeBtnStyle={}
    const cpasschange=useRef(null)
    const passchange=useRef(null)
    const namechange=useRef(null)
    const [cursorDisable,setCursorDisabled]=useState(true)

    const [registerData,setRegisterData]=useState({
        userRegister:"",
        passwordRegister:"",
        cPasswordRegister:""
    })

const registerChange=(e)=>{
   
    setRegisterData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    })) 

    btncolor();
    
}
function btncolor(){
    if(passchange.current.value===cpasschange.current.value && passchange.current.value!="")
    setCursorDisabled(false)
    else
    setCursorDisabled(true)

}
if(!cursorDisable){
    changeBtnStyle={backgroundColor:"rgb(0, 242, 255)",cursor:"pointer"}
}



// console.log(cursorDisable);

    const handleRegisterSubmit=async(e)=>{
        e.preventDefault();
    let userName=namechange.current.value
    let password=namechange.current.value

    try {
           const resp=await axios.post("http://localhost:5000/signup",{
            userName,password
           }) 
           console.log(resp.data);
        } catch (error) {
            console.log(error);
        }

        setRegisterData({
            userRegister:"",
            passwordRegister:'',
            cPasswordRegister:""
        })

    }
  return (
    <div id='signup-main-div'>
       <form onSubmit={handleRegisterSubmit} >
       <br />
        <p className='login-form-para'>Create Your Username</p>
        <input type="text" name="userRegister" className='login-form' onChange={registerChange} value={registerData.userRegister} required={true} ref={namechange}/><br /><br /><br />
        <p className='login-form-para'>Create your Password</p>
        <input type="text" name="passwordRegister" className='login-form' onChange={registerChange} value={registerData.passwordRegister} ref={passchange} placeholder='Minimum 5 characters'/> <br /><br /><br />
        <p className='login-form-para'>Confirm your Password</p>
        <input type="text" name="cPasswordRegister" className='login-form' onChange={registerChange} value={registerData.cPasswordRegister} ref={cpasschange} /> <br />
        <input type="submit" value={"Register"} id='signup-btn' style={changeBtnStyle} disabled={cursorDisable}/>
    </form>
    </div>
  )
}

export default Signup
