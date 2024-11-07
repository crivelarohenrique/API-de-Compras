const express = require('express')
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authenticateToken } = require('../middlewares/verifyToken');

router.get('/', authenticateToken, CartController.getAllCart);
router.post('/create/:id', authenticateToken, CartController.addItemToCart)
router.delete('/delete/:id', authenticateToken, CartController.deleteItemCart)

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Rotas do carrinho do usuário.
 */

/**
 * @swagger
 * /api/cart:
 *  get:
 *    summary: Buscar carrinho.
 *    tags: [Cart]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Lista de produtos no carrinho.
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
 * /api/cart/create/{id}:
 *   post:
 *     summary: Adiciona um item ao carrinho do usuário.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto a ser adicionado.
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/cart/delete/{id}:
 *   delete:
 *     summary: Remove um item do carrinho do usuário.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto a ser removido.
 *     responses:
 *       200:
 *         description: Item do carrinho deletado com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 *       404:
 *         description: Produto não encontrado no carrinho.
 *       500:
 *         description: Erro interno do servidor.
 */


module.exports = router;