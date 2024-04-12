import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import "reflect-metadata";
import { UserService } from "../services/userService";
import { AddUserDTO, EditUserDTO } from "../dto/userDTO";
import { fail, success } from "../utils/response";
import { isJSON } from "../utils/isJSON";

@Service()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      let request: AddUserDTO = req.body;
      let savedUser = await this._userService.addUser(request);
      return success(res, 201, savedUser, "User saved successfully");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      let request: EditUserDTO = {
        id: req.params.id,
        ...req.body,
      };
      let editedUser = await this._userService.editUser(request);
      return success(res, 200, editedUser, "User edited successfully");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }
}
