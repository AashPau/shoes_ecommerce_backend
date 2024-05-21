import express from "express";
import { createNewUser } from "../model/userModel.js";

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
  try {
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
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export default router;
