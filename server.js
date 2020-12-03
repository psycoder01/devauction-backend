const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const variables = require("./config");

//Importing Api route
const apiRoute = require("./routes/api.routes");

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + ""));

//Route Config
app.use("/api", apiRoute);

//DB connection
const dbParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};
mongoose.connect(variables.DB_URI, dbParams, () => {
  console.log("Database Connection Succesful!");
});

//Server Port connection
const PORT = variables.PORT;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
