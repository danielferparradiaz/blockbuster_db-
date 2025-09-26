const Multimedia = require("../models/Multimedia.model");

// Obtener todos
const getAllMultimedia = async (req, res) => {
  try {
    const data = await Multimedia.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener multimedias" });
  }
};

// Obtener por id
const getMultimediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const multimedia = await Multimedia.findByPk(id);
    if (!multimedia) return res.status(404).json({ error: "Multimedia no encontrada" });
    res.json(multimedia);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener multimedia" });
  }
};

// Crear
const createMultimedia = async (req, res) => {
  try {
    const { nombre, url, tipo } = req.body;
    const newMultimedia = await Multimedia.create({ nombre, url, tipo });
    res.status(201).json(newMultimedia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear multimedia" });
  }
};

// Actualizar
const updateMultimedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, url, tipo } = req.body;
    const multimedia = await Multimedia.findByPk(id);
    if (!multimedia) return res.status(404).json({ error: "Multimedia no encontrada" });

    await multimedia.update({ nombre, url, tipo });
    res.json(multimedia);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar multimedia" });
  }
};

// Eliminar
const deleteMultimedia = async (req, res) => {
  try {
    const { id } = req.params;
    const multimedia = await Multimedia.findByPk(id);
    if (!multimedia) return res.status(404).json({ error: "Multimedia no encontrada" });

    await multimedia.destroy();
    res.json({ message: "Multimedia eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar multimedia" });
  }
};

// 👇 Exportar todo en CommonJS
module.exports = {
  getAllMultimedia,
  getMultimediaById,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia
};
