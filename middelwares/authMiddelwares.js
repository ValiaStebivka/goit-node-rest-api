import { HttpError } from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { checkToken } from "../services/jwtService.js";



export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  const user = await checkToken(token)

  if (!user) throw HttpError(401, "Not authorized");

  req.user = user;

  next();
});
