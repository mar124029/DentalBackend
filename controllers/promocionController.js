const {
  crearPromocion,
  listarPromociones,
  eliminarPromocion,
} = require("../models/promocionModel");

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

const obtenerPromociones = (req, res) => {
  listarPromociones((err, promociones) => {
    if (err) {
      console.error("Error al listar promociones:", err);
      return res.status(500).json({ error: "Error al obtener promociones" });
    }
    res.status(200).json(promociones);
  });
};

const eliminarPromocionController = (req, res) => {
  const { id } = req.params;

  eliminarPromocion(id, (err, promocionEliminada) => {
    if (err) {
      console.error("Error al eliminar promoción:", err.message);
      return res.status(500).json({ error: "Error al eliminar la promoción" });
    }
    res.status(200).json({
      message: "Promoción eliminada exitosamente",
      data: promocionEliminada,
    });
  });
};

module.exports = {
  registrarPromocion,
  obtenerPromociones,
  eliminarPromocionController,
};
