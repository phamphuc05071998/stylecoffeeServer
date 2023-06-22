import catchAsync from "../utils/catchAsync";
import User from "./../Models/userModel";
import jwt from "jsonwebtoken";
exports.signUp = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, firstName, lastName } = req.body;
  const user = await User.create({
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
  });
  res.status(201).json({
    message: "success",
  });
});
