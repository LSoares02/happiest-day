// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

const {
  insertController,
  getOneController,
  getAllController,
} = require("../controllers/cloudant");

router.get("/getAll", getAllController);
router.post("/getOne", getOneController);
router.post("/insert", insertController);

module.exports = router;
