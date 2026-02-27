const express = require("express");
const { generatePdf } = require("../controllers/pdfController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authenticate, generatePdf);

module.exports = router;
