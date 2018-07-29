var express = require('express');
var socket_io    = require("socket.io");
var helmet = require('helmet');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var dotenv = require('dotenv');
// var env = dotenv.load();
require('dotenv').config();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cors = require('cors');
var compression = require('compression');
const MongoStore = require('connect-mongo')(session);

var databaseUrl = require('./config/database.js')[process.env.ENVIRONMENT || 'development'];
// configuration 
mongoose.connect(databaseUrl, { useMongoClient: true}); // connect to our database

var app = express();

// Socket.io
var io = socket_io();
app.io = io;
// next line is the money
// app.set('socketio', io);

var routes = require('./routes/socket.route')(io);

app.use(function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  res.header('Access-Control-Request-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
  
});

app.use(compression());
app.use(helmet());


app.use(cookieParser());

var sessionMiddleware = session({
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  // store: new MongoStore({ url: 'mongodb://apmeena:12345@ds245357.mlab.com:45357/live-db'}),
  resave: false,
  saveUninitialized: false,
  name: 'Session-Id',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60000 * 60 * 10, // 10 hrs
    sameSite: false
  }
});

require('./config/passport')(passport); // pass passport for configuration

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

var index = require('./routes/index');
var user = require('./routes/user.route');
var seeders = require('./routes/seeder.route');
var branches = require('./routes/branch.route');
var company = require('./routes/company.route');
var dashboard = require('./routes/dashboard.route');
var navigation = require('./routes/navigation.route');
var roles = require('./routes/role.route');
var service = require('./routes/services.route');
var plan = require('./routes/plan.route');
var task = require('./routes/task.route');
var file = require('./routes/file.route');
var notification = require('./routes/notification.route');
var mail = require('./routes/mail.route');
var chat = require('./routes/chat.route');
var documentNamesRoute = require('./routes/document-names.route');
var searchRoute = require('./routes/search.route');
var payment = require('./routes/payment.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use('/api/', express.static('uploads'));
// app.use('/', express.static('uploads'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', express.static('public'));
// app.get('*', function (req, res) {
//   res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });
// app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/auth.route')(app, passport);
app.use('/api/', index);
app.use('/api/user', user);
app.use('/api/seed', seeders);
app.use('/api/branches', branches);
app.use('/api/company', company);
app.use('/api/dashboard', dashboard);
app.use('/api/navigation', navigation);
app.use('/api/roles', roles);
app.use('/api/service', service);
app.use('/api/plan', plan);
app.use('/api/task', task);
app.use('/api/file', file);
app.use('/api/notification', notification);
app.use('/api/mail', mail);
app.use('/api/chat', chat);
app.use('/api/document-names', documentNamesRoute);
app.use('/api/search', searchRoute);
app.use('/api/payment', payment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ status: 'NOT_FOUND', message: 'This resource is not available.' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let errorObj = {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong.',
    error: err.message
  };
  res.status(err.status || 500).send(errorObj);
});

module.exports = app;
