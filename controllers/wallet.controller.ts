import { Request, Response } from 'express';
import  { fundWalletService, withdrawWalletService, transferWalletService } from '../services/wallet.service';

async function fundWalletController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const { amount } = req.body;

    const wallet = await fundWalletService(userId, amount);
    res.status(200).json({ message: 'Wallet funded successfully', wallet });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

async function withdrawWalletController(req: any, res: any) {
  try {
    const userId = parseInt(req.params.userId);
    const { amount } = req.body;

    if (isNaN(userId) || !amount) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const wallet = await withdrawWalletService(userId, amount);

    res.status(200).json({
      message: "Withdrawal successful",
      wallet,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function transferWalletController(req: any, res: any) {
  try {
    const { senderId, receiverId, amount } = req.body;

    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await transferWalletService(senderId, receiverId, amount);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export {
  withdrawWalletController,
  transferWalletController,
  fundWalletController
};


