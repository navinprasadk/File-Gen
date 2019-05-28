const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5050;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectflash = require("connect-flash");
const morgan = require("morgan");
const fs = require('fs');
const serverConfig = require("./serverConfig.js");
//keycloak
const Keycloak = require("keycloak-connect");
const session = require("express-session");
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({
  store: memoryStore
});
//session
app.use(
  session({
    secret: "thisShouldBeLongAndSecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

app.use(keycloak.middleware());

// use middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(connectflash());

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

// create server
app.listen(port, () => console.log(`Listening on port ${port}`));

// logger
app.use(morgan("dev"));

// setup REST routes
app.get("/", function(req, res) {
  console.log("inside logout");
  console.log("req",req.body);
        console.log("inside write data");
        fs.writeFileSync('../phraseFreqs.json', JSON.stringify(req))
        .then(status => {
          console.log("success");
          return status;
        })
  // res.redirect(`${serverConfig.clientUrl}`);
});

app.get("/fileRead", function(req, res) {
        console.log("inside read data");
        let status = fs.readFileSync ("./outputFile/Jenkins.json", 'utf-8');
        res.send(status)
});

app.post("/fileWrite", function(req, res) {
  console.log("req",req.body);
        console.log("inside write data");
        let status = fs.writeFileSync ("./outputFile/Jenkins.json", JSON.stringify(req.body));
        res.send(status);
});


// API calls

app.use('/api/tools', require(path.join(__dirname, './server/tools')));
app.use('/api/fileOperations', require(path.join(__dirname, './server/fileOperations')));
// app.use(
//   "/api/login",
//   keycloak.protect(),
//   require(path.join(__dirname, "./server/login"))
// );
// app.use(
//   keycloak.middleware({
//     logout: "/"
//   })
// );

if (process.env.NODE_ENV === "production") {
  console.log("-------------------------------------");
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// setup mongoose connection

// let mongoURL = "mongodb://127.0.0.1:27017/rig_db_ga";

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true
// });

// mongoose.connection.on("connected", function() {
//   console.log("mongoose is now connected to ", mongoURL);

//   mongoose.connection.on("error", function(err) {
//     console.error("error in mongoose connection: ", err);
//   });

//   mongoose.connection.on("disconnected", function() {
//     console.log("mongoose is now disconnected.");
//   });

//   process.on("SIGINT", function() {
//     mongoose.connection.close(function() {
//       console.log("mongoose disconnected on process termination");
//       process.exit(0);
//     });
//   });
// });
