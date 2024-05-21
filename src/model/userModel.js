import userSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  const newUser = new userSchema(userObj);
  return newUser.save();
};
export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
export const updateUser = async (filter, obj) => {
  return await userSchema.findOneAndUpdate(filter, obj);
};
