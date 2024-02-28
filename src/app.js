const express = require("express");
const app = express();
const cors = require("cors");
const prouteProduct = require("./routes/product.route")
const PORT = 4000
//Setings
app.set("port", process.env.PORT || PORT);

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/items", prouteProduct);

module.exports = app;
