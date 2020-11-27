var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { sequelize } = require('./models');
const session = require('express-session');

sequelize.sync({ })
.then(() => {
 console.log('데이터베이스 연결 성공.');
}).catch((error) => {
 console.error(error);
});

// --------------Router----------------------
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var postRouter = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.engine('html', require('ejs').renderFile); // html을 사용하기 위한 처리
app.set('view engine', 'html'); // html을 사용하기 위한 처리

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // send the error page
  err.status = err.status || 500;
  res.status(err.status).send(
    "<title>" + err.status + " ERROR </title>" +
    "<h1>" + err.status + "</h1>" +
    "<h1>" + err.message + "</h1>" +
    "<pre>" + err.stack + "</pre>");
});

module.exports = app;
