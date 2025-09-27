const express = require("express");
const router = express.Router();

const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const {
  getAllMultimedia,
  getMultimediaById,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia,
  asociarMultimediaAHeroe,
  desasociarMultimediaDeHeroe
} = require("../controllers/multimedia.controller");

router.get("/", validarJWT, getAllMultimedia);
router.get("/:id", validarJWT, getMultimediaById);
router.post("/", validarJWT, esAdminRole, createMultimedia);
router.put("/:id", validarJWT, esAdminRole, updateMultimedia);
router.delete("/:id", validarJWT, esAdminRole, deleteMultimedia);
// ...
// 🔹 Asociar multimedia a héroe (enviar ids por body)
router.post(
  "/asociar",
  validarJWT,
  esAdminRole,
  asociarMultimediaAHeroe
);

router.post(
  "/desasociar",
  validarJWT,
  esAdminRole,
  desasociarMultimediaDeHeroe
);


module.exports = router;
