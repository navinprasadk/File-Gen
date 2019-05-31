const fs = require('fs');
const path = require("path");
const groovyScript = require("./groovyScript.js")

const wrapper = (json, successCB, errorCB) => {
  let content = fs.readFileSync(path.join(__dirname, "Jenkinsfile"));
  console.log("CONTENTS IN JENKINSFILE", content.toString())

  let result = "pipeline{"
    .concat("agent " + JSON.stringify(json.pipeline.agent))
    .concat("stages{")
    .concat(content.toString())
    .concat("}}");

  let result1 = fs.writeFileSync(path.join(__dirname, "Jenkinsfile"), result, "utf8");
  successCB(result1)

};

const generateJenkinsfile = (json, successCB, errorCB) => {

  fs.unlinkSync(path.join(__dirname, "Jenkinsfile"));

  var STAGE = "stage(\"$$NAME$$\"){}";

  Object.keys(json.pipeline).map((key, index) => {
    let steps = "steps{}"
    if (key === "stages") {
      json.pipeline.stages.map((stage, stageindex) => {
        let appendStr = "";
        Object.keys(stage.steps).map((stepsKey, stageindex) => {

          if (stepsKey === "git_clone") {
            let str = groovyScript.git_clone(
              stage.steps[stepsKey].URL,
              stage.steps[stepsKey].Credentials,
              stage.steps[stepsKey].Branch
            );
            appendStr += str + "\n";
            console.log("Steps", steps);
          } else if (stepsKey === 'execute_shell') {
            let str = groovyScript.execute_shell(stage.steps[stepsKey].command);
            appendStr += str;

          } else if (stepsKey === 'execute_batch') {
            let str = groovyScript.execute_powershell(stage.steps[stepsKey].command);
            appendStr += str;
          } else if (stepsKey === 'execute_powershell') {
            let str = groovyScript.execute_powershell(stage.steps[stepsKey].command);
            appendStr += str;

          } else if (stepsKey === 'build_job') {
            let str = groovyScript.build_job(stage.steps[stepsKey].jobname);
            appendStr += str;
          }
        });
        // appendStr += "}";
        console.log('append str', appendStr);
        console.log('steps haveeeee', steps);
        let stage1 = STAGE
        stage1 = [
          steps.slice(0, stage1.length - 3),
          appendStr,
          steps.slice(stage1.length - 2)
        ].join("");
        console.log('stageeeeeeee', stage1);
        stage1 = stage1.replace("$$NAME$$", stage.stageName)
        fs.appendFileSync(path.join(__dirname, "Jenkinsfile"), stage1);
      });
    }


  });

  successCB("success")

}


const writeData = (req) => {
  console.log("req", req);
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



module.exports = {
  generateJenkinsfile,
  wrapper,
  writeData
}