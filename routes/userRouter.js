const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const hashPassword = require('../middlewares/hashPassword');
const { authenticateToken } = require('../middlewares/verifyToken');
const validateCredentials = require('../middlewares/validateUser');

router.get('/info', authenticateToken, UserController.getUserInfoController);
router.post('/login', UserController.loginUserController);
router.post('/register', validateCredentials, hashPassword, UserController.createUserController);
router.post('/logout', authenticateToken, (req, res) => {
  res.clearCookie('jwt'); 
  return res.json({ message: 'Logout bem sucedido' });
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Rotas do usuário.
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Cadastra um usuário.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *                 default: Abacaxi123?
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Erro de validação ou usuário já existe.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Loga um usuário.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Logado com sucesso.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/user/info:
 *   get:
 *     summary: Obtém as informações do usuário (balance e username).
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário (balance e username) retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: Saldo do usuário.
 *                 username:
 *                   type: string
 *                   description: Nome de usuário.
 *       401:
 *         description: Não autorizado (usuário não autenticado).
 *       500:
 *         description: Erro interno do servidor.
 */


/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Desloga o usuário.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout bem-sucedido, cookie do token JWT foi limpo.
 *       401:
 *         description: Não autorizado (usuário não autenticado).
 *       500:
 *         description: Erro interno do servidor.
 */

module.exports = router;
