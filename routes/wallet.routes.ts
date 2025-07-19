import express from 'express';
import { fundWalletController,
  withdrawWalletController,
  transferWalletController, } from '../controllers/wallet.controller';

const router = express.Router();

/**
 * @swagger
 * /wallets/{userId}/fund:
 *   post:
 *     summary: Fund a wallet
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FundWallet'
 *     responses:
 *       200:
 *         description: Wallet funded successfully
 *       400:
 *         description: Invalid request
 */

router.post('/wallets/:userId/fund', fundWalletController);

/**
 * @swagger
 * /wallets/{userId}/withdraw:
 *   post:
 *     summary: Withdraw from a wallet
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WithdrawWallet'
 *     responses:
 *       200:
 *         description: Wallet funded successfully
 *       400:
 *         description: Invalid request
 */

router.post("/wallets/:userId/withdraw", withdrawWalletController);


/**
 * @swagger
 * /wallets/transfer:
 *   post:
 *     summary: Transfer to a wallet
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferWallet'
 *     responses:
 *       200:
 *         description: Wallet funded successfully
 *       400:
 *         description: Invalid request
 */
router.post("/wallets/transfer", transferWalletController);

module.exports = router;


export default router;
