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

async function fundWalletService(userId: number, amount: number, receiverAccount: string): Promise<Wallet> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await db.transaction(async (trx: any) => {
    let wallet: Wallet | undefined = await trx("wallets").where({ user_id: userId }).first();
    let receiverWallet: Wallet | undefined = await trx("wallets").where({ account_no: receiverAccount }).first();

    if (!wallet || !receiverWallet) {
      throw new Error("Wallet not found");
    }

    const newBalance = parseFloat(wallet.account_balance.toString()) + amount;

    await trx("wallets").where({ user_id: userId }).update({ account_balance: newBalance });

    await trx("transactions").insert({
      type: "fund",
      amount,
      receiver_id: userId,
      receiver_account: receiverAccount,
      reference: generateRef(),
    });
    wallet = {
      ...wallet,
      account_balance: newBalance,
    }

    return {
      ...wallet,
      amount: amount,
    };
  });
}

async function transferWalletService(
  senderAccount: number,
  receiverAccount: number,
  amount: number,
  senderId: number,
receiverId: number
): Promise<{ message: string; senderBalance: number; receiverBalance: number }> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }


  return await db.transaction(async (trx: any) => {
    try {
      const senderWallet = await trx("wallets").where({ account_no: senderAccount }).first();
      const receiverWallet = await trx("wallets").where({ account_no: receiverAccount }).first();

      if (!senderWallet || !receiverWallet) {
        throw new Error("Sender or receiver wallet not found");
      }

      if(senderId === receiverId || senderAccount === receiverAccount) {
        throw new Error("You cannot transfer to the same account");
      }

      if (parseFloat(senderWallet.account_balance) < amount) {
        throw new Error("Insufficient balance");
      }
      
  // console.log(amount, senderId, receiverId);

      const newSenderBalance = parseFloat(senderWallet.account_balance) - amount;
      const newReceiverBalance = parseFloat(receiverWallet.account_balance) + amount;

      await trx("wallets").where({ account_no: senderAccount }).update({ account_balance: newSenderBalance });
      await trx("wallets").where({ account_no: receiverAccount }).update({ account_balance: newReceiverBalance });

      await trx("transactions").insert({
          type: "transfer",
          amount,
          sender_account: senderAccount,
          receiver_account: receiverAccount,
          sender_id: senderId,
          receiver_id: receiverId,
          reference: generateRef(),
      });


      return {
        message: "Transfer successful",
        sender: senderId,
        receiver: receiverId,
        amount: amount,
        // senderBalance: newSenderBalance,
        balance: newReceiverBalance,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  });
}

async function withdrawWalletService(userId: number, amount: number, senderAccount: number): Promise<Wallet> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await db.transaction(async (trx: any) => {
    let user: Wallet | undefined = await trx("wallets").where({ user_id: userId }).first();
    let wallet: Wallet = await trx("wallets").where({ account_no: senderAccount }).first();

    if (!wallet || !user) {
      throw new Error("Wallet not found");
    }

    if (parseFloat(wallet.account_balance.toString()) < amount) {
      throw new Error("Insufficient balance");
    }

    const newBalance = parseFloat(wallet.account_balance.toString()) - amount;

    await trx("wallets").where({ user_id: userId }).update({ account_balance: newBalance });

    await trx("transactions").insert({
        type: "withdraw",
        amount,
        sender_id: userId,
        sender_account: senderAccount,
        reference: generateRef(),
    });

    wallet = {
      ...wallet,
      account_balance: newBalance,
    }

    return {
      ...wallet,
      amount: amount,
    };
  });
}



export { fundWalletService, transferWalletService, withdrawWalletService };
