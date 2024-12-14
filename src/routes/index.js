const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *       404:
 *         description: No users found.
 *       500:
 *         description: Internal server error.
 */
router.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
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
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Name or email missing.
 *       409:
 *         description: Conflict. User already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/users', userController.createUser);

module.exports = router;
