const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongoose = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose")
    });
}

module.exports = connectToMongoose