import { Request } from "express";
import Database from "../../Database";
import { app } from "../../App";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(function (username: string, password, done) {
    Database("users")
      .where({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  })
);

app.post(
  "/api/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
