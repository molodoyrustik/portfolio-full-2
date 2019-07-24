const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const jsonfile = require('jsonfile');
const fileVersionControl = 'version.json';
const currentStatic = require('./gulp/config').root;
const config = require('./config');
// получаем абсолютный путь к папке upload, в которую будут загружаться картинки
// проектов
const uploadDir = path.join(__dirname, config.upload);

//mongoose.connect('mongodb://root:12345@ds137191.mlab.com:37191/testing');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', require('./routes/index'));
app.use('/works', require('./routes/works'));
app.use('/about', require('./routes/about'));
app.use('/blog', require('./routes/blog'));

app.use('/admin', require('./routes/admin'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render('pages/404', req.app.locals.settings);
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('pages/500', req.app.locals.settings);
});

server.listen(3000, 'localhost');

server.on('listening', function () {
  jsonfile
    .readFile(fileVersionControl, function (err, obj) {
      if (err) {
        console.log(err);
        console.log('Данные для хеширования ресурсов из version.json не прочитаны');
        console.log('Сервер остановлен');
        process.exit(1);
      } else {
        app.locals.settings = {
          suffix: obj.suffix,
          version: obj.version
        };
        console.log('Данные для хеширования ресурсов из version.json прочитаны');

        //если такой папки нет - создаем ее
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
      }
    });
});