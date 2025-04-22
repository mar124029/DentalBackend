const db = require("../config/db");

const crearPromocion = (promocion, callback) => {
  const {
    codigo_valor,
    tipo_descuento,
    monto_descuento,
    fecha_creacion = new Date(), // 👈 Aquí se asigna por defecto
    fecha_expiracion,
    esta_activa = true,
    creado_por,
  } = promocion;

  const query = `
    INSERT INTO promociones (
      codigo_valor,
      tipo_descuento,
      monto_descuento,
      fecha_creacion,
      fecha_expiracion,
      esta_activa,
      creado_por
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    codigo_valor,
    tipo_descuento,
    monto_descuento,
    fecha_creacion,
    fecha_expiracion,
    esta_activa,
    creado_por,
  ];

  db.query(query, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows[0]);
  });
};

const listarPromociones = (callback) => {
  const query = `
    SELECT * FROM promociones
    ORDER BY fecha_creacion DESC;
  `;

  db.query(query, (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

const eliminarPromocion = (id_promocion, callback) => {
  const query = `DELETE FROM promociones WHERE id_promocion = $1 RETURNING *;`;

  db.query(query, [id_promocion], (err, result) => {
    if (err) return callback(err);
    if (result.rowCount === 0) {
      return callback(new Error("Promoción no encontrada"));
    }
    callback(null, result.rows[0]);
  });
};

module.exports = { crearPromocion, listarPromociones, eliminarPromocion };
