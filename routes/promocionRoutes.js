const express = require("express");
const router = express.Router();
const {
  registrarPromocion,
  obtenerPromociones,
  eliminarPromocionController,
} = require("../controllers/promocionController");

const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.post("/", verifyToken, verifyAdmin, registrarPromocion);
router.get("/", verifyToken, verifyAdmin, obtenerPromociones);
router.delete("/:id", verifyToken, verifyAdmin, eliminarPromocionController);

module.exports = router;
