const sequelize = require("sequelize");
const db = require("../models");
const express = require("express");
const { Product, Review } = require("../models");

const productsRouter = express.Router();

const averageRatingColumnQuery = (productId) => `(
    SELECT COALESCE(AVG("Reviews"."rating"), 0)
    FROM "Reviews"
    WHERE "Reviews"."productId" = ${productId}
  )`;

const averageRatingColumn = [
  sequelize.literal(averageRatingColumnQuery('"Product"."id"')),
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
    order: [["reviews", "createdAt", "DESC"]],
  });

  res.send(product);
});

productsRouter.post("/:productId/reviews", async (req, res) => {
  if (!parseInt(req.params.productId, 10)) {
    return res.send(400);
  }

  const review = await Review.create({
    productId: req.params.productId,
    rating: req.body.rating,
    description: req.body.description.trim(),
  });

  const { coalesce: newAverageRating } = await db.sequelize.query(
    averageRatingColumnQuery(req.params.productId),
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );

  res.send({ ...review.toJSON(), newAverageRating });
});

module.exports.productsRouter = productsRouter;
