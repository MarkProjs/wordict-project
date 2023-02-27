import app from "../app.js";
import {connect} from "../db/db.js"

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await connect()
  console.log(`Server listening on port ${PORT}!`);
});