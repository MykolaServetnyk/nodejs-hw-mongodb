import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userSignupSchema, userLogInSchema } from "../validation/users.js";

import { requestResetEmailSchema } from '../validation/auth.js';

import { registerController, logInController, refreshController, logoutController, requestResetEmailController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userLogInSchema), ctrlWrapper(logInController))

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post('/reset-password');


export default authRouter;
