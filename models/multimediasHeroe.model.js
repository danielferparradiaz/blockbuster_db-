const mongoose = require("mongoose");

const MultimediasHeroeSchema = new mongoose.Schema({
  heroe_id: { type: mongoose.Schema.Types.ObjectId, ref: "Heroe" },
  multimedia_id: { type: mongoose.Schema.Types.ObjectId, ref: "Multimedia" },
}, {
  collection: "multimedias_heroe",
  versionKey: false,
  timestamps: false
});

module.exports = mongoose.model("MultimediasHeroe", MultimediasHeroeSchema);
