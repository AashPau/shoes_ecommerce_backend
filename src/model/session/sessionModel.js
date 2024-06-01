import sessionSchema from "./sessionSchema.js";

//add token
export const insertToken = (obj) => {
  return sessionSchema(obj).save();
};

//search token
export const findToken = (token) => {
  return sessionSchema.findOne({ token });
};
