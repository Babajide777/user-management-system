import express, { Router, Request } from "express";
import { Container } from "typedi";
import "reflect-metadata";
import { UserController } from "../controllers/userController";

const router: Router = express.Router();

const userController = Container.get(UserController);

router.post("/add-user", (req, res, next) =>
  userController.addUser(req, res, next)
);

router.put("/edit-user/:id", (req, res, next) =>
  userController.editUser(req, res, next)
);

router.delete("delete-user/:id", (req, res, next) =>
  userController.deleteUser(req, res, next)
);

router.get("get-all-categories", (req, res, next) =>
  quizController.getAllQuizCategories(req, res, next)
);

export default router;
