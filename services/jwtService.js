import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/HttpError.js";
import dotenv from "dotenv";
import { getUserByIdService } from "./usersService.js";

dotenv.config();

export const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET);

export const checkToken = async(token) => {
  if (!token) throw HttpError(401, "Not authorized");
  
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByIdService(id)
    if ( user.token !== token) {
   throw HttpError(401, "Not authorized");
      
    }
    return user;
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};
