const sequelize = require("sequelize");
const express = require("express");
const { Product, Review } = require("../models");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: Review,
        as: "reviews",
      },
    ],
  });

  res.send(products);
});

module.exports.productsRouter = productsRouter;
