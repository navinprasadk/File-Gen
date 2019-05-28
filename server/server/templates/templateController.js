const templateEntity = require("./templateEntity.js");
const fs = require("fs-extra");
const path = require("path");
let templateController = {
  getAllTemplates() {
    return templateEntity
      .find()
      .then(blueprints => {
        console.log("inside getAll templates", blueprints);
        return blueprints;
      })
      
      .catch(err =>
        res.status(404).json({
          error: "Error in getting blueprints"
        })
      );
  },
  updateTemplateDetails(req) {
    return templateEntity.findOneAndUpdate({
        templateName: req.body.fileName,
        category:req.body.category
    }, {
        $set: {
            templateName: req.body.templateName,
            templateDescription: req.body.templateDescription,
            toolUsed: req.body.toolUsed,
            category:req.body.category
        }
    })
    .then((req)=>{
    
    })
  },
  findTemplateDetails(req) {
    let templateData = {};
    return templateEntity
      .find({ templateName: req.body.fileName, category: req.body.category })
      .then(res => {
        templateData.templateName = res[0].templateName;
        templateData.templateDescription = res[0].templateDescription;
        templateData.toolsUsed = res[0].toolsUsed;
        templateData.category = res[0].category;
        templateData.type = res[0].type;

        return fs .readFile(
            path.join(
              __dirname,
              `../CDMLTemplates/` +
                req.body.category +
                `/` +
                req.body.fileName +
                `.yml`
            ),
            "utf-8"
          )
          .then(file => {
            templateData.yml = file;
            return templateData;
          })
          .catch(err => {
            console.log("error", err);
          });
      })
      .catch(err => {
        console.log("error", err);
      });
  }
};

module.exports = templateController;
