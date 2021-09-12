const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { setupRoutes } = require("./routes");
const { setupWebSockets } = require("./services/webSockets");

const setup = async () => {
  const app = express();

  const frontendPath = __dirname + "/../../frontend/dist";

  app.use(express.static(frontendPath));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  const server = app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
  });

  setupWebSockets({ server, app });

  setupRoutes(app);

  app.get("*", async (req, res, next) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
};

setup().catch((error) => {
  console.error(error);
});
