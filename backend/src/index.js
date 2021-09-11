const express = require("express");
const { setupRoutes } = require("./routes");

const setup = async () => {
  const app = express();

  app.use(express.static(__dirname + "/../../frontend/dist"));

  app.use(express.json());

  setupRoutes(app);

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
  });
};

setup().catch((error) => {
  console.error(error);
});
