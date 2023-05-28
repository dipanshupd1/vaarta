const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const app=express();
let server=http.createServer(app)
const io=socketIO(server,{
    cors:{
        origin:['http://localhost:5173']
    }
})
app.use(express.json())
app.use(cors())


io.on('connection',(socket)=>{
console.log(socket.id)
})


app.get('/',(req,res)=>{
    res.send('hii')
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    res.send({
        msg:"hiiiii"
    })
})

app.post('/signup',(req,res)=>{
    console.log(req.body)
    res.send({
        msg:"hiiiii"
    })
})


server.listen(5000)