const Pelicula = require("../models/Pelicula.model");
const Protagonista = require("../models/Protagonista.model");
const Heroe = require("../models/Heroe.model");
const Multimedia = require("../models/Multimedia.model");

// ✅ Obtener todas las películas
const getAllPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find().sort({ _id: 1 });
    res.json(peliculas);
  } catch (error) {
    console.error("❌ Error al obtener películas:", error);
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

// ✅ Obtener una película por ID (con protagonistas)
const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findById(id)
      .populate({
        path: "protagonistas",
        populate: { path: "heroe" }
      });

    if (!pelicula)
      return res.status(404).json({ error: "Película no encontrada" });

    res.json(pelicula);
  } catch (error) {
    console.error("❌ Error al obtener película:", error);
    res.status(500).json({ error: "Error al obtener la película" });
  }
};

// ✅ Crear una nueva película
const createPelicula = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: "El campo 'nombre' es requerido" });
    }

    const nueva = new Pelicula({ nombre: nombre.trim() });
    await nueva.save();

    res.status(201).json(nueva);
  } catch (error) {
    console.error("❌ Error al crear película:", error);
    res.status(500).json({ error: "Error al crear la película" });
  }
};

// ✅ Actualizar una película
const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const pelicula = await Pelicula.findById(id);
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

    if (nombre) {
      pelicula.nombre = nombre.trim();
    }

    await pelicula.save();
    res.json(pelicula);
  } catch (error) {
    console.error("❌ Error al actualizar película:", error);
    res.status(500).json({ error: "Error al actualizar la película" });
  }
};

// ✅ Eliminar película (solo si no tiene protagonistas)
const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const protagonistas = await Protagonista.countDocuments({ pelicula: id });
    if (protagonistas > 0) {
      return res.status(400).json({
        error: "No se puede eliminar: existen protagonistas asociados"
      });
    }

    await Pelicula.findByIdAndDelete(id);
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar película:", error);
    res.status(500).json({ error: "Error al eliminar la película" });
  }
};

// ✅ Obtener protagonistas de una película
const getProtagonistasByPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const protagonistas = await Protagonista.find({ pelicula: id })
      .populate("heroe");

    res.json(protagonistas);
  } catch (error) {
    console.error("❌ Error al obtener protagonistas:", error);
    res.status(500).json({ error: "Error al obtener protagonistas" });
  }
};

// ✅ Obtener multimedias de una película (profundizando)
const getMultimediaByPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const protagonistas = await Protagonista.find({ pelicula: id })
      .populate({
        path: "heroe",
        populate: { path: "multimedias" }
      });

    res.json({ pelicula_id: id, protagonistas });
  } catch (error) {
    console.error("❌ Error al obtener multimedia:", error);
    res.status(500).json({ error: "Error al obtener multimedia de la película" });
  }
};

module.exports = {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getProtagonistasByPelicula,
  getMultimediaByPelicula
};
