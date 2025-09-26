const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const {
  heroesGet,
  heroeIdGet,
  heroesComoGet,
  heroesPost,
  heroePut,
  heroeDelete
} = require('../controllers/heroes.controller');

const router = Router();

// END Points
router.get('/', validarJWT, heroesGet);
router.get('/:id', validarJWT, heroeIdGet);
router.get('/como/:termino', validarJWT, heroesComoGet);

router.post('/', validarJWT, esAdminRole, heroesPost);
router.put('/:id', validarJWT, esAdminRole, heroePut);
router.delete('/:id', validarJWT, esAdminRole, heroeDelete);

module.exports = router;
