const express = require("express");
const router = express.Router();

const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const {
  getAllProtagonistas,
  getProtagonistaById,
  createProtagonista,
  updateProtagonista,
  deleteProtagonista
} = require("../controllers/protagonistas.controller");

// ✅ Protegemos con JWT
router.get("/", validarJWT, getAllProtagonistas);
router.get("/:id", validarJWT, getProtagonistaById);

// ✅ Solo admin puede crear, actualizar o borrar
router.post("/", validarJWT, esAdminRole, createProtagonista);
router.put("/:id", validarJWT, esAdminRole, updateProtagonista);
router.delete("/:id", validarJWT, esAdminRole, deleteProtagonista);

module.exports = router;
