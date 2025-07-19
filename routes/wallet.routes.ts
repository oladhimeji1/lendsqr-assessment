import express from 'express';
import { fundWalletController,
  withdrawWalletController,
  transferWalletController, } from '../controllers/wallet.controller';

const router = express.Router();

router.post('/:userId/fund', fundWalletController);
router.post("/:userId/withdraw", withdrawWalletController);
router.post("/transfer", transferWalletController);

module.exports = router;


export default router;
