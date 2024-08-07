const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


const register = async (req, res) => {
  const { user_name, password } = req.body;

    if (!user_name || !password) {
      throw new BadRequestError("Please all the field must be filled");
    }

  const user = await UserModel.create({ ...req.body });
  //   const token = jwt.sign(
  //     { userId: user._id, userName: user.name },
  //     process.env.SECRET,
  //     { expiresIn: "30d" }
  //   );
  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getUser() }, token });
};

const userLogin = async (req, res) => {
  const { user_name,  password } = req.body;

    if (!user_name || !password) {
      throw new BadRequestError("Please all the field must be filled");
    }

  let user = await UserModel.findOne({ user_name });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }


  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }


  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user:  user.getUser(), token });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No job with id: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const {
    body: { ba_name, ba_phone, ba_location },
    params: { id: userId },
  } = req;

  if (ba_name === "" || ba_phone === "" || ba_location === "") {
    throw new BadRequestError("Ba phone, name and location cannot be found");
  }


  const user = await UserModel.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ user: user.getUser() });
};

module.exports = {
  register,
  userLogin,
  getUser,
  updateUser,
};
