import { Service } from "typedi";
import "reflect-metadata";
import { AuthService } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { isJSON } from "../utils/isJSON";
import { fail, success } from "../utils/response";
import { CreateUserDTO, LoginUserDTO } from "../dto/userDTO";

@Service()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  async signUpUser(req: Request, res: Response, next: NextFunction) {
    try {
      let request: CreateUserDTO = req.body;
      let createdUser = await this._authService.signUpUser(request, res);
      return success(res, 201, createdUser, "User created successfully");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      let cookies = req.cookies;
      let user = req.user;

      let theUser = await this._authService.refresh(cookies, user, res);
      return success(res, 200, theUser, "Successfull");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      let cookies = req.cookies;
      let user = req.user;

      console.log({ cookies });
      console.log({ user });

      await this._authService.logout(cookies, user, res);
      return success(res, 200, "", "Logout Successfull");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let request: LoginUserDTO = req.body;
      let user = await this._authService.loginUser(request, res);
      return success(res, 200, user, "User login success");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }
}
