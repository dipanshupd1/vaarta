import React ,{useRef}from 'react'
import img from "/src/assets/user.png"
import {io} from "socket.io-client"

function Chatbox() {
    const sentMsg=useRef()

const socket=io('http://localhost:5000')

socket.on("connect",()=>{
    // console.log(socket.id);
   
})



const handleSubmit=(e)=>{
    e.preventDefault()

    socket.emit("send",{
        name:"sender",
        msg:"hii"
    })

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
        <div className="chat-me">hii</div>
        <div className="chat-other">hii</div>
  
     </div>
     <div id="type-msg">
        <form onSubmit={handleSubmit}>
            <input type="text" name="typeMsg" id="msg-inp" placeholder='Type Your Message' ref={sentMsg} />
            <input type="submit" name="Send" id="send-msg" value="Send"/>
        </form>
     </div>
 </div>
  )
}

export default Chatbox
