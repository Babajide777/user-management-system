import express, { Router, Request } from "express";
import { Container } from "typedi";
import "reflect-metadata";
import { UserController } from "../controllers/userController";

const router: Router = express.Router();

const userController = Container.get(UserController);

router.post("add-worker", (req, res, next) =>
  userController.addWorker(req, res, next)
);

export default router;
