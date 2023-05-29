import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import "/src/assets/css/Chat.css"
import axios from 'axios'
import img from "/src/assets/user.png"
import Chatbox from "/src/assets/components/Chatbox.jsx"

function Chat() {
  const friendId = useRef()
  let cancelStyle = {}
  let notFriendStyle={}
  const [cancelFlag, setCancelFlag] = useState(true)
  const[notFriendFlag,setNotFriendFlag]=useState(false)
  
  // console.log("your cookie ",Cookies.get("username")); 

  const addFriend = () => {
    setCancelFlag(false)

  }

  const handleCancel = () => {
    setCancelFlag(true);
    // console.log(cancelFlag);

  }
  if (cancelFlag) {
    cancelStyle = { height: "0", padding: '0' }
  }
  else {
    cancelStyle = { height: '25%', padding: "1rem 0" }
  }
 


  const handleSubmit = async (e) => {


    e.preventDefault()

    const sideBar = document.getElementById('adduser')
    sideBar.innerHTML=""
    const friend = friendId.current.value
    const userLogged=Cookies.get("username") 
    // console.log('user',userLogged)

    try {
      const findUser = await axios.post("http://localhost:5000/find", {
        friendName: friend,
        userLogged
      })
      // console.log(findUser.data.data)
      if (findUser.data.msg) {


        findUser.data.data.map((ele)=>{
          console.log(ele)

          const sideBar = document.getElementById('adduser')
        const newFriend = document.createElement('div')
        newFriend.classList.add("userchat")
        newFriend.innerHTML = ` <div class="userimagediv"><img src=${img} alt="" class='user-image' /></div><div class="username">${ele}</div>`
        sideBar.appendChild(newFriend)
        
        })
       
        setNotFriendFlag(false)

      }
      else{
        setNotFriendFlag(true)
      }

    } catch (error) {
      console.log(err)
    }
   
 
      friendId.current.value=""
     
      // setTimeout(()=>{
        setCancelFlag(true)
      // },3000)

  }


  if(notFriendFlag){
  notFriendStyle={display:'block'}
  setTimeout(()=>{
    setNotFriendFlag(false)
  },3000)
   }














  return (
    <div id='chat-main-div'>
      <div id="chat-main-left">
        <div id='left-inner-title'><div>CHATS</div> <div id='add-chat' onClick={addFriend}>+</div></div>
        <div id="left-inner-body">
          <div id="friend-tab" style={cancelStyle}>
            Add Your Friend <br />
            <form onSubmit={handleSubmit}>

              <input type="text" name="addFriend" id="input-friend-id" placeholder="Friend's Id" ref={friendId} /><br />
              {/* <p id='friend-invalid' style={notFriendStyle}> Invalid Id. Try Again</p> */}
              <button id='cancel-btn' onClick={handleCancel}>Cancel</button>
              <input type="submit" value='OK' id='friend-submit' />
            </form>
          </div>
          <div id="adduser">
            <div className="userchat"> <div className="userimagediv"><img src={img} alt="" className='user-image' /></div><div className="username"> user1</div></div>
          </div>
        </div>
      </div>
      <Chatbox />
    </div>
  )
}

export default Chat
