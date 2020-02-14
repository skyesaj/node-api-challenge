// imports
const express = require("express");
const projects = require("../helpers/projectModel");
const actions = require("../helpers/actionModel");
// express router
const router = express.Router();

router.post("/", validateProject, (req, res) => {
  // projects.post();
  const data = req.body;
  projects
    .insert(data)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const project_id = req.params.id;
  const aData = { ...req.body, project_id };
  actions
    .insert(aData)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(errr => {
      res.status(500).json({ error: error.message });
    });
});

// router.get("/", (req, res) => {
//   res.send("hello");
// });

router.get("/", (req, res) => {
  projects
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  projects
    .get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(404).json({ error: error.message });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;

  projects
    .getProjectActions(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(errr => {
      res.status(404).json({ error: error.message });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const project = req.body;
  projects
    .update(id, project)
    .then(updates => {
      res.status(200).json(updates);
    })
    .catch(error => {
      res.status(404).json({ error: error.message });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(deleted => {
      projects
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
      res.status(500).json({ error: error.message });
    });
});

// Middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;
  projects
    .get(id)
    // .getById(req.params.id)
    .then(project => {
      if (project) {
        next();
      } else {
        res.status(400).json({ message: error.message });
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
}
function validateProject(req, res, next) {
  // do your magic!
  const data = req.body;

  if ((data.name, data.description)) {
    next();
  } else {
    // req.text = text;
    res.status(404).json({ message: error.message });
  }
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

// export
module.exports = router;
