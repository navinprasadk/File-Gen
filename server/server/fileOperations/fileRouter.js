const router = require("express").Router();
const fs = require("fs");
const path = require("path");
var mime = require("mime");
let fileController = require("./fileOperations.js");

router.post("/generate", (req, res) => {
  console.log("GENERATING", JSON.stringify(req.body));
  fileController.generateJenkinsfile(req.body, stages => {
    fileController.wrapper(req.body, result => {
      res.download(path.join(__dirname, "Jenkinsfile"));
    });
  });
});

router.post("/download", (req, res) => {
  console.log("downloading");
  var file = __dirname + "/Jenkinsfile";

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

router.post("/writeData", (req, res) => {
  console.log("I am Being called");
  fileController
    .writeData(req)
    .then(status => res.send(status))
    .catch(err =>
      res.status(500).json({
        error: "Server error...try again later"
      })
    );
});

module.exports = router;
