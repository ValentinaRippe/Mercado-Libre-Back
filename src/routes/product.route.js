const { Router } = require("express");
const router = Router();

const { searchProducts, getProduct } = require("../controllers/product.controller");

router.route("/:id").get(getProduct);

router.route("/").get(searchProducts);

module.exports = router;
