const express = require("express");

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.sendStatus(204);
});

module.exports.productsRouter = productsRouter;
