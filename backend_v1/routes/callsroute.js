const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentication");
const createCallData = require('../controllers/usercall');




// router.use(auth);
router.route('/').post(createCallData);



module.exports = router;