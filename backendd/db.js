const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI =process.env.MONGO_URI
  // "mongodb://127.0.0.1:27017/inotebookdatabase";
const connectToMongo = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectToMongo;
