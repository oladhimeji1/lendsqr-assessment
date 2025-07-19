import { Request, Response } from 'express';
import  { fundWalletService, withdrawWalletService, transferWalletService } from '../services/wallet.service';

async function fundWalletController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const { amount, receiverAccount } = req.body;

    if (isNaN(userId) || !amount || amount <= 0 || !receiverAccount) {
      return res.status(400).json({ error: "Invalid input or some fields are missing" });
    }

    const wallet = await fundWalletService(userId, amount, receiverAccount);

    res.status(200).json({ message: 'Wallet funded successfully', wallet });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

async function withdrawWalletController(req: any, res: any) {
  try {
    const userId = parseInt(req.params.userId);
    const { amount, senderAccount } = req.body;

    if (isNaN(userId) || !amount || amount <= 0 || !senderAccount) {
      return res.status(400).json({ error: "Invalid input or some fields are missing" });
    }

    const wallet = await withdrawWalletService(userId, amount, senderAccount);

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
    const { senderAccount, receiverAccount, amount, senderId, receiverId } = req.body;

    if (!senderAccount || !receiverAccount || !amount || !senderId || !receiverId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await transferWalletService(senderAccount, receiverAccount, amount, senderId, receiverId);

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


