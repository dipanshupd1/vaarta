const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const User=require("../src/modals/usermodal.js")
const http = require('http');
const cors = require('cors');
const app=express();
const mongoUrl=  'mongodb+srv://dipanshupd123:dipanshuvaartaproject12345@cluster0.jredtbo.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUrl,{
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
    socket.on('userlogged',(data)=>{
        socket.join(data.name)
        const friend=data.friend
        // io.emit("welcome","hello")



        socket.on("send",(msg)=>{
            console.log('from client',msg);
            socket.to(friend).emit('recieve',msg)
    
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
        const userDetail=await User.findOne({username:loggedUser})
        // console.log(userDetail.friends);
        let flag=true
        for(let i=0;i<userDetail.friends.length;i++)
        {
                if(userDetail.friends[i].friendName==friend)
                flag=false
        }
        if(flag){
            const saveUser=await User.findOneAndUpdate({username:loggedUser},{$addToSet:{friends:{friendName:friend}}},{new:true})
            const frndArray=saveUser.friends
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
      
}
    else{
        res.send({
            msg:false
        })
    }
})


app.post('/search',async(req,res)=>{

    const userLogged=req.body.userName

    const findUser=await User.findOne({username:userLogged})

    const getFriends=findUser.friends

    res.send({
        msg:true,
        data:getFriends
    }
    )
})

app.post('/del',async(req,res)=>{

    const frnd=req.body.delFrnd
    const loggedUser=req.body.loggedUser
    try {
        const del=await User.findOneAndUpdate({username:loggedUser},{$pull:{friends:{friendName:frnd}}},{new:true})
        res.send({
            msg:true
        })
    } catch (error) {
        res.send({
            msg:err
        })
    }
    
})


app.post("/savemsg",async(req,res)=>{

    const msg=req.body.msg
    const loggedUser=req.body.loggeduser
    const frnd=req.body.friend

    try {
        const savemsg=await User.findOneAndUpdate({username:loggedUser},{$push:{chats:{msgfrom:loggedUser,msgto:frnd,msgvalue:msg}}},{new:true})
        const savemsgfrnd=await User.findOneAndUpdate({username:frnd},{$push:{chats:{msgfrom:loggedUser,msgto:frnd,msgvalue:msg}}},{new:true})
        res.send({
            msg:true,
            data:savemsg.chats,
            data2:savemsgfrnd.chats
        })
    } catch (error) {
        res.send({
            msg:false,
            data:error
        })
    }
})

app.post("/delchat",async(req,res)=>{
    const user=req.body.loggedUser
    const friend=req.body.friend
    // const del=User.findOneAndUpdate({username:user},{$pull:{chats}},{new:true})
        try {
            const del=await User.findOneAndUpdate({username:user},{$pull:{chats:{$or:[{msgto:friend},{msgfrom:friend}]}}},{new:true})
            res.send({
                msg:true
            })
        } catch (error) {
            res.send({
                msg:false
            })
        }
    
})

app.post('/findmsg',async(req,res)=>{
    const loggeduser=req.body.loggeduser
    try {
        const msg=await User.findOne({username:loggeduser})
        // const chats=msg
        // console.log(msg)
        res.send({
            msg:true,
            msgdata:msg.chats
        })
        
    } catch (error) {
        res.send({
            msg:false,
            msgdata:error
        })

    }
   

})

server.listen(5000)