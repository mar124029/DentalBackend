const db = require("../config/db");

const verifyRecepcionista = async (req, res, next) => {
  const id_usuario = req.user?.id_usuario;

  if (!id_usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  try {
    const query = `SELECT id_rol FROM usuarios_roles WHERE id_usuario = $1`;
    const result = await db.query(query, [id_usuario]);

    const rol = result.rows[0]?.id_rol;

    if (rol !== 4) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: solo para recepcionistas" });
    }

    next();
  } catch (error) {
    console.error("Error al verificar rol:", error);
    res.status(500).json({ mensaje: "Error al verificar rol" });
  }
};

module.exports = { verifyRecepcionista };
