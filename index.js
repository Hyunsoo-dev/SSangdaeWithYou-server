const express = require("express");
const app = express();
const cors = require('cors');
const session = require('express-session');
const route = require('./routes/index');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = 5000;
const controllerInfo = require('./controllers/users/userInfo');
const controllerSign = require('./controllers/users/userSign');
const bodyParser = require('body-parser');
const https = require('https')
const fs = require('fs')
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://ssangdaewithyou.com',
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// express-session
// app.use(
//   session({
//     secret: '@codestates',
//     resave: false,
//     saveUninitialized: true, // false 로 설정해주면 cookie가 오지 않음
//     cookie: {
//       domain: 'localhost:3000',
//       // domain: 'ssangdae.gq',
//       path: '/',
//       maxAge: 24 * 6 * 60 * 10000,
//       sameSite: 'none',
//       httpOnly: true,
//       secure: false, //https
//     },
//   })
// );

app.post('/user/info', controllerInfo.userinfo);
app.post('/user/sign', controllerSign.sign);
// process.on('uncaughtException', (err) => {console.log(err)})
app.use('/', route);
// app.use('/userImg', express.static('./controller/users/userImg'));
// app.use('/users', usersRouter);
// app.use('/socials', socialsRouter)
const server = https
  .createServer(
    {
      key: fs.readFileSync('/Users/hyunsoo/Desktop/key.pem', 'utf-8'),
      cert: fs.readFileSync('/Users/hyunsoo/Desktop/cert-pem', 'utf-8'),
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now :)');
    })
  )
  
  module.exports = server;
// app.listen(port); 
// module.exports = https;


//!
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const port = 5000;
// const route = require('./routes/index');
// let cookieParser = require('cookie-parser')
// let cookieSession = require('cookie-session')
// // express-session


// app.use(express.json());
// app.use(express.urlencoded({extended : true }));


// app.use(cors({ //요청하는 입장 
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:443",
//     "https://localhost:443",
//     "https://localhost:3000"
//   ],
//   method: ["GET", "POST", "OPTIONS"],
//   credentials: true
// }));


// app.set('trust proxy',1)
// app.use(
//   session({
//     secret: '@codestates',
//     resave: false,
//     saveUninitialized: true, // false 로 설정해주면 cookie가 오지 않음
//     cookie: {
//       domain: 'localhost',
//       path: '/',
//       maxAge: 24 * 6 * 60 * 10000,
//       sameSite: "none",
//       httpOnly: false,  
//       secure: false,  //https => 
//       rolling: true
//     },
//   })
// )
// app.use(cookieParser('@codestates'));



// app.get('/', (req, res) => {
//   res.status(200).send('Success');
// })

// // process.on('uncaughtException', (err) => {console.log(err)})
// app.use('/', route);
// // const server = https
// //   .createServer(
// //     {
// //       key: fs.readFileSync('/Users/hyunsoo/Desktop/key.pem', 'utf-8'),
// //       cert: fs.readFileSync('/Users/hyunsoo/Desktop/cert-pem', 'utf-8'),
// //     },
// //     app.use('/', (req, res) => {
// //       res.send('Congrats! You made https server now :)');
// //     })
// //   )
// //   server.listen(5000);
// app.listen(5000)
// //module.exports = server;
