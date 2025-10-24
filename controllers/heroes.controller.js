const { response, request } = require("express");
const Heroe = require("../models/Heroe.model");

// ✅ GET: todos los héroes
const heroesGet = async (req = request, res = response) => {
  try {
    const heroes = await Heroe.find().sort({ nombre: 1 }); // Orden alfabético opcional

    res.json({
      ok: true,
      data: heroes,
    });
  } catch (error) {
    console.error("❌ Error al obtener héroes:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

// ✅ GET: héroe por ID
const heroeIdGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const heroe = await Heroe.findById(id);

    if (!heroe) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un héroe con el id: ${id}`,
      });
    }

    res.json({
      ok: true,
      data: heroe,
    });
  } catch (error) {
    console.error("❌ Error al buscar héroe:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

// ✅ GET: búsqueda por nombre (LIKE)
const heroesComoGet = async (req = request, res = response) => {
  const { termino } = req.params;

  try {
    const regex = new RegExp(termino, "i"); // 'i' = case-insensitive
    const heroes = await Heroe.find({ nombre: { $regex: regex } }).select("nombre bio").sort({ nombre: 1 });

    res.json({
      ok: true,
      data: heroes,
    });
  } catch (error) {
    console.error("❌ Error en búsqueda:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

// ✅ POST: crear héroe
const heroesPost = async (req = request, res = response) => {
  const { nombre, bio, img, aparicion, casa } = req.body;

  try {
    const existeHeroe = await Heroe.findOne({ nombre });

    if (existeHeroe) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe un héroe llamado: ${nombre}`,
      });
    }

    const heroe = new Heroe({ nombre, bio, img, aparicion, casa });
    await heroe.save();

    res.json({
      ok: true,
      msg: "✅ Héroe insertado correctamente",
      data: heroe,
    });
  } catch (error) {
    console.error("❌ Error al crear héroe:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

// ✅ PUT: actualizar héroe
const heroePut = async (req = request, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const heroe = await Heroe.findById(id);

    if (!heroe) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un héroe con el id: ${id}`,
      });
    }

    const heroeActualizado = await Heroe.findByIdAndUpdate(id, body, { new: true });

    res.json({
      ok: true,
      msg: "✅ Héroe actualizado",
      data: heroeActualizado,
    });
  } catch (error) {
    console.error("❌ Error al actualizar héroe:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

// ✅ DELETE: eliminar héroe
const heroeDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const heroe = await Heroe.findById(id);

    if (!heroe) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un héroe con el id: ${id}`,
      });
    }

    await Heroe.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "🗑️ Héroe eliminado",
      data: heroe,
    });
  } catch (error) {
    console.error("❌ Error al eliminar héroe:", error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
      err: error.message,
    });
  }
};

module.exports = {
  heroesGet,
  heroeIdGet,
  heroesComoGet,
  heroesPost,
  heroePut,
  heroeDelete,
};
