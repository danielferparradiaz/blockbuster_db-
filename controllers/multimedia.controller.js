const Multimedia = require("../models/Multimedia.model");
const Heroe = require("../models/mySqlHeroes.model");

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

const asociarMultimediaAHeroe = async (req, res) => {
  try {
    const { heroes_id, multimedia_id } = req.body;


    const heroe = await Heroe.findByPk(heroes_id);

    const multimedia = await Multimedia.findByPk(multimedia_id);


    if (!heroe || !multimedia) {
      return res.status(404).json({ error: "Héroe o Multimedia no encontrado" });
    }

    await heroe.addMultimedia(multimedia.multimedia_id);


    res.json({ message: "Asociación creada correctamente" });
  } catch (error) {
    console.error("❌ Error en asociarMultimediaAHeroe:", error);
    res.status(500).json({ error: "Error al asociar multimedia con héroe" });
  }
};


// Quitar asociación Multimedia con Héroe
const desasociarMultimediaDeHeroe = async (req, res) => {
  try {
    const { heroes_id, multimedia_id } = req.body;

    // Validar que existan
    const heroe = await Heroe.findByPk(heroes_id);
    const multimedia = await Multimedia.findByPk(multimedia_id);

    if (!heroe || !multimedia) {
      return res.status(404).json({ error: "Héroe o Multimedia no encontrado" });
    }

    // Verificar si ya están asociados (usando el ID)
    const yaAsociado = await heroe.hasMultimedia(multimedia.multimedia_id);
    if (!yaAsociado) {
      return res.status(400).json({ error: "La multimedia NO está asociada a este héroe" });
    }

    // Quitar la asociación
    await heroe.removeMultimedia(multimedia.multimedia_id);

    res.json({
      message: "Asociación eliminada correctamente",
      heroe: heroe.nombre,
      multimedia: multimedia.nombre
    });
  } catch (error) {
    console.error("❌ Error en desasociarMultimediaDeHeroe:", error);
    res.status(500).json({ error: "Error al desasociar multimedia con héroe" });
  }
};


// 👇 Exportar todo en CommonJS
module.exports = {
  getAllMultimedia,
  getMultimediaById,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia,
  asociarMultimediaAHeroe,
  desasociarMultimediaDeHeroe
};
