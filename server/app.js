import express from "express";
import api from "./routes/api.js";
import path from "path";

let app = express();

app.use(express.static("client/build"))

app.get(/^\/[^/]*?$/, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
})

app.use("/api", api);

export default app;