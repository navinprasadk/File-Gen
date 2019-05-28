const fs = require('fs');
const path = require("path");
const groovyScript = require("./groovyScript.js")

const wrapper = (json,successCB,errorCB) => {
  let content = fs.readFileSync(path.join(__dirname, "Jenkinsfile"));

  let result = "pipeline{"
    .concat("agent " + JSON.stringify(json.pipeline.agent))
    .concat("stages{")
    .concat(content.toString())
    .concat("}}");

  let result1 = fs.writeFileSync(path.join(__dirname, "Jenkinsfile"), result, "utf8");
  successCB(result1)

};

const generateJenkinsfile = (json,successCB,errorCB) => {

var STAGE = "stage{steps{}}";

Object.keys(json.pipeline).map((key, index) => {
  if (key === "stages") {
    json.pipeline.stages.map((stage, stageindex) => {
      Object.keys(stage).map((stageKey, stageindex) => {
        if (stageKey === "git_clone") {
          let str = groovyScript.git_clone(
            stage[stageKey].URL,
            stage[stageKey].Credentials,
            stage[stageKey].Branch
          );
          STAGE = [
            STAGE.slice(0, STAGE.length - 2),
            str,
            STAGE.slice(STAGE.length - 2)
          ].join("");

          fs.writeFileSync(path.join(__dirname, "Jenkinsfile"), STAGE);

        }
      });
    });
  }
});

successCB("success")

}


const writeData = (req) => {
        console.log("req",req);
        console.log("inside write data");
        fs.writeFileSync('../phraseFreqs.json', JSON.stringify(output))
        .then(status => {
          console.log("success");
          return status;
        })
        .catch(err =>
          res.status(404).json({
            error: "Error in writing data"
          })
        );
    }



module.exports = { generateJenkinsfile,wrapper, writeData }