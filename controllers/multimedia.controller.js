const Multimedia = require("../models/Multimedia.model");
const Heroe = require("../models/Heroe.model");

// Obtener todos los registros
const getAllMultimedia = async (req, res) => {
  try {
    const data = await Multimedia.find().sort({ nombre: 1 });
    res.json({
      ok: true,
      data
    });
  } catch (error) {
    console.error("❌ Error al obtener multimedias:", error);
    res.status(500).json({ error: "Error al obtener multimedias" });
  }
};

// Obtener por ID
const getMultimediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const multimedia = await Multimedia.findById(id);
    if (!multimedia)
      return res.status(404).json({ error: "Multimedia no encontrada" });

    res.json({
      ok: true,
      data: multimedia
    });
  } catch (error) {
    console.error("❌ Error al obtener multimedia:", error);
    res.status(500).json({ error: "Error al obtener multimedia" });
  }
};

// Crear nueva multimedia
const createMultimedia = async (req, res) => {
  try {
    const { nombre, url, tipo } = req.body;

    const multimedia = new Multimedia({ nombre, url, tipo });
    await multimedia.save();

    res.status(201).json({
      ok: true,
      msg: "✅ Multimedia creada correctamente",
      data: multimedia
    });
  } catch (error) {
    console.error("❌ Error al crear multimedia:", error);
    res.status(500).json({ error: "Error al crear multimedia" });
  }
};

// Actualizar multimedia
const updateMultimedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, url, tipo } = req.body;

    const multimediaActualizada = await Multimedia.findByIdAndUpdate(
      id,
      { nombre, url, tipo },
      { new: true }
    );

    if (!multimediaActualizada)
      return res.status(404).json({ error: "Multimedia no encontrada" });

    res.json({
      ok: true,
      msg: "✅ Multimedia actualizada correctamente",
      data: multimediaActualizada
    });
  } catch (error) {
    console.error("❌ Error al actualizar multimedia:", error);
    res.status(500).json({ error: "Error al actualizar multimedia" });
  }
};

// Eliminar multimedia
const deleteMultimedia = async (req, res) => {
  try {
    const { id } = req.params;

    const multimedia = await Multimedia.findByIdAndDelete(id);
    if (!multimedia)
      return res.status(404).json({ error: "Multimedia no encontrada" });

    res.json({
      ok: true,
      msg: "🗑️ Multimedia eliminada correctamente",
      data: multimedia
    });
  } catch (error) {
    console.error("❌ Error al eliminar multimedia:", error);
    res.status(500).json({ error: "Error al eliminar multimedia" });
  }
};

// Asociar multimedia a un héroe (embed)
const asociarMultimediaAHeroe = async (req, res) => {
  try {
    const { heroeId, multimediaId } = req.body;

    const heroe = await Heroe.findById(heroeId);
    const multimedia = await Multimedia.findById(multimediaId);

    if (!heroe || !multimedia)
      return res.status(404).json({ error: "Héroe o multimedia no encontrado" });

    // Evitar duplicados
    const yaExiste = heroe.multimedias.some(
      (m) => m._id.toString() === multimediaId
    );
    if (yaExiste)
      return res.status(400).json({ error: "La multimedia ya está asociada" });

    // Agregar embebido dentro del héroe
    heroe.multimedias.push({
      _id: multimedia._id,
      nombre: multimedia.nombre,
      url: multimedia.url,
      tipo: multimedia.tipo
    });

    await heroe.save();

    res.json({
      ok: true,
      msg: "✅ Multimedia asociada correctamente al héroe",
      data: heroe
    });
  } catch (error) {
    console.error("❌ Error al asociar multimedia:", error);
    res.status(500).json({ error: "Error al asociar multimedia con héroe" });
  }
};

// Desasociar multimedia de un héroe
const desasociarMultimediaDeHeroe = async (req, res) => {
  try {
    const { heroeId, multimediaId } = req.body;

    const heroe = await Heroe.findById(heroeId);
    if (!heroe)
      return res.status(404).json({ error: "Héroe no encontrado" });

    const inicial = heroe.multimedias.length;
    heroe.multimedias = heroe.multimedias.filter(
      (m) => m._id.toString() !== multimediaId
    );

    if (heroe.multimedias.length === inicial)
      return res.status(400).json({ error: "La multimedia no estaba asociada" });

    await heroe.save();

    res.json({
      ok: true,
      msg: "❎ Multimedia desasociada correctamente",
      data: heroe
    });
  } catch (error) {
    console.error("❌ Error al desasociar multimedia:", error);
    res.status(500).json({ error: "Error al desasociar multimedia con héroe" });
  }
};

module.exports = {
  getAllMultimedia,
  getMultimediaById,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia,
  asociarMultimediaAHeroe,
  desasociarMultimediaDeHeroe,
};
