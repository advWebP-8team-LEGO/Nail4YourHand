module.exports = function (app) {
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: "32908212517-itn2arbkaj48lgm43ct0dgu53t1ga45f.apps.googleusercontent.com",
        clientSecret: "P55Sm-lLSp0t-9i_UmubqsCF",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user); // user객체가 deserializeUser로 전달됨.
  });
  passport.deserializeUser((user, done) => {
    done(null, user); // 여기의 user가 req.user가 됨
  });

  return passport;
};
