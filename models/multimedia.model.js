const mongoose = require("mongoose");

const MultimediaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, maxlength: 50, trim: true },
    url: { type: String, required: true, trim: true },
    tipo: { type: String, enum: ["imagen", "video", "audio", "otro"], default: "imagen" },

    // Campo opcional si quieres saber a qué héroe pertenece directamente
    heroe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Heroe",
      required: false
    }
  },
  {
    collection: "multimedias",
    versionKey: false,
    timestamps: true, // Guarda createdAt / updatedAt
  }
);

module.exports = mongoose.model("Multimedia", MultimediaSchema);
