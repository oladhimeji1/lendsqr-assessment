import { Router } from "express";
import createUser from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: Bad request
 */
router.post("/user/create", createUser);

export default router;
