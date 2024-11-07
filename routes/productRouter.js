const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController');


/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: Rotas dos produtos.
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *     summary: Retorna todos os livros.
 *     tags: [Products]
 *     responses:
 *       200:
 *          description: Lista de livros.
 * 
 * /api/products/{slug}:
 *  get:
 *     summary: Retorna livro pelo slug na url.
 *     tags: [Products]
 *     parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *        description: Slug do livro.
 *        schema:
 *          type: string
 *          default: o-hobbit
 *     responses:
 *       200:
 *          description: Retorna um único livro pelo slug.
 *
  * /api/products/getOneByInput:
  *  post:
  *     summary: Retorna livro pelo título na url.
  *     tags: [Products]
  *     requestBody:
  *        required: true
  *        content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                   type: string
  *                   description: Título do livro.
  *                   default: O Hobbit
  *     responses:
  *       200:
  *          description: Retorna um único livro pelo título.
  */
router.get('/', ProductController.getAllProducts);
router.get('/:slug', ProductController.getProductByUrl)
router.post('/getOneByInput', ProductController.postProductByInput)
module.exports = router;
