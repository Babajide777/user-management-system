import express, { Router } from "express";
import Container from "typedi";
import { AuthController } from "../controllers/authController";
import passport from "../config/passport";

const router: Router = express.Router();

const authController = Container.get(AuthController);

//auth

router.post("sign-up", (req, res, next) =>
  authController.signUpUser(req, res, next)
);
router.get(
  "refresh",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => authController.refresh(req, res, next)
);
router.get(
  "logout",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => authController.logout(req, res, next)
);
router.post("login", (req, res, next) => authController.login(req, res, next));

export default router;
