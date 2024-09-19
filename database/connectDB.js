const mongoose = require("mongoose");

async function connectDB() {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://${process.env.DATABAE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );

    console.log("> Database connect successfully.");
    console.log("> Database host : " + con.connection.host);
  } catch (err) {
    return err;
  }
}

module.exports = connectDB;
