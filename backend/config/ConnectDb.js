const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ConnectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/crud").then(() => {

            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};
module.exports = ConnectDb;
