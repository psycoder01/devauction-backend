const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Importing Api route 
const apiRoute = require("./routes/api.routes");

//Enviroment Config
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());

//Route Config
app.use("/api",apiRoute);

//DB connection
const dbParams = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_URI, dbParams, () => {
  console.log("Database Connection Succesful!");
});

//Server Port connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
