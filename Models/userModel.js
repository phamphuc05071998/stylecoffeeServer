const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "A user must have first name"],
  },
  lastName: {
    type: String,
    require: [true, "A user must have last name"],
  },
  email: {
    type: String,
    require: [true, "A user must have a email"],
    unique: [true, "This email is already used "],
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a email`,
    },
  },
  password: {
    type: String,
    require: [true, "A user must have a password"],
    validate: {
      validator: function (v) {
        return validator.isPassword(v);
      },
      message: (props) => `${props.value} is not a password`,
    },
  },
  passwordConfirm: {
    type: String,
    require: [true, "A user must have a passwordConfirm"],
    validate: {
      validator: function (v) {
        return this.password === v;
      },
      message: () => `password and passwordConfirm are not the same`,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordIsChanged: Boolean,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = "";
});
userSchema.methods.passwordIsCorrect = async function (
  myPlaintextPassword,
  hash
) {
  return await bcrypt.compare(myPlaintextPassword, hash);
};
const user = userSchema.model("User", userSchema);
module.exports = user;
