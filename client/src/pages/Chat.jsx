import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import "/src/assets/css/Chat.css"
import axios from 'axios'
import Chatbox from "/src/assets/components/Chatbox.jsx"
import ChatBanner from '../assets/components/ChatBanner'
import Chatlist from '../assets/components/Chatlist'
import FrndContext from '../contexts/UserContext'
import { AiOutlineMenu } from "react-icons/ai";

function Chat() {
let frnd
 
// const frnd=Cookies.get('friend')
const [showMenu,setShowMenu]=useState(true)
  const [friends,setFriends]=useState("")
  const [clickFriend,setClickFriend]=useState()
  const [showBanner,setShowBanner]=useState(true)
  const friendId = useRef()
  let cancelStyle = {}
  const [cancelFlag, setCancelFlag] = useState(true)
  const[notFriendFlag,setNotFriendFlag]=useState(false)
  
  useEffect(()=>{

    const getUser=async()=>{
      const userName=Cookies.get("username")
      const findUser = await axios.post("http://localhost:5000/search", {
        userName
      })
      // console.log(findUser.data.data)
      if(findUser.data.msg){
        setFriends(findUser.data.data)
        // setClickFriend(ele.friendName)
        // setShowBanner(false)
      }
      else{
        console.log("error");
      }
    }
    getUser()
  },[])

 
 
 
  const getdata=(name)=>{
    frnd=name
    // console.log(frnd)
    setClickFriend(frnd)
    setShowBanner(false)
}
  
  // console.log(friends);
  // console.log("your cookie ",Cookies.get("username")); 

  const addFriend = () => {
    setCancelFlag(false)

  }

  const handleCancel = (e) => {
    e.preventDefault()
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

    const sideUser = document.getElementById('adduser')
   
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
        setFriends(findUser.data.data)
         
        setNotFriendFlag(false)

      }
      else{
        console.log('invalid');
        setNotFriendFlag(true)
      }

    } catch (error) {
      console.log(error)
    }
   
 
      friendId.current.value=""
     
        setCancelFlag(true)
     

  }


  if(notFriendFlag){
  // notFriendStyle={display:'block'}
  setTimeout(()=>{
    setNotFriendFlag(false)
  },3000)
   }

   let menuStyle={}
   let titlestyle={}
   let boxstyle={}
  let chatboxstyle={}
  let delbtnStyle={}
const menuClicked=(set)=>{
  // console.log(set)
  setShowMenu(set)
}

if(!showMenu){
   menuStyle={transform:'translateX(-100%)',transition:'500ms'}
   titlestyle={display:'none'}
   boxstyle={width:'0vw',transition:'500ms'}
   chatboxstyle={width:'100vw',transition:'500ms'}
   delbtnStyle={display:'block'}
}
else{
  menuStyle={transform:'translateX(0%)',transition:'500ms'}
  titlestyle={display:'block'}
  if(screen.width>525){
    boxstyle={width:'30vw',transition:'500ms'}
  chatboxstyle={width:'70vw',transition:'500ms'}
  }
  else{
    boxstyle={width:'40vw',transition:'500ms'}
  chatboxstyle={width:'60vw',transition:'500ms'}
  }
  delbtnStyle={display:'none'}
}






  return (
    <FrndContext.Provider value={{getdata,menuClicked}}>
    <div id='chat-main-div'>
      <div id="chat-main-left" style={boxstyle}>
        <div id='left-inner-title' ><div id="menu-chat"></div><div style={titlestyle} id='chat-title'>CHATS</div> <div id='add-chat' onClick={addFriend} style={titlestyle}>+</div></div>
        <div id="left-inner-body" style={menuStyle}>
          <div id="friend-tab" style={cancelStyle}>
            Add Your Friend <br />
            <form>

              <input type="text" name="addFriend" id="input-friend-id" placeholder="Friend's Id" ref={friendId} /><br />
              {/* <p id='friend-invalid' style={notFriendStyle}> Invalid Id. Try Again</p> */}
              <button id='cancel-btn' onClick={handleCancel}>Cancel</button>
              <input type="submit" value='OK' id='friend-submit' onClick={handleSubmit}/>
            </form>
          </div>
          <div id="adduser">
          {friends ? friends.map((ele)=>{ return  <Chatlist key={ele._id} frndname={ele.friendName} /> }):""}
        
          </div>
        </div>
      </div>
      {showBanner?<ChatBanner/>:<Chatbox name={clickFriend} css={chatboxstyle} css2={delbtnStyle} clickd={menuClicked}/>}
      {/* <Chatbox name={clickFriend}/> */}
    </div>
    </FrndContext.Provider>
   
  )
}

export default Chat
