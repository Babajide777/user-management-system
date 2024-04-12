import { Service } from "typedi";
import { Document } from "mongoose";
import { AddWorkerDTO } from "../dto/userDTO";
import { User, IUser } from "../entity/User";

@Service()
export class UserRepository {
  async saveWorker(
    data: AddWorkerDTO
  ): Promise<[boolean, Document<unknown, {}, IUser> | string]> {
    let theUser = new User(data);

    return (await theUser.save())
      ? [true, theUser]
      : [false, "Error saving User"];
  }

  async getUserUsingEmail(
    email: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ email, deleted: false });
  }
}
