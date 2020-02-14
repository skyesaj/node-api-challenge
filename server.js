const express = require("express");
const logger = require("./data/logger/logger");
// server.use(helmet());

const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");
const server = express();

server.use(express.json());
server.use(logger());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  //   res.status(200).json({ message: "hey" });
  res.send(`<h2> Projects and Actions </h2>`);
});

module.exports = server;
