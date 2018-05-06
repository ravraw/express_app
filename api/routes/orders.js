const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetched"
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Orders was created"
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Orders details",
    orderId: req.params.orderId
  });
});

router.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Orders updated",
    orderId: req.params.orderId
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Orders is deleted"
  });
});

module.exports = router;
