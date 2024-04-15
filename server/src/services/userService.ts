import { Service } from "typedi";
import { UserRepository } from "../repository/userRepository";
import {
  validateAddUser,
  validateEditUser,
  AddUserDTO,
  EditUserDTO,
  IdDTO,
  validateID,
} from "../dto/userDTO";

@Service()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async addUser(data: AddUserDTO) {
    const check = validateAddUser.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser = await this._userRepository.getUserUsingEmail(data.email);
    if (checkUser) throw new Error("User with Email already exists");

    const theUser = await this._userRepository.saveUser(data);

    if (!theUser[0]) throw new Error(`${theUser[1]}`);
    return theUser[1];
  }

  async editUser(data: EditUserDTO) {
    const check = validateEditUser.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser = await this._userRepository.getUserUsingID(data.id);
    if (!checkUser) throw new Error("Worker does not exist");

    const { id, ...item } = data;

    const theUser = await this._userRepository.editUserUsingId(data.id, item);

    if (!theUser) throw new Error("Error editing User");
    return theUser;
  }

  async deleteUser(data: IdDTO) {
    const check = validateID.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser = await this._userRepository.getUserUsingMongoDBID(data.id);
    if (!checkUser) throw new Error("User does not exist");

    const theUser = await this._userRepository.deleteUserUsingMongoDbId(
      data.id
    );

    if (!theUser) throw new Error("Error deleting User");
    return "User Deleted successfully";
  }

  async getAllUsers() {
    return await this._userRepository.getAllUsers();
  }
}
