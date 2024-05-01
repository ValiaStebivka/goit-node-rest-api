import { HttpError } from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { loginUserDataValidator, registerUserDataValidator } from "../helpers/userValidator.js";
import {
  deleteToken,
  listUsers,
  loginUser,
  registerUser,
} from "../services/usersService.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await listUsers();
  res.status(200).json(users);
});

export const register = catchAsync(async (req, res) => {
   const { email, password } = req.body;

  if (!password || password.trim() === "") {
    throw HttpError(400, "Password is required");
  }

  const { value, error } = registerUserDataValidator({
    email,
    password,
  });

  if (error) {
    throw HttpError(400, "Bad Request", error);
  }


  req.body = value;
  const  newUser  = await registerUser({ ...req.body });
  res.status(201).json({
    newUser: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});


export const login = catchAsync(async (req, res) => {
    const { value, error } = loginUserDataValidator(req.body);
  if (error) throw new HttpError(400, "Bad request", error);
  req.body = value;
  
  const { user, token } = await loginUser({ ...req.body });

  const { email, subscription } = user;
  res.status(200).json({
    user: {
      email: email,
      subscription: subscription,
    },
    token,
  });
});

export const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await deleteToken(_id);

  res.sendStatus(204);
});
