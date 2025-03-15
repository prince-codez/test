const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;
    const connectionInstance = await mongoose.connect(URI);

    console.log("Database is connected successfully!");
    console.log(`DB HOST ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Connection error in Database", error);
    process.exit(1);
  }
};

module.exports = connectDB;
