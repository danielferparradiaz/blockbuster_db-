const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula
} = require("../controllers/peliculas.controller");

const router = Router();

// CRUD Peliculas
router.get("/", validarJWT, getAllPeliculas);
router.get("/:id", validarJWT, getPeliculaById);
router.post("/", validarJWT, esAdminRole, createPelicula);
router.put("/:id", validarJWT, esAdminRole, updatePelicula);
router.delete("/:id", validarJWT, esAdminRole, deletePelicula);

module.exports = router;
