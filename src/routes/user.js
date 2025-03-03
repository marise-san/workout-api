const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para gerenciar usuários
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna todos os usuários cadastrados
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuários cadastrados
 *       500:
 *         description: Erro no servidor
 */
router.get("/", authMiddleware, getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/", createUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
// router.put("/:id", authMiddleware, updateUser);
router.put("/:id", updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
