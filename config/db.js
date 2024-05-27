const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected `.bgMagenta.white);
    }
    catch(error){
        console.log(`MONGO Connect ERROR ${error}`.bgRed.white);
    }
};

module.exports = connectDB;