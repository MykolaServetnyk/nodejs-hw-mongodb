import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userSignupSchema, userLogInSchema } from "../validation/users.js";

import { registerController, logInController, refreshController, logoutController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userLogInSchema), ctrlWrapper(logInController))

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController))

export default authRouter;
