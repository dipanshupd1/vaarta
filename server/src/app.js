const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const User=require("../src/modals/usermodal.js")
const http = require('http');
const cors = require('cors');
const app=express();
mongoose.connect('mongodb://localhost:27017/user',{
    useNewUrlParser:true
})
                .then(()=>{
                    console.log("connected to database");
                }).catch((err)=>console.log(err))
let server=http.createServer(app)
const io=socketIO(server,{
    cors:{
        origin:['http://localhost:5173']
    }
})

app.use(express.json())
app.use(cors())

let userlogged;
io.on('connection',(socket)=>{
    socket.on('userlogged',(msg)=>{
        socket.join(msg.name)
        // userlogged=msg.name
        // socket.id=userlogged
        // console.log('id is ',socket.id)


        socket.on("send",(msg)=>{
            console.log(msg);
            console.log(socket.id);
            socket.to('hello').emit('recieve',msg)
    
        })
        
    })
   

})


app.get('/',(req,res)=>{
    res.send('hii')
})

app.post('/login',async(req,res)=>{
    let username=req.body.userName
    let password=req.body.password
    // console.log(username,password)
    try {
        const finduser= await User.findOne({username})
        let fetchPassword=finduser.password
        // console.log(`your pass ${password} ${typeof(password)} pass from database ${fetchPassword} ${typeof(fetchPassword)}`)
      if(password===fetchPassword)
        res.send({
            msg:"successful"
        })
        else{
            res.send({
                msg:"invalid"
            })
        }
    } catch (error) {
        res.send({
            msg:"invalid"
        })
    }
   
})

app.post('/signup',async(req,res)=>{

    let username=req.body.userName
    let password=req.body.password
    console.log(username,password)
    try {
        const newuser= new User({

            username,
            password
        })
       await newuser.save();
        res.send({
            msg:"successful"
        })
    } catch (error) {
        res.send({
            msg:"error"
        })
    }

})

app.post('/find',async(req,res)=>{

    const friend=req.body.friendName;
    const loggedUser=req.body.userLogged
    console.log(loggedUser)

    const findFriend=await User.findOne({username:friend})

    if(findFriend && findFriend.username!=loggedUser){
       const saveUser=await User.findOneAndUpdate({username:loggedUser},{$addToSet:{friends:{friendName:friend}}},{new:true})
       const friendList=new Set()
       for(i=0;i<saveUser.friends.length;i++){
        // console.log(saveUser.friends[i].friendName)
        friendList.add(saveUser.friends[i].friendName)
       }
       const frndArray=Array.from(friendList)
       for(i=0;i<frndArray.length;i++)
       console.log('array',frndArray[i])
        res.send({
        msg:true,
        data:frndArray
    })
}
    else{
        res.send({
            msg:false
        })
    }
})


server.listen(5000)