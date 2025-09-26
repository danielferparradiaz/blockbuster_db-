const Heroe = require("../models/mySqlHeroes.model");
const Pelicula = require("../models/Pelicula.model");
const Protagonista = require("../models/Protagonista.model");

// Obtener todos
const getAllProtagonistas = async (req, res) => {
  try {
    const data = await Protagonista.findAll({
      include: [Heroe, Pelicula]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener protagonistas" });
  }
};

// Obtener por id
const getProtagonistaById = async (req, res) => {
  try {
    const { id } = req.params;
    const protagonista = await Protagonista.findByPk(id, {
      include: [Heroe, Pelicula]
    });
    if (!protagonista) return res.status(404).json({ error: "Protagonista no encontrado" });
    res.json(protagonista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener protagonista" });
  }
};

// Crear
const createProtagonista = async (req, res) => {
  try {
    const { papel, fecha_participacion, heroes_id, peliculas_id } = req.body;
    const newProtagonista = await Protagonista.create({
      papel,
      fecha_participacion,
      heroes_id,
      peliculas_id
    });
    res.status(201).json(newProtagonista);
  } catch (error) {
    res.status(500).json({ error: "Error al crear protagonista" });
  }
};

// Actualizar
const updateProtagonista = async (req, res) => {
  try {
    const { id } = req.params;
    const { papel, fecha_participacion, heroes_id, peliculas_id } = req.body;
    const protagonista = await Protagonista.findByPk(id);
    if (!protagonista) return res.status(404).json({ error: "Protagonista no encontrado" });

    await protagonista.update({ papel, fecha_participacion, heroes_id, peliculas_id });
    res.json(protagonista);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar protagonista" });
  }
};

// Eliminar
const deleteProtagonista = async (req, res) => {
  try {
    const { id } = req.params;
    const protagonista = await Protagonista.findByPk(id);
    if (!protagonista) return res.status(404).json({ error: "Protagonista no encontrado" });

    await protagonista.destroy();
    res.json({ message: "Protagonista eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar protagonista" });
  }
};

// 👇 exportar en CommonJS
module.exports = {
  getAllProtagonistas,
  getProtagonistaById,
  createProtagonista,
  updateProtagonista,
  deleteProtagonista
};
