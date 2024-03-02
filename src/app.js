const express = require("express");
const app = express();
const cors = require("cors");
const prouteProduct = require("./routes/product.route")
const config = require('./config')
//Setings
app.set("port", process.env.PORT || config.PORT);

const corsOption = {
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true
};

//Middlewares
app.use(cors(corsOption));
app.use(express.json());

//routes
app.use("/api/items", prouteProduct);

module.exports = app;
