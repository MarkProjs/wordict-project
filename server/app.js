import express from "express";
import api from "./routes/api.js";
import path from "path";

let app = express();

app.use(express.static("client/build"))


app.use("/api", api);


function html(req, res, next) {
  if (req.accepts("html")) {
    next();
  } else {
    next("route");
  }
}

app.get("*", html, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});




app.use((req, res) => {
  res.sendStatus(404);
});

export default app;