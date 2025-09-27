const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getProtagonistasByPelicula,
  getMultimediaByPelicula
} = require("../controllers/peliculas.controller");

const router = Router();

// CRUD Películas
router.get("/", validarJWT, getAllPeliculas);
router.get("/:id", validarJWT, getPeliculaById);
router.post("/", validarJWT, esAdminRole, createPelicula);
router.put("/:id", validarJWT, esAdminRole, updatePelicula);
router.delete("/:id", validarJWT, esAdminRole, deletePelicula);

// Extra: obtener protagonistas de una película
router.get("/:id/multimedia", validarJWT, getMultimediaByPelicula);
router.get("/:id/protagonistas", validarJWT, getProtagonistasByPelicula);

module.exports = router;
