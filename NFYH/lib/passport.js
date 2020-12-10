module.exports = function (app) {
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  const models = require("../models");
  const crypto = require("crypto");

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: "32908212517-itn2arbkaj48lgm43ct0dgu53t1ga45f.apps.googleusercontent.com",
        clientSecret: "P55Sm-lLSp0t-9i_UmubqsCF",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
     
      async function (accessToken, refreshToken, profile, cb) {
        const {
          displayName,
          _json: { login: name, email }
        } = profile
        
        console.log(displayName);
        console.log(email);

        try {
          const user = await models.User.findOne({ where: {email: email} })
          //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니라면 신규 사용자 생성
          if (user) {
            user.email = email
            user.save()
            return cb(null, user) // user가 존재할 경우 => 로그인
          } else {
            const newUser = await models.User.create({ // user가 존재하지 않을 경우 => 구글 아이디 정보로 회원가입
              name: displayName,
              email: email,
              password: 'password',
              salt: 'salt'
            })
            return cb(null, newUser)
          }
        } catch (error) {
          return cb(error)
        }
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
