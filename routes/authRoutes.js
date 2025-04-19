const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const {
  editarRol,
  listarUsuariosConRoles,
} = require("../controllers/roleController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/editarol", editarRol);
router.get("/usuarios", listarUsuariosConRoles);

module.exports = router;
