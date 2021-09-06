const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const cors = require("cors");
const bodyParser = require("body-parser");
const { SocketService } = require("./core/socketio");

app.use(require("connect-history-api-fallback")());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
http.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
app.use(require("./routes"));
app.get("/", (req, res) => {
  res.send("socket.io");
});
new SocketService(io);
