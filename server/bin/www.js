import app from "../app.js";
import {connect} from "../db/db.js"
import setupServer from "../routes/multiplayer.js";

const PORT = process.env.PORT || 3001;

let server = app.listen(PORT, async () => {
  await connect()
  console.log(`Server listening on port ${PORT}!`);
});

setupServer(server);