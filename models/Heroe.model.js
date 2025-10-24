const mongoose = require("mongoose");

const HeroeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    bio: { type: String },
    img: { type: String },
    aparicion: { type: Date },
    casa: { type: String },

    // Relación con multimedia (referencias a otros documentos)
    multimedias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Multimedia"
      }
    ],
  },
  {
    collection: "heroes",
    versionKey: false,
    timestamps: true, // recomendable para auditoría
  }
);

module.exports = mongoose.model("Heroe", HeroeSchema);
