import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import "reflect-metadata";
import { UserService } from "../services/userService";
import { AddWorkerDTO } from "../dto/userDTO";
import { fail, success } from "../utils/response";
import { isJSON } from "../utils/isJSON";

@Service()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  async addWorker(req: Request, res: Response, next: NextFunction) {
    try {
      let request: AddWorkerDTO = req.body;
      let savedWorker = await this._userService.addWorker(request);
      return success(res, 201, savedWorker, "Worker saved successfully");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(res, 400, message);
    }
  }

  // async editQuiz(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     let request: EditQuizDTO = {
  //       id: req.params.id,
  //       ...req.body,
  //     };
  //     let editedQuiz = await this._quizService.editQuiz(request);
  //     return success(res, 200, editedQuiz, "Quiz edited successfully");
  //   } catch (error: any) {
  //     let message = isJSON(error.message);
  //     return fail(res, 400, message);
  //   }
  // }
}
