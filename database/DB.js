const mongoose = require('mongoose');

const connectDB = async ()=>{
 try {
    await mongoose.connect("mongodb://localhost:27017/Authentication");
    console.log("Database Connected Successfully");
 } catch (error) {
    console.log("Error in connecting the database" , error);
 }
}

module.exports = connectDB;