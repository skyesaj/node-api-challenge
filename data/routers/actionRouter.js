const actions = require("../helpers/actionModel");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  actions
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(404).json({ error: error.message });
    });
});

// middleware
function validateActionId(req, res, next) {
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({ error: error.messgae });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

module.exports = router;
