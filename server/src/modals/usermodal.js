const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    password:{
        type:String,
        required:true,
    },
    friends:[{
        friendName:{type:String}
    }],
    chats:[{
        msgfrom:{type:String},
        msgto:{type:String},
        msgvalue:{type:String}
    }]
})

const User=new mongoose.model("User",userSchema);

module.exports=User;