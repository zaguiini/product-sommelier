"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      productId: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [30],
            msg: "Minimum 30 characters required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    },
  );
  return Review;
};
