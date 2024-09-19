const express = require("express");
const dotEnv = require("dotenv");
const registerRoute = require("./routes/register");
const connectDB = require("./database/connectDB");

dotEnv.config();

const app = express();
const PORT = parseInt(process.env.PORT || 4040);

// initial the all route
app.use(registerRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("> Server is running...");
      console.log("> PORT is : " + PORT);
    });
  })
  .catch((err) => {
    console.log("> Server failed to running. :(");
    console.log(err);
  });
