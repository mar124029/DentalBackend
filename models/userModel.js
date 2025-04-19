const db = require("../config/db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const createUser = (user, callback) => {
  const {
    nombre,
    apellido,
    dni,
    fecha_nacimiento,
    numero_telefono,
    direccion,
    correo_electronico,
    contrasena,
  } = user;

  bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = `
    INSERT INTO usuarios (
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      numero_telefono,
      direccion,
      correo_electronico,
      contrasena
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
    const values = [
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      numero_telefono,
      direccion,
      correo_electronico,
      hashedPassword,
    ];

    db.query(query, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]);
    });
  });
};

const findUserByDni = (dni, callback) => {
  const query = "SELECT * FROM usuarios WHERE dni = $1";
  db.query(query, [dni], (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result.rows[0]);
  });
};

const comparePassword = (plainPassword, hashedPassword, callback) => {
  bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const actualizarRol = (id_usuario, id_rol_nuevo, callback) => {
  const updateQuery = `
    UPDATE usuarios_roles 
    SET id_rol = $1, asignado_en = NOW() 
    WHERE id_usuario = $2
    RETURNING *;
  `;

  db.query(updateQuery, [id_rol_nuevo, id_usuario], (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows[0]);
  });
};

const getAllUsersWithRoles = (callback) => {
  const query = `
    SELECT u.id_usuario, u.nombre, u.apellido, u.correo_electronico, r.nombre_rol
    FROM usuarios u
    LEFT JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
    LEFT JOIN roles r ON ur.id_rol = r.id_rol
  `;

  db.query(query, (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

module.exports = {
  createUser,
  findUserByDni,
  comparePassword,
  actualizarRol,
  getAllUsersWithRoles,
};
