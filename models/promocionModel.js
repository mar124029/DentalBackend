const db = require("../config/db");

const crearPromocion = (promocion, callback) => {
  const {
    codigo_valor,
    tipo_descuento,
    monto_descuento,
    fecha_creacion,
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

module.exports = { crearPromocion };
