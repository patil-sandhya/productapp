const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { connection } = require("./db");
const {userRouter} = require("./Routes/userRoute")
const {productRouter}= require("./Routes/productRoute")
require("dotenv").config()

const app = express();
const port = process.env.port || 5050
app.use(express.json());
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter)
app.use("/product", productRouter)

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on ${port}`);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
});
