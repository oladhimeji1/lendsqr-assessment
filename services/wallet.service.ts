import db from "../config/db";
import { Wallet } from "../interfaces/index";
import { generateRef } from "../utils/generateRef";

/**
 * Fund a user's wallet.
 * @param userId - ID of the user
 * @param amount - Amount to fund
 * @returns Updated wallet
 */

/**
 * Transfer funds from one user's wallet to another.
 * @param senderId - Sender's user ID
 * @param receiverId - Receiver's user ID
 * @param amount - Amount to transfer
 * @returns Success message and updated balances
 */

// /**
//  * Withdraw funds from a user's wallet.
//  * @param userId - User ID
//  * @param amount - Amount to withdraw
//  * @returns Updated wallet
//  */

async function fundWalletService(userId: number, amount: number): Promise<Wallet> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await db.transaction(async (trx: any) => {
    const wallet: Wallet | undefined = await trx("wallets").where({ user_id: userId }).first();

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    const newBalance = parseFloat(wallet.account_balance.toString()) + amount;

    await trx("wallets").where({ user_id: userId }).update({ balance: newBalance });

    await trx("transactions").insert({
      type: "fund",
      amount,
      receiver_id: userId,
      reference: generateRef(),
    });

    return {
      ...wallet,
      balance: newBalance,
    };
  });
}

async function transferWalletService(
  senderId: number,
  receiverId: number,
  amount: number
): Promise<{ message: string; senderBalance: number; receiverBalance: number }> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await db.transaction(async (trx: any) => {
    const senderWallet = await trx("wallets").where({ user_id: senderId }).first();
    const receiverWallet = await trx("wallets").where({ user_id: receiverId }).first();

    if (!senderWallet || !receiverWallet) {
      throw new Error("Sender or receiver wallet not found");
    }

    if (parseFloat(senderWallet.balance) < amount) {
      throw new Error("Insufficient balance");
    }

    const newSenderBalance = parseFloat(senderWallet.balance) - amount;
    const newReceiverBalance = parseFloat(receiverWallet.balance) + amount;

    await trx("wallets").where({ user_id: senderId }).update({ balance: newSenderBalance });
    await trx("wallets").where({ user_id: receiverId }).update({ balance: newReceiverBalance });

    await trx("transactions").insert({
        type: "transfer",
        amount,
        sender_id: senderId,
        receiver_id: receiverId,
        reference: generateRef(),
    });


    return {
      message: "Transfer successful",
      senderBalance: newSenderBalance,
      receiverBalance: newReceiverBalance,
    };
  });
}

async function withdrawWalletService(userId: number, amount: number): Promise<Wallet> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await db.transaction(async (trx: any) => {
    const wallet: Wallet = await trx("wallets").where({ user_id: userId }).first();

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (parseFloat(wallet.account_balance.toString()) < amount) {
      throw new Error("Insufficient balance");
    }

    const newBalance = parseFloat(wallet.account_balance.toString()) - amount;

    await trx("wallets").where({ user_id: userId }).update({ balance: newBalance });

    await trx("transactions").insert({
        type: "withdraw",
        amount,
        sender_id: userId,
        reference: generateRef(),
    });


    return {
      ...wallet,
      balance: newBalance,
    };
  });
}



export { fundWalletService, transferWalletService, withdrawWalletService };
