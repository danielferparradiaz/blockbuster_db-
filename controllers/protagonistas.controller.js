const Protagonista = require("../models/Protagonista.model");
const Heroe = require("../models/Heroe.model");
const Pelicula = require("../models/Pelicula.model");

// ✅ Obtener todos los protagonistas (con héroe y película)
const getAllProtagonistas = async (req, res) => {
  try {
    const data = await Protagonista.find()
      .populate("heroe")
      .populate("pelicula")
      .sort({ _id: 1 });

    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener protagonistas:", error);
    res.status(500).json({ error: "Error al obtener protagonistas" });
  }
};

// ✅ Obtener un protagonista por ID
const getProtagonistaById = async (req, res) => {
  try {
    const { id } = req.params;

    const protagonista = await Protagonista.findById(id)
      .populate("heroe")
      .populate("pelicula");

    if (!protagonista)
      return res.status(404).json({ error: "Protagonista no encontrado" });

    res.json(protagonista);
  } catch (error) {
    console.error("❌ Error al obtener protagonista:", error);
    res.status(500).json({ error: "Error al obtener protagonista" });
  }
};

// ✅ Crear nuevo protagonista
const createProtagonista = async (req, res) => {
  try {
    const { papel, fecha_participacion, heroe, pelicula } = req.body;

    // Verificar existencia de héroe y película
    const heroeExistente = await Heroe.findById(heroe);
    const peliculaExistente = await Pelicula.findById(pelicula);

    if (!heroeExistente || !peliculaExistente) {
      return res.status(400).json({ error: "Héroe o película no válido" });
    }

    const nuevoProtagonista = new Protagonista({
      papel,
      fecha_participacion,
      heroe,
      pelicula
    });

    await nuevoProtagonista.save();

    // Agregar referencia en la película (relación bidireccional opcional)
    await Pelicula.findByIdAndUpdate(pelicula, {
      $push: { protagonistas: nuevoProtagonista._id }
    });

    res.status(201).json(nuevoProtagonista);
  } catch (error) {
    console.error("❌ Error al crear protagonista:", error);
    res.status(500).json({ error: "Error al crear protagonista" });
  }
};

// ✅ Actualizar protagonista
const updateProtagonista = async (req, res) => {
  try {
    const { id } = req.params;
    const { papel, fecha_participacion, heroe, pelicula } = req.body;

    const protagonista = await Protagonista.findById(id);
    if (!protagonista)
      return res.status(404).json({ error: "Protagonista no encontrado" });

    if (heroe) {
      const heroeValido = await Heroe.findById(heroe);
      if (!heroeValido)
        return res.status(400).json({ error: "Héroe no válido" });
      protagonista.heroe = heroe;
    }

    if (pelicula) {
      const peliculaValida = await Pelicula.findById(pelicula);
      if (!peliculaValida)
        return res.status(400).json({ error: "Película no válida" });
      protagonista.pelicula = pelicula;
    }

    if (papel !== undefined) protagonista.papel = papel;
    if (fecha_participacion !== undefined)
      protagonista.fecha_participacion = fecha_participacion;

    await protagonista.save();

    res.json(protagonista);
  } catch (error) {
    console.error("❌ Error al actualizar protagonista:", error);
    res.status(500).json({ error: "Error al actualizar protagonista" });
  }
};

// ✅ Eliminar protagonista
const deleteProtagonista = async (req, res) => {
  try {
    const { id } = req.params;

    const protagonista = await Protagonista.findById(id);
    if (!protagonista)
      return res.status(404).json({ error: "Protagonista no encontrado" });

    // Eliminar referencia en la película
    await Pelicula.findByIdAndUpdate(protagonista.pelicula, {
      $pull: { protagonistas: protagonista._id }
    });

    await protagonista.deleteOne();

    res.json({ message: "Protagonista eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar protagonista:", error);
    res.status(500).json({ error: "Error al eliminar protagonista" });
  }
};

// 👇 Exportar todo en CommonJS
module.exports = {
  getAllProtagonistas,
  getProtagonistaById,
  createProtagonista,
  updateProtagonista,
  deleteProtagonista
};
