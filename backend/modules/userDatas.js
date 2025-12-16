const mongoose= require("mongoose");
const userDataSchema=new mongoose.Schema({
    id:Number,
    name:String,
    age:Number,
    gender:String,
    email:String,
    password:String
});
const UserData=mongoose.model("UserData",userDataSchema);
module.exports=UserData;
