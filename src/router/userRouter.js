import express from "express";
import { createNewUser, getUserByEmail } from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joivalidation.js";

const router = express.Router();

// Create new user
router.post("/", newUserValidation, async (req, res, next) => {
  try {
    //hash the password before sending it
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.status(201).json({
          status: "success",
          message: "Account created successfully",
        })
      : res.status(500).json({
          status: "error",
          message: "Failed to create an account, please try later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.status = 200;
      error.message =
        "The email is already in use. Please use different account";
    }
    next(error);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if the email has @ and if the password exists
    if (!email.includes("@") || !password) {
      throw new Error("Invalid login details");
    }
    //get user by email
    const user = await getUserByEmail(email);

    if (user?._id) {
      //check if passwords match
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        return res.status(200).json({
          status: "success",
          message: "passwords match",
        });
      } else {
        return res.status(400).json({
          status: "error",
          message: "passwords do not match",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
