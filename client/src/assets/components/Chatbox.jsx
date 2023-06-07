import React, { useEffect, useRef, useState,useContext } from 'react'
import axios from 'axios'
import img from "/src/assets/user.png"
import { io } from "socket.io-client"
import Cookies from 'js-cookie'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlineMenu } from "react-icons/ai";
import FrndContext from '../../contexts/UserContext.js'
import { BsFillSendCheckFill } from "react-icons/bs";

function Chatbox(props) {
    const [menuClick,setMenuClick]=useState(false)
    let getdata=useContext(FrndContext)
const clickedMenu=()=>{
    setMenuClick(prev=>!prev)
    getdata.menuClicked(menuClick)
}
    const sentMsg = useRef()
    const newfriend = props.name
    const socket = io('http://localhost:5000')
    useEffect(() => {
        const userLogged = Cookies.get("username")

        socket.on("connect", () => {
            socket.id = userLogged
            // console.log('your socket id is ',socket.id);
            socket.emit('userlogged', { name: userLogged, friend: newfriend })
        })
// Getting messages
        const msgContainer = document.getElementById("chat-container")
        msgContainer.innerHTML = ""
        getmsg()
}, [newfriend])

// ############################# Use Effect Completed########################## 

    async function getmsg() {
        const loggeduser = Cookies.get('username')
        const friend = newfriend
        const msgdata = await axios.post("http://localhost:5000/findmsg", {
            loggeduser
        })

        if (msgdata.data.msg) {
            const msgArray = msgdata.data.msgdata
            const containter = document.getElementById('chat-container')
            msgArray.map((ele) => {
                // console.log(ele);
                const msgBox = document.createElement('div')
                if (ele.msgfrom == loggeduser && ele.msgto == friend) {
                    msgBox.classList.add('chat-me')
                    msgBox.innerText = ele.msgvalue
                    containter.appendChild(msgBox)
                }

                else if (ele.msgfrom == friend && ele.msgto == loggeduser) {
                    msgBox.classList.add('chat-other')
                    msgBox.innerText = ele.msgvalue
                    containter.appendChild(msgBox)
                }
            })
        }
    }
    // ###################### above function is to get msg from database ################

    useEffect(() => {
        socket.on('recieve', (msg) => {
            // console.log("from server ",msg)
            recievedMsg(msg);
        })
        return (() => socket.off("recieve"))
    }, [socket, newfriend])



    const recievedMsg = async (text) => {
        const loggeduser = Cookies.get('username')
        const friend = newfriend
        // console.log(`from server ${text.from} and from client ${newfriend}`)
        console.log(friend, text.from);
        console.log("done");
        if (text.from == friend) {
            const containter = document.getElementById('chat-container')
            const msgBox = document.createElement('div')
            msgBox.classList.add('chat-other')
            msgBox.innerText = text.msg
            containter.appendChild(msgBox)
        }

    }

    function sentToServer(msg, frnd) {
        const loggeduser = Cookies.get('username')
        socket.emit("send", {
            to: frnd,
            from: loggeduser,
            msg
        })
    }

    const handleSubmit = async (e) => {
        const loggeduser = Cookies.get('username')
        const friend = newfriend
        e.preventDefault()
        let msg = sentMsg.current.value
        sentToServer(msg, friend);
        const containter = document.getElementById('chat-container')
        const msgBox = document.createElement('div')
        msgBox.classList.add('chat-me')
        msgBox.innerText = sentMsg.current.value
        containter.appendChild(msgBox)
        sentMsg.current.value = ''

        const msgdatabase = await axios.post("http://localhost:5000/savemsg", {
            msg: msg,
            loggeduser,
            friend
        })

        if (msgdatabase.data.msg) {
            // console.log("from database ",msgdatabase.data)
        }
        else (
            console.log("error occured")
        )
    }


    const delchats=async()=>{
        console.log('clicked');
        const loggedUser=Cookies.get('username')
        console.log(loggedUser);
        const delmsg = await axios.post("http://localhost:5000/delchat", {
            loggedUser,
            friend:newfriend
        })
        console.log(delmsg.data.msg)
        if(delmsg.data.msg){
      
            window.location.reload()
        }
        
    }


    return (
        <div id="chat-main-right" style={props.css}>
            <div id="chat-box-title-bar">
                <div id='toggle' onClick={clickedMenu}><AiOutlineMenu/></div>
                <p id="chatbox-image"><img src={img} alt="" /></p>
                <div id="chatbox-name"><h4>{newfriend}</h4></div>
                <div id="delete" onClick={delchats} style={props.css2}><AiFillDelete /></div>
            </div>

            <div id="chat-container">

            </div>
            <div id="type-msg">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="typeMsg" id="msg-inp" placeholder='Type Your Message' ref={sentMsg} />
                    <button id="send-msg"  ><BsFillSendCheckFill/></button>
                </form>
            </div>
        </div>
    )
}

export default Chatbox
