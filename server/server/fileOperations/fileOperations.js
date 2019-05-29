const fs = require('fs');
const path = require("path");
const groovyScript = require("./groovyScript.js")

const wrapper = (json,successCB,errorCB) => {
  let content = fs.readFileSync(path.join(__dirname, "Jenkinsfile"));
  console.log("CONTENTS IN JENKINSFILE",content.toString())

  let result = "pipeline{"
    .concat("agent " + JSON.stringify(json.pipeline.agent))
    .concat("stages{")
    .concat(content.toString())
    .concat("}}");

  let result1 = fs.writeFileSync(path.join(__dirname, "Jenkinsfile"), result, "utf8");
  successCB(result1)

};

const generateJenkinsfile = (json,successCB,errorCB) => {

var STAGE = "stage(\"$$NAME$$\"){steps{}}";

Object.keys(json.pipeline).map((key, index) => {
  if (key === "stages") {
    json.pipeline.stages.map((stage, stageindex) => {

      console.log("STAGE",stage);
      console.log("STAGE INDEX",stageindex);
      Object.keys(stage.steps).map((stepsKey, stageindex) => {

        if (stepsKey === "git_clone") {
          console.log("FOUND STAGE", stepsKey);
          let str = groovyScript.git_clone(
            stage.steps[stepsKey].URL,
            stage.steps[stepsKey].Credentials,
            stage.steps[stepsKey].Branch
          );
          let stage1 = STAGE
          stage1 = [
            stage1.slice(0, stage1.length - 2),
            str,
            stage1.slice(stage1.length - 2)
          ].join("");

          stage1 = stage1.replace("$$NAME$$",stage.stageName )
          console.log("CREATED STAGES",stage1);
          fs.appendFileSync(path.join(__dirname, "Jenkinsfile"), stage1);

        }
        else {
          console.log("NOT FOUND STAGES", stageKey)
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