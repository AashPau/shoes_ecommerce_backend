import { findToken } from "../model/session/sessionModel.js";
import { getUserByEmail } from "../model/user/userModel.js";
import { verifyAccessJwt } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    //1. receive jwt via auth header
    const { authorization } = req.headers;

    //2. verify if jwt is valid (noexpired, secret key) by decoding jwt
    //basically checking if the token has the same "secret key"
    const decoded = verifyAccessJwt(authorization);

    if (decoded?.email) {
      //3. check if the token exist in the DB, session table
      const tokenObj = await findToken(authorization);

      if (tokenObj?._id) {
        //take the email from decoded JWT
        //search for the user with that email in user collection
        const user = await getUserByEmail(decoded.email);

        if (user?._id) {
          //if the user exists, they are now authorized
          user.password = undefined;
          req.userInfo = user;

          return next();
        } else {
          return res.json({ message: "user not found" });
        }
      }
    } else {
      const error = { message: "Unauthorized", status: 403 };
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
