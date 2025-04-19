const { crearPromocion } = require("../models/promocionModel");

const registrarPromocion = (req, res) => {
  const promocion = {
    ...req.body,
    creado_por: req.user.id_usuario,
  };

  crearPromocion(promocion, (err, nuevaPromocion) => {
    if (err) {
      console.error("Error al crear promoción:", err);
      return res.status(500).json({ error: "Error al registrar la promoción" });
    }
    res.status(201).json(nuevaPromocion);
  });
};

module.exports = { registrarPromocion };
