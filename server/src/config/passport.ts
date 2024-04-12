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
    (jwtPayload: JwtPayload, done) => {
      let user: any = User.findById(jwtPayload.id);
      if (jwtPayload.id === user._id) {
        return done(null, jwtPayload);
      } else {
        return done(null, false);
      }
    }
  )
);

export default passport;
