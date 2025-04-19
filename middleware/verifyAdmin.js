const verifyAdmin = (req, res, next) => {
  if (req.user.id_rol !== 1) {
    return res
      .status(403)
      .json({ mensaje: "Acceso denegado. Solo administradores." });
  }
  next();
};

module.exports = { verifyAdmin };
