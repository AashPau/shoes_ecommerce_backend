import JWT from "jsonwebtoken";
import { updateUser } from "../model/user/userModel.js";
import { insertToken } from "../model/session/sessionModel.js";

//create access jwt
export const signAccessJWT = (payload) => {
  const token = JWT.sign(payload, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15min",
  });
  insertToken({ token });
  return token;
};

//verify access jwt
export const verifyAccessJwt = (token) => {
  try {
    return JWT.verify(token, process.env.ACCESS_JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    return "Invalid Token";
  }
};

// create refresh JWT
export const signRefreshJWT = ({ email }) => {
  const refreshJWT = JWT.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};

//verify refresh jwt
