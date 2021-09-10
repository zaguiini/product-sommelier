const express = require("express");
const { Product } = require("../models");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await Product.findAll();

  res.send(products);
});

module.exports.productsRouter = productsRouter;
