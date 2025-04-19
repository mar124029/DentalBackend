const express = require("express");
const router = express.Router();
const { registrarPromocion } = require("../controllers/promocionController");

const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.post("/registrar", verifyToken, verifyAdmin, registrarPromocion);

module.exports = router;
