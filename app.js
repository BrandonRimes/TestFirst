const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const bookRoutes = require("./routes/book.router");

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB = process.env.DB;
const ENV = process.env.ENV;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/book", bookRoutes);

const connect = async (db) => {
  try {
    const connection = await mongoose.connect(db);
    if(ENV !== "test") console.log("DB connected");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

const startServer = async () => {
  await connect(DB);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}

module.exports = {
  app,
  connect,
  startServer
};
