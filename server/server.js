const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const colors = require("colors");
const router = require("../router/auth-router.js");
const connectDb = require("../utils/db.js");
const errorMiddleware = require("../middleware/error-middleware.js");
const contact1 = require("../router/contact-router.js");
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/form", contact1);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`.bgYellow.black);
  });
});
