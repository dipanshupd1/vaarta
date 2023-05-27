const express = require('express');
const cors = require('cors');
const app=express();
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('hii')
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    res.send({
        msg:"hiiiii"
    })
})
app.listen(5000)