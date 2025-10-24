const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario.model");
const { generarJWT } = require("../helpers/generar-jwt");

// ✅ Crear usuario (POST)
const usuariosPost = async (req, res) => {
  try {
    const { nombre, correo, password, img, rol, google } = req.body;

    // Verificar si ya existe el usuario
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe un usuario con el correo ${correo}`,
      });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: hashedPassword,
      img,
      rol,
      google,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
      error,
    });
  }
};

// ✅ Login de usuario
const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: `Usuario / Password incorrectos - correo: ${correo}`,
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario inactivo",
      });
    }

    // Verificar contraseña
    const validaPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validaPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario / Password incorrectos - contraseña inválida",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      msg: "Login exitoso",
      usuario,
      token,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno en login",
      error,
    });
  }
};

// ✅ Obtener todos los usuarios
const usuariosGet = async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ fecha_creacion: -1 });

    res.json({
      ok: true,
      data: usuarios,
    });
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener usuarios",
      error,
    });
  }
};

module.exports = {
  usuariosPost,
  login,
  usuariosGet,
};
