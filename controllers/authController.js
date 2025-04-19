const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByDni,
  comparePassword,
} = require("../models/userModel");
const db = require("../config/db");

const register = (req, res) => {
  const user = req.body;

  createUser(user, (err, result) => {
    if (err) {
      console.error("Error al registrar:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
};
const login = (req, res) => {
  const { dni, contrasena } = req.body;

  findUserByDni(dni, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    comparePassword(contrasena, user.contrasena, async (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      }

      const query = `SELECT id_rol FROM usuarios_roles WHERE id_usuario = $1`;
      const result = await db.query(query, [user.id_usuario]);

      const token = jwt.sign(
        {
          id_usuario: user.id_usuario,
          id_rol: result.rows[0]?.id_rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      const { contrasena, ...safeUser } = user;

      res.status(200).json({
        message: "Login exitoso",
        token,
        user: safeUser,
      });
    });
  });
};

const logout = (req, res) => {
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

module.exports = { register, login, logout };
