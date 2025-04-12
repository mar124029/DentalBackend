const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/verifyToken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Este es un recurso protegido", user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
