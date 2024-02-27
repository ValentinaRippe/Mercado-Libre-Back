const express = require("express");
const app = express();
const cors = require("cors");

//Setings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/items", require("./routes/product.route"));

module.exports = app;
