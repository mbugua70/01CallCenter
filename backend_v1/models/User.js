const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const { hash } = require("bcryptjs");
const bcrypt = require("bcryptjs");



const UserSchema = new Schema({
  user_name: {
    type: String,
    required: [true, "Please insert your name"],
    minLength: [3, "Your name is too short"],
  },
  password: {
    type: String,
    required: [true, "Please insert  password"],
    minLength: [8, "Password is less than 8 character"],
  },

});


// creating an instance method

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, userName: this.user_name },
    process.env.SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};


UserSchema.methods.getUser = function () {
  return {
    userId: this._id,
    user_name: this.user_name,

  };
};


UserSchema.methods.comparePassword = async function (mainpassword) {
  console.log(mainpassword)
  return await bcrypt.compare(mainpassword, this.password);
};

// pre save middleware
UserSchema.pre("save", async function () {
  //    hashing the password
  const salt = await bcrypt.genSalt(15);
  this.password = await hash(this.password, salt);
});


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;