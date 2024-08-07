const express = require('express');
const router = express.Router();

const { userLogin, getUser, updateUser, register } = require("../controllers/auth");

// user routers
router.route("/login").post(userLogin);
router.route("/register").post(register);
// router.route("/register/:id").get(getUser).patch(updateUser);

module.exports = router;