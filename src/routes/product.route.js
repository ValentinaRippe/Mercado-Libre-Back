const { Router } = require("express");
const router = Router();

const { searchProducts, getProduct } = require("../controllers/product.controller");

router.route("").get(searchProducts);

router.route("/:id").get(getProduct);

module.exports = router;
