const mongoose = require("mongoose")
require("dotenv").config()
const URI = "mongodb://127.0.0.1:27017/mern-admin"



const connectDb = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_DB_ATLAS);
        await mongoose.connect(URI);
        console.log("connection successful");
    } catch (error) {
        console.error(error)
        process.emit(0)
    }
}
module.exports = connectDb;