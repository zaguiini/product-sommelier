const { productsRouter } = require("./products");

const setupRoutes = (app) => {
  app.use("/products", productsRouter);
};

module.exports.setupRoutes = setupRoutes;
