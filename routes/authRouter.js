import { Router } from "express";

import {
  protect,
} from "../middelwares/authMiddelwares.js";
import {
  getAllUsers,
  getCurrent,
  login,
  logout,
  register,
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../schemas/usersSchema.js";

const router = Router();

router.get("/", protect, getAllUsers);

router.get("/current", protect, getCurrent);

router.post(
  "/register",
  validateBody(registerUserSchema),
  register
);

router.post("/login", validateBody(loginUserSchema), login);

router.post("/logout", protect, logout);

export default router;
