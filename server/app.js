import express from "express";
import api from "./routes/api.js"

let app = express();

app.use(express.static("client/build"))

app.use("/api", api);

export default app;