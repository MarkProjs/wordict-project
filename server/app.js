import express from "express";
import api from "./routes/api.js";
import path from "path";
import authRoute from "./routes/auth.js";
import fs from 'fs';
const auth = authRoute.router;

let app = express();


/**
 * middleware function to log the duration of each API call
 */
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const row = `${method}, ${originalUrl}, ${duration} \n`;
    const title = `Method, URL, Duration(ms) \n`;
    fs.appendFile('log.csv', row, (err) => {
      if (err) {
        console.error(err);
      }
    });

    //check if the file exists and add title if not
    if (!fs.existsSync('log.csv')) {
      fs.writeFile('log.csv', title, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
  next();
}


app.use(express.static("client/build"))

/**
 * use the logger function to record the api call duration
 */
app.use(logger);

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