const { Pelicula, Protagonista, Heroe, Multimedia } = require("../models/associations");

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

const getProtagonistasByPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await Pelicula.findByPk(id, {
      include: [{
        model: Protagonista,
        include: [Heroe]   // 👈 Incluye datos del héroe
      }]
    });

    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
    return res.json(pelicula);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener protagonistas de la película" });
  }
};

const getMultimediaByPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await Pelicula.findByPk(id, {
      include: [
        {
          model: Protagonista,
          include: [
            {
              model: Heroe,
              include: [
                {
                  model: Multimedia,
                  as: "multimedias",   // usa el alias que definiste en belongsToMany
                  through: { attributes: [] }
                }
              ]
            }
          ]
        }
      ]
    });

    res.json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener multimedia de la película" });
  }
};


// 👇 Exportar funciones en CommonJS
module.exports = {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getProtagonistasByPelicula,
  getMultimediaByPelicula
};
