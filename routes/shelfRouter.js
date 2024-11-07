const express = require('express');
const router = express.Router();
const ShelfController = require('../controllers/ShelfController');
const { authenticateToken } = require('../middlewares/verifyToken');

router.get('/', authenticateToken, ShelfController.getShelfItemsController);
router.post('/purchase', authenticateToken, ShelfController.addToShelfController);

/**
 * @swagger
 * tags:
 *   name: Shelf
 *   description: Rotas da estante do usuário.
 */

/**
 * @swagger
 * /api/shelf:
 *  get:
 *    summary: Buscar estante.
 *    tags: [Shelf]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Lista de produtos na estante.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                items:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      productId:
 *                        type: string
 *                      quantity:
 *                        type: integer
 *      401:
 *        description: Usuário não autenticado ou sessão expirada.
 *      500:
 *        description: Erro interno do servidor. Verifique os logs para mais informações.
 */  

/**
 * @swagger
 * /api/shelf/purchase:
 *  post:
 *    summary: Adicionar um item à estante.
 *    tags: [Shelf]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Item adicionado com sucesso à estante.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      401:
 *        description: Usuário não autenticado ou sessão expirada.
 *      500:
 *        description: Erro interno do servidor. Verifique os logs para mais informações.
 */

module.exports = router;
