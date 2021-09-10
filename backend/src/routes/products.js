const sequelize = require("sequelize");
const express = require("express");
const { Product, Review } = require("../models");

const productsRouter = express.Router();

const averageRatingColumn = [
  sequelize.literal(`(
    SELECT COALESCE(AVG("Reviews"."rating"), 0)
    FROM "Reviews"
    WHERE "Reviews"."productId" = "Product"."id"
  )`),
  "averageRating",
];

productsRouter.get("/", async (req, res) => {
  const products = await Product.findAll({
    attributes: {
      include: [averageRatingColumn],
    },
  });

  res.send(products);
});

productsRouter.get("/:productId", async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.productId,
    },
    attributes: {
      include: [averageRatingColumn],
    },
    include: [
      {
        model: Review,
        as: "reviews",
      },
    ],
  });

  res.send(product);
});

module.exports.productsRouter = productsRouter;
