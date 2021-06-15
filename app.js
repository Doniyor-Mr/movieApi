const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const moviesRouter =require('./routes/movies')
const directorRouter = require('./routes/director')

const app = express();

//todo || mongo dbga ulanish

const db = require('./helper/db');
db()

//todo " config secret key : mahfiy kalit
const config = require('./config')
app.set('secret_key',config.secret_key) //bu yerga osha kalit sozni yozamiz

//todo || middleware ==

const tokenVerify = require('./middleware/token-verify');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/api', tokenVerify);// agartogri cqsa '/api' orqali movies ga  kiradi
app.use('/api/movies', moviesRouter)
app.use('/api/director', directorRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
