import passport from "passport";
import passportLocal from "passport-local";
import { getRepository } from "typeorm";
import passportJwt from "passport-jwt";
import Bcrypt from "bcrypt";
import User from "../entity/User";

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const userRepository = getRepository("user");
const ExtractJwt = passportJwt.ExtractJwt;

interface Options {
  jwtFromRequest: string;
  secretOrKey: string;
  issuer: string;
  audience: string;
  ignoreExpiration: boolean;
}

const opts: Options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
  issuer: "accounts.examplesoft.com",
  audience: "yoursite.net",
  ignoreExpiration: false
};

passport.use(
  new JwtStrategy(opts, function(jwtPayload, done) {
    userRepository
      .findOne(jwtPayload.sub)
      .then((user: User) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(error => {
        return done(error, false);
      });
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      userRepository
        .find({ where: [{ email: username }] })
        .then((user: User | any) => {
          if (!User) {
            return done(null, false);
          }

          Bcrypt.compare(password, user.password).then(response => {
            if (!response) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch(error => {
          return done(error, false);
        });
    }
  )
);
export default passport;
