import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import "reflect-metadata";
import { UserService } from "../services/userService";

@Service()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  async addWorker(req: Request, res: Response, next: NextFunction) {}
}
