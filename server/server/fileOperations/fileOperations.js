const fs = require("fs");
const path = require("path");
const groovyScript = require("./groovyScript.js");

const wrapper = (json, successCB, errorCB) => {
  let content = fs.readFileSync(path.join(__dirname, "Jenkinsfile"));

  console.log("CONTENTS IN JENKINSFILE", content.toString());

  let result = "pipeline{"
    .concat("agent " + JSON.stringify(json.pipeline.agent))
    .concat("stages{")
    .concat(content.toString())
    .concat("}}");

  let result1 = fs.writeFileSync(
    path.join(__dirname, "Jenkinsfile"),
    result,
    "utf8"
  );
  successCB(result1);
};

const generateJenkinsfile = (json, successCB, errorCB) => {
  if (fs.existsSync(path.join(__dirname, "Jenkinsfile"))) {
    //file exists
    fs.unlinkSync(path.join(__dirname, "Jenkinsfile"));
  }

  // var STAGE = 'stage("$$NAME$$"){}';

  Object.keys(json.pipeline).map((key, index) => {
    // let steps = "steps{";
    if (key === "stages") {
      json.pipeline.stages.map((stage, stageindex) => {
        let appendStr = "stage('" + stage.stageName + "'){\n";

        if (Object.keys(stage.steps).length) {
          appendStr += "steps{\n";
        }

        Object.keys(stage.steps).map((stepsKey, stepindex) => {
          if (stepsKey === "git_clone") {
            let str = groovyScript.git_clone(
              stage.steps[stepsKey].URL,
              stage.steps[stepsKey].Credentials,
              stage.steps[stepsKey].Branch
            );
            appendStr += str + "\n";
          } else if (stepsKey === "execute_shell") {
            let str = groovyScript.execute_shell(stage.steps[stepsKey].command);
            appendStr += str + "\n";
          } else if (stepsKey === "execute_batch") {
            let str = groovyScript.execute_batch(stage.steps[stepsKey].command);
            appendStr += str + "\n";
          } else if (stepsKey === "execute_powershell") {
            let str = groovyScript.execute_powershell(
              stage.steps[stepsKey].command
            );
            appendStr += str + "\n";
          } else if (stepsKey === "build_job") {
            let str = groovyScript.build_job(stage.steps[stepsKey].jobname);
            appendStr += str + "\n";
          } else if (stepsKey === "email") {
            let str = groovyScript.email(
              stage.steps[stepsKey].to,
              stage.steps[stepsKey].cc,
              stage.steps[stepsKey].bcc,
              stage.steps[stepsKey].from,
              stage.steps[stepsKey].subject,
              stage.steps[stepsKey].body
            );
            appendStr += str + "\n";
          } else if (stepsKey === "present_directory") {
            let str = groovyScript.present_directory(stage.steps[stepsKey]);
            appendStr += str + "\n";
          } else if (stepsKey === "load_library") {
            let str = groovyScript.load_library(stage.steps[stepsKey].library);
            appendStr += str + "\n";
          } else if (stepsKey === "echo") {
            let str = groovyScript.echo(stage.steps[stepsKey].expression);
            appendStr += str + "\n";
          }
          // else if (stepsKey === "change_directory") {
          //   let str = groovyScript.change_directory(
          //     stage.steps[stepsKey].directory
          //   );
          //   appendStr += str + "\n";
          // }
          else if (stepsKey === "delete_directory") {
            let str = groovyScript.delete_directory(stage.steps[stepsKey]);
            appendStr += str + "\n";
          } else if (stepsKey === "archive_artifacts") {
            let str = groovyScript.archive_artifacts(
              stage.steps[stepsKey].source
            );
            appendStr += str + "\n";
          }
          if (stepindex === Object.keys(stage.steps).length - 1) {
            appendStr += "}}";
          }
        });

        console.log("append str", appendStr);

        // console.log("steps haveeeee", steps);
        // let stage1 = STAGE;
        // stage1 = [
        // steps.slice(0, stage1.length - 3),
        // appendStr,
        // steps.slice(stage1.length - 2)
        // ].join("");
        // console.log("stageeeeeeee", stage1);
        // stage1 = stage1.replace("$$NAME$$", stage.stageName);
        fs.appendFileSync(path.join(__dirname, "Jenkinsfile"), appendStr);
      });
    }
  });
  successCB("success");
};

const writeData = req => {
  console.log("req", req);
  console.log("inside write data");

  fs.writeFileSync("../phraseFreqs.json", JSON.stringify(output))
    .then(status => {
      console.log("success");
      return status;
    })

    .catch(err =>
      res.status(404).json({
        error: "Error in writing data"
      })
    );
};

module.exports = {
  generateJenkinsfile,
  wrapper,
  writeData
};
