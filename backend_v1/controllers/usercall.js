const UserCallModel = require("../models/UserCalls");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");



const createCallData = async (req, res) => {


   const {
    name, phone, duration, office, call_type, comments
   } = req.body


  //   validation
  if ((!name, !phone, !duration, !office, !call_type, !comments)) {
    throw new BadRequestError("Please fill all the required fill");
  }

  const calls = await UserCallModel.create({

    name,
    phone,
    duration,
    office,
    call_type,
    comments
  });

  if (!calls) {
    throw new UnauthenticatedError("Invalid entries");
  }

  res.status(StatusCodes.CREATED).json({ calls });
};


module.exports = createCallData;
