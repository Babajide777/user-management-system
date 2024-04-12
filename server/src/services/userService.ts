import { Service } from "typedi";
import { UserRepository } from "../repository/userRepository";
import { AddWorkerDTO, validateAddWorker } from "../dto/userDTO";

@Service()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async addWorker(data: AddWorkerDTO) {
    const check = validateAddWorker.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser = await this._userRepository.getUserUsingEmail(data.email);
    if (checkUser) throw new Error("User with Email already exists");

    const theUser = await this._userRepository.saveWorker(data);

    if (!theUser[0]) throw new Error(`${theUser[1]}`);
    return theUser[1];
  }
}
