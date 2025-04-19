const { actualizarRol, getAllUsersWithRoles } = require("../models/userModel");

const editarRol = (req, res) => {
  const { id_usuario, id_rol } = req.body;

  actualizarRol(id_usuario, id_rol, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al asignar el rol" });
    }
    res.status(200).json(result);
  });
};

const listarUsuariosConRoles = (req, res) => {
  getAllUsersWithRoles((err, usuarios) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener los usuarios con sus roles" });
    }
    res.status(200).json(usuarios);
  });
};

module.exports = {
  editarRol,
  listarUsuariosConRoles,
};
