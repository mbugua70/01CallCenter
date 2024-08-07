const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    console.log(err);
    throw new UnauthenticatedError("Authentication invalids");
  }
};

module.exports = auth;
