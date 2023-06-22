const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AppError = require("./utils/AppError");
const productRouter = require("./Routes/productRouter");
const globalErrorHandler = require("./Controllers/globalErrorHandler");
dotenv.config();

const mongooseSever = process.env.DATABASE_SERVER.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(mongooseSever)
  .then(() => {
    console.log("Connect to mongoDB successfully");
  })
  .catch((err) => {
    console.log("Connect to mongoDB fall", err);
  });

app.use(express.json());
app.use(bodyParser.json());
app.use("/public", express.static("public"));

app.use("/api/v1/product", productRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server listening in port ${port}`);
});
