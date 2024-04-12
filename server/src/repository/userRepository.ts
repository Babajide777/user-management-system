import { Service } from "typedi";
import { Document } from "mongoose";
import { AddUserDTO } from "../dto/userDTO";
import { User, IUser } from "../entity/User";

@Service()
export class UserRepository {
  async saveUser(
    data: AddUserDTO
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

  async getUserUsingID(
    ID: number
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ ID, deleted: false });
  }

  async editUserUsingId(
    ID: number,
    item: object
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOneAndUpdate({ ID, deleted: false }, item, {
      new: true,
    });
  }

  async getUserUsingRefreshToken(
    refreshToken: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ refreshToken, deleted: false });
  }

  async getUserUsingIDWithOutPassword(
    id: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ _id: id, deleted: false }).select("-password");
  }
}
