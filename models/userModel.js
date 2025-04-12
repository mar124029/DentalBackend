const db = require("../config/db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// const createUser = (user, callback) => {
//   const {
//     nombre,
//     dni,
//     nacimiento,
//     telefono,
//     correo,
//     password,
//     rolId = 1,
//   } = user;

//   bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//     if (err) {
//       return callback(err);
//     }

//     const query = `
//       INSERT INTO usuarios (nombre, dni, nacimiento, telefono, correo, password, rol_id)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//       query,
//       [nombre, dni, nacimiento, telefono, correo, hashedPassword, rolId],
//       callback
//     );
//   });
// };

// const findUserByDni = (dni, callback) => {
//   const query = "SELECT * FROM usuarios WHERE dni = ?";
//   db.query(query, [dni], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     return callback(null, result[0]);
//   });
// };

// const comparePassword = (plainPassword, hashedPassword, callback) => {
//   bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, isMatch);
//   });
// };

// module.exports = { createUser, findUserByDni, comparePassword };

const createUser = (user, callback) => {
  const {
    nombre,
    dni,
    nacimiento,
    telefono,
    correo,
    password,
    rolId = 1,
  } = user;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = `
      INSERT INTO usuarios (nombre, dni, nacimiento, telefono, correo, password, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      nombre,
      dni,
      nacimiento,
      telefono,
      correo,
      hashedPassword,
      rolId,
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
    return callback(null, result.rows[0]); // Importante: usamos result.rows
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

module.exports = {
  createUser,
  findUserByDni,
  comparePassword,
};
