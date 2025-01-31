const mongoose = require("mongoose");


//* "User" collection schema 
const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
        trim : true,
        unique : true
    }, 
    email : {
        type : String, 
        required : true, 
        trim : true, 
        unique : true
    }, 
    role : {
        type : String, 
        required : true, 
        trim : true, 
        uppercase : true
    },
    isActive : {
        type : Boolean, 
        deafult : true 
    },
    password : {
        type : String, 
        required : true, 
        trim : true
    }
});




//* Create "User" collection 
const User = new mongoose.model("User", userSchema);



//* Export "User" collection 
module.exports = User;