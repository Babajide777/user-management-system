import { Service } from "typedi";
import { Document } from "mongoose";
import { AddUserDTO } from "../dto/userDTO";
import { User, IUser } from "../entity/User";
import { Counter, ICounter } from "../entity/Counter";

@Service()
export class UserRepository {
  async saveUser(
    data: AddUserDTO
  ): Promise<[boolean, Document<unknown, {}, IUser> | string]> {
    let savedUser = await Counter.findOneAndUpdate(
      { id: "count" },
      { $inc: { seq: 1 } },
      { new: true }
    ).then((res) => {
      let seqNum;

      if (res == null) {
        const newCount = new Counter({
          id: "count",
          seq: 1,
        });
        newCount.save();
        seqNum = 1;
      } else {
        seqNum = res.seq;
      }

      let newData = { ...data, userID: seqNum };

      let theUser = new User(newData);
      theUser.save();

      return theUser;
    });

    return savedUser ? [true, savedUser] : [false, "Error saving User"];
  }

  async getUserUsingEmail(
    email: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ email, deleted: false });
  }

  async getUserUsingID(
    userID: number
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ userID, deleted: false });
  }

  async editUserUsingId(
    userID: number,
    item: object
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOneAndUpdate({ userID, deleted: false }, item, {
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

  async editUserUsingMongoDBID(
    id: string,
    item: object
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOneAndUpdate({ _id: id, deleted: false }, item, {
      new: true,
    });
  }

  async getUserUsingMongoDBID(
    id: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOne({ _id: id, deleted: false });
  }

  async deleteUserUsingMongoDbId(
    id: string
  ): Promise<Document<unknown, {}, IUser> | null> {
    return await User.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
  }

  async getAllUsers(): Promise<Document<unknown, {}, IUser>[]> {
    return await User.find({ deleted: false });
  }
}
