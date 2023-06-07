import React, { useState, useContext, useEffect } from 'react'
import img from "/src/assets/user.png"
import axios from 'axios'
import FrndContext from '../../contexts/UserContext'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import Cookies from 'js-cookie'
function Chatlist(props) {

    let getdata = useContext(FrndContext)

    const friendClicked = () => {
        getdata.getdata(props.frndname)

        // console.log("props.name ",props.frndname)
    }



    let delStyle = {}
    let userStyle = {}
    const [delFlag, setDelFlag] = useState(false)

    const delclicked = () => {
        setDelFlag(true)

    }

    if (delFlag) {

        delStyle = { display: "flex" }
        userStyle = { display: 'none' }

    }
    else {
        delStyle = { display: "none" }
        userStyle = { display: 'flex' }
    }

    const canceled = () => {
        setDelFlag(false)
    }

    const confirmed = async () => {
        const loggedUser = Cookies.get('username')
        const deluser = await axios.post(`${import.meta.env.VITE_CL_DOMAIN}/del`, {
            delFrnd: props.frndname,
            loggedUser
        })
        if (deluser.data.msg) {
            console.log("done");
            window.location.reload()
        }
        else {
            console.log(deluser.data.msg);
        }


    }



    return (
        <div>
            <div id="userchat" style={userStyle} onClick={friendClicked} > 
            <div id="userimagediv"><img src={img} alt="" id='user-image' /></div>
            <div id="username">{props.frndname}</div>
            <div id="delete-user" onClick={delclicked}><IoRemoveCircleOutline /></div>
            </div>
            <div id="userchatdel" style={delStyle}><div id="canfinal" onClick={canceled}>Cancel</div><div id="delfinal" onClick={confirmed}>Confirm</div></div>
        </div>
    )
}

export default Chatlist
