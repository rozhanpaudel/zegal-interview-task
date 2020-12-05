var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./controllers/index.js');
var queueRouter = require('./controllers/queue');

var socketio = require('socket.io');

require('dotenv').config();
const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.io = io;
  next();
});

//Routes

app.use('/', indexRouter);
app.use('/api', queueRouter);

// Run when client connects
io.on('connection', (socket) => {
  console.log('Client Connected ! ');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(PORT, function (error, done) {
  if (error) console.log('Server Listening Failed');
  else console.log('Server Listening to port ', PORT);
});
