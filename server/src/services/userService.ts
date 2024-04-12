import { Service } from "typedi";
import { UserRepository } from "../repository/userRepository";

@Service()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}
}
