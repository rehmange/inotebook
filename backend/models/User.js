const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default: Date.now
        }
  });
const User = mongoose.model('user',UserSchema);
// User.createIndexes();
//we do this we want only one entry for a specific email
// we won't use this because it create a index in mongoodb we use other technique in auth.js
module.exports = User;