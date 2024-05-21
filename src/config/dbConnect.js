import mongoose from "mongoose";
const url = process.env.MONGODB_URL;

export const connectDB = () => {
  try {
    const con = mongoose.connect(url);
    con && console.log("databse connected");
  } catch (error) {
    console.log(error);
  }
};
