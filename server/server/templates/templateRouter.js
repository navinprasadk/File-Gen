const router = require("express").Router();
let templateController = require("./templateController.js");

router.get("/getAllTemplates", (req, res) => {
  templateController
    .getAllTemplates()
    .then(blueprints => res.send(blueprints))
    .catch(err =>
      res.status(500).json({
        error: "Server error...try again later"
      })
    );
});

router.post("/findTemplateDetails", (req, res) => {
  templateController
    .findTemplateDetails(req)
    .then(response => {
      console.log("yaml in router", response);
      res.send(response);
    })
    .catch(err =>
      res.status(500).json({
        error: "Server error...try again later"
      })
    );
});

router.post('/updateTemplateDetails',(req,res)=>{
    templateController.updateTemplateDetails(req)
    .then(response=>{
        console.log("Successfully Updated")
    })
    .catch(err=>res.status(500).json({
        error: "Server error...try again later"
    }))
})



module.exports = router;
