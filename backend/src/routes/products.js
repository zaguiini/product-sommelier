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

productsRouter.get("/", async (_, res) => {
  const products = await Product.findAll({
    attributes: {
      include: [averageRatingColumn],
    },
  });

  res.send(products);
});

productsRouter.post("/", async (req, res) => {
  const review = await Product.create({
    name: req.body.name,
  });

  res.send(review);
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

productsRouter.post("/:productId/reviews", async (req, res) => {
  const review = await Review.create({
    productId: req.params.productId,
    rating: req.body.rating,
    description: req.body.description,
  });

  res.send(review);
});

module.exports.productsRouter = productsRouter;
