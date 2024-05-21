import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8001;

import { connectDB } from "./src/config/dbConnect.js";
connectDB();

//middle wares
app.use(cors());
app.use(express.json());

//use morgan only for production
if (process.env.NODE_ENV !== "production") {
  //you cam leave this for the prod as well to tract the user requests
  app.use(morgan("dev"));
}

import userRouter from "./src/router/userRouter.js";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello how are you",
  });
});

//requests to user router hit here
app.use("/api/v1/users", userRouter);

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${port}`);
});
