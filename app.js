const express = require("express");
const morgan = require("morgan");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv:admin:" +
    process.env.MONGO_ATLAS_PW +
    "@expressapp-nr0ft.mongodb.net/test"
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow_Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
