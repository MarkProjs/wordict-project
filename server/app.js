import express from "express";
import api from "./routes/api.js";
import path from "path";
import auth from "./routes/auth.js";


let app = express();


app.use(express.static("client/build"))


/**
 * for parsing the POST application/json
 */
app.use(express.json());

/**
 * api router
 */
app.use("/api", api);
/**
 * 
 */
app.use("/auth", auth);

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