import React ,{useEffect, useRef, useState}from 'react'
import img from "/src/assets/user.png"
import {io} from "socket.io-client"
import Cookies from 'js-cookie'

function Chatbox() {
    const sentMsg=useRef()

   
    const socket=io('http://localhost:5000')
    useEffect(()=>{

        const userLogged=Cookies.get("username")
       

        socket.on("connect",()=>{
            socket.id=userLogged
            console.log('your socket id is ',socket.id);
              socket.emit('userlogged',{name:userLogged})
        })

    },[])

  
    socket.on('recieve',(msg)=>{
        console.log("from server ",msg)
        recievedMsg(msg.msg);
        })


    const recievedMsg=(text)=>{
        const containter=document.getElementById('chat-container')
        const msgBox=document.createElement('div')
        msgBox.classList.add('chat-other')
        msgBox.innerText=text
        containter.appendChild(msgBox) 
    }

    function sentToServer(msg){

        socket.emit("send",{
            name:"sender",
            msg
        })
    }
  



const handleSubmit=(e)=>{
    e.preventDefault()
        let msg=sentMsg.current.value
        sentToServer(msg);
    

    const containter=document.getElementById('chat-container')
    const msgBox=document.createElement('div')
    msgBox.classList.add('chat-me')
    msgBox.innerText=sentMsg.current.value
    containter.appendChild(msgBox)
    sentMsg.current.value=''

}
  return (
    <div id="chat-main-right">
    <div id="chat-box-title-bar">
        <p id="chatbox-image"><img src={img} alt="" /></p>
        <div id="chatbox-name"><h4>user1</h4></div>
     </div>
     <div id="chat-container">
  
     </div>
     <div id="type-msg">
        <form onSubmit={handleSubmit}>
            <input type="text" name="typeMsg" id="msg-inp" placeholder='Type Your Message' ref={sentMsg} />
            <input type="submit"  id="send-msg" value="Send"/>
        </form>
     </div>
 </div>
  )
}

export default Chatbox
