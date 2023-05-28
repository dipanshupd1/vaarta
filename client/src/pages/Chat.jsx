import React from 'react'
import "/src/assets/css/Chat.css"
import img from "/src/assets/user.png"
import Chatbox from "/src/assets/components/Chatbox.jsx"

function Chat() {
  return (
    <div id='chat-main-div'>
     <div id="chat-main-left">
        <div id='left-inner-title'>CHATS</div>
        <div id="left-inner-body">
            <p className="userchat"> <div className="userimagediv"><img src={img} alt="" className='user-image' /></div><div className="username"> user1</div></p>
            <p className="userchat">user2</p>
            <p className="userchat">user3</p>
            <p className="userchat">user4</p>
            <p className="userchat">user5</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
            <p className="userchat">user6</p>
        </div>
     </div>
     <Chatbox/>
    </div>
  )
}

export default Chat
