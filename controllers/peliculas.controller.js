const Pelicula = require("../models/Pelicula.model");
const Protagonista = require("../models/Protagonista.model");

// Obtener todas las películas
const getAllPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll({ order: [["id", "ASC"]] });
    return res.json(peliculas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener películas" });
  }
};

// Obtener película por id (incluye protagonistas)
const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByPk(id, {
      include: [Protagonista]
    });
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
    return res.json(pelicula);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener la película" });
  }
};

// Crear nueva película
const createPelicula = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre || !nombre.toString().trim()) {
      return res.status(400).json({ error: "El campo 'nombre' es requerido" });
    }
    if (nombre.toString().length > 30) {
      return res.status(400).json({ error: "El campo 'nombre' no puede tener más de 30 caracteres" });
    }

    const nueva = await Pelicula.create({ nombre: nombre.toString().trim() });
    return res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la película" });
  }
};

// Actualizar película
const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

    if (nombre !== undefined) {
      if (!nombre.toString().trim()) {
        return res.status(400).json({ error: "El campo 'nombre' no puede estar vacío" });
      }
      if (nombre.toString().length > 30) {
        return res.status(400).json({ error: "El campo 'nombre' no puede tener más de 30 caracteres" });
      }
      pelicula.nombre = nombre.toString().trim();
    }

    await pelicula.save();
    return res.json(pelicula);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar la película" });
  }
};

// Eliminar película (verifica protagonistas asociados)
const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

    const asociados = await Protagonista.count({ where: { peliculas_id: id } });
    if (asociados > 0) {
      return res.status(400).json({ error: "No se puede eliminar: existen protagonistas asociados" });
    }

    await pelicula.destroy();
    return res.json({ message: "Película eliminada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar la película" });
  }
};

// 👇 Exportar funciones en CommonJS
module.exports = {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula
};
