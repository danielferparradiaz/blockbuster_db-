const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    rol: {
      type: String,
      enum: ["ADMIN_ROLE", "USER_ROLE"],
      default: "USER_ROLE",
    },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
  },
  {
    collection: "usuarios",
    versionKey: false,
    timestamps: { createdAt: "fecha_creacion", updatedAt: "fecha_actualizacion" },
  }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
