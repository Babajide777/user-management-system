import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../entity/User";
import { JWT_SECRET } from "./env";

export interface JwtPayload {
  id: string;
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET as string,
    },
    async (jwtPayload: JwtPayload, done) => {
      console.log({ jwtPayload });
      let user: any = await User.findById(jwtPayload.id);

      console.log({ user });
      if (jwtPayload.id === user.id) {
        return done(null, jwtPayload);
      } else {
        return done(null, false);
      }
    }
  )
);

export default passport;
