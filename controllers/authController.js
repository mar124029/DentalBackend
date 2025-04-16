const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByDni,
  comparePassword,
} = require("../models/userModel");

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

  findUserByDni(dni, (err, user) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    comparePassword(contrasena, user.contrasena, (err, isMatch) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        {
          id: user.id_usuario,
          dni: user.dni,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
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
