const express = require("express");
const router = express.Router();

const {
  getMed,
  getMeds,
  createMed,
  updateMed,
  deleteMed,
} = require("../controllers/med.controller");

router.get("/", getMed);
router.get("/:id", getMeds);
router.post("/", createMed);
router.put("/:id", updateMed);
router.delete("/:id", deleteMed);

module.exports = router;
