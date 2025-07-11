import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

router.route("/me").get(authControllers.getMe);

router.route("/logout").get(authControllers.LogOut);
export const authRoutes = router;
