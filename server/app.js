import express from "express";
import api from "./routes/api.js"

let app = express();

app.use("/api", api);

export default app;