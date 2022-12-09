const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.list);
router.post("/add", productsController.save);
router.get("/delete/:id", productsController.delete);
router.get("/update/:id", productsController.edit);
router.post("/update/:id", productsController.update);

module.exports = router;
