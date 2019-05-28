const router = require("express").Router();
let toolsController = require("./toolsController.js");

router.get("/getAllTools", (req, res) => {
    toolsController
      .getAllTools()
      .then(tool => res.send(tool))
      .catch(err =>
        res.status(500).json({
          error: "Server error...try again later"
        })
      );
  });

module.exports = router;