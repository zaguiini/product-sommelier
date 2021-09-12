const io = require("socket.io");

const setupWebSockets = ({ server, app }) => {
  const ioInstance = io(server, {
    cors: {
      origin: "http://localhost:9000",
      methods: ["GET", "POST"],
    },
  });

  ioInstance.on("connection", (socket) => {
    socket.on("room", function (room) {
      socket.join(room);
    });
  });

  app.use((req, res, next) => {
    req.webSocket = ioInstance;

    next();
  });
};

module.exports.setupWebSockets = setupWebSockets;
