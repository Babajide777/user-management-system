import "reflect-metadata";
import { Service } from "typedi";
import {
  validateCreateUser,
  CreateUserDTO,
  validateLoginUser,
  LoginUserDTO,
} from "../dto/userDTO";
import { UserRepository } from "../repository/userRepository";
import { Response } from "express";
import { checkJwt, createAccessToken, createRefreshToken } from "../utils/jwt";
import { fail } from "../utils/response";
import { hashPassword, validatePassword } from "../utils/passwordHash";

@Service()
export class AuthService {
  constructor(private readonly _userRepository: UserRepository) {}

  async signUpUser(data: CreateUserDTO, res: Response) {
    const check = validateCreateUser.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser = await this._userRepository.getUserUsingEmail(data.email);
    if (checkUser) throw new Error("User already exists");

    data.password = hashPassword(data.password);

    const savedUser = await this._userRepository.saveUser(data);
    if (!savedUser[0]) throw new Error(`${savedUser[1]}`);

    let user: any = savedUser[1];

    let accessToken = createAccessToken(user.id);
    let refreshToken = createRefreshToken(user.id);

    console.log({ accessToken });
    console.log({ refreshToken });

    let editUser = await this._userRepository.editUserUsingMongoDBID(user.id, {
      refreshToken,
    });

    if (!editUser) throw new Error("Error updating refresh token");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
    });

    return {
      user: editUser,
      token: accessToken,
    };
  }

  async refresh(cookies: any, user: any, res: Response) {
    if (!cookies?.jwt) return fail(res, 204, "No cookie found");
    const { refreshToken } = cookies.jwt;

    const foundUser = await this._userRepository.getUserUsingRefreshToken(
      refreshToken
    );
    if (!foundUser) return fail(res, 204, "No cookie found");

    const check: any = await checkJwt(refreshToken);

    const { id, exp, err } = check;
    if (err) return fail(res, 403, "No cookie found");

    if (id && exp < Date.now()) {
      if (foundUser._id != user) fail(res, 403, "Ids do not match");

      let accessToken = createAccessToken(foundUser.id);
      let noPassUser = await this._userRepository.getUserUsingIDWithOutPassword(
        foundUser.id
      );

      return {
        user: noPassUser,
        token: accessToken,
      };
    } else {
      return fail(res, 401, "Expired token");
    }
  }

  async logout(cookies: any, user: any, res: Response) {
    if (!cookies?.jwt) return fail(res, 204, "No cookie found");
    const { refreshToken } = cookies.jwt;

    const foundUser = await this._userRepository.getUserUsingRefreshToken(
      refreshToken
    );

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return fail(res, 204, "No user with token was found");
    }

    const updateUser = await this._userRepository.editUserUsingId(
      foundUser.id,
      { refreshToken: "" }
    );

    if (!updateUser) return fail(res, 204, "Error updating user refresh token");

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return;
  }

  async loginUser(data: LoginUserDTO, res: Response) {
    const check = validateLoginUser.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const checkUser: any = await this._userRepository.getUserUsingEmail(
      data.email
    );
    if (!checkUser) throw new Error("Wrong Email or password");

    let passwordCheck = await validatePassword(
      data.password,
      checkUser.password
    );

    if (!passwordCheck) throw new Error("Wrong Email or password");

    let accessToken = createAccessToken(checkUser.id);
    let refreshToken = createRefreshToken(checkUser.id);

    let editUser = await this._userRepository.editUserUsingMongoDBID(
      checkUser.id,
      {
        refreshToken,
      }
    );

    if (!editUser) throw new Error("Error updating refresh token");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
    });

    return {
      user: editUser,
      token: accessToken,
    };
  }
}
