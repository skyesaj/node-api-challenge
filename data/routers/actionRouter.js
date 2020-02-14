const actions = require("../helpers/actionModel");
// const projects = require("../routers/projectRouter");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  actions
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({ error: "not working" });
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

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(deleted => {
      actions
        .remove(deleted.id)
        .then(deletes => {
          // console.log(deleted);
          res.status(200).json(deleted);
        })
        .catch(error => {
          res.status(404).json({ error: error.message });
        });
    })
    .catch(error => {
      res.status(500).json({ error: "not working" });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const aUpdate = req.body;
  actions
    .update(id, aUpdate)
    .then(updates => {
      res.status(200).json(updates);
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
        res.status(404).json({ error: "n/a" });
      }
    })
    .catch(error => {
      res.status(404).json({ error: "wrong ID" });
    });
}

function validateAction(req, res, next) {
  // do your magic!
  const aData = req.body;

  if ((aData.notes, aData.description)) {
    next();
  } else {
    // req.text = text;
    res.status(404).json({ message: error.message });
  }
}

module.exports = router;
