const express = require("express");
const router = express.Router();
const chefController = require("../Controller/chefController");

router.post("registerChef", chefController.registerChef);
router.post("registerChef", chefController.loginChef);

router.get("/get-chef",chefController.get_chef);
router.patch("/update-chef",chefController.update_chef);

module.exports = router;
