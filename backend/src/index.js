const express = require("express");
const path = require("path");
const cors = require("cors");
const { setupRoutes } = require("./routes");

const setup = async () => {
  const app = express();

  const frontendPath = __dirname + "/../../frontend/dist";

  app.use(express.static(frontendPath));
  app.use(cors());
  app.use(express.json());

  setupRoutes(app);

  app.get("*", async (req, res, next) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
  });
};

setup().catch((error) => {
  console.error(error);
});
