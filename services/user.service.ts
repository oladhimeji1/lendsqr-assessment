import db from "../config/db";
import isBlacklisted from "../utils/karma";
import { CreateUserData, User } from "../interfaces/index";

async function createUserService(data: CreateUserData): Promise<User> {
  const {
    phone_number,
    bvn,
    bvn_phone_number,
    name,
    dob,
    email,
    bank_code,
    state,
    lga,
    city,
    address,
    photo_url,
    documents
  } = data;

  // Optional: Uncomment for real usage
  const blacklisted = await isBlacklisted(email);
  if (blacklisted) {
    throw new Error("User is blacklisted");
  } else {
    console.log("User is not blacklisted");
  }

  const existingUser = await db("users").where({ email }).first();
  if (existingUser) {
    throw new Error("Email already in use");
  }

  return await db.transaction(async (trx: any) => {
    // ✅ Insert user and get ID
    const [userId] = await trx("users").insert({
      phone: phone_number,
      name: name,
      bvn,
      bvn_phone_number,
      dob,
      email,
      bank_code,
      state,
      lga,
      city,
      address,
      photo_url
    });

    // ✅ Fetch full user by ID
    const newUser: User = await trx("users").where({ id: userId }).first();

    // ✅ Insert KYC documents
    const docsToInsert = documents?.map((doc) => ({
      user_id: newUser.id,
      url: doc.url,
      type_id: doc.type_id,
      sub_type_id: doc.sub_type_id
    }));

    if (docsToInsert && docsToInsert.length > 0) {
      await trx("documents").insert(docsToInsert);
    }

    // ✅ Create wallet
    const [user_id] = await trx("wallets").insert({
      user_id: newUser.id,
      org_id: 2198,
      savings_id: Math.floor(Math.random() * 1e6).toString(),
      account_name: `${newUser.name}`,
      account_no: `3D5B00${Math.floor(Math.random() * 1e10)}`,
      provider: "lendsqr",
      type: "default",
      currency: "NGN",
      account_balance: 0,
      balance_last_updated: new Date(),
      is_primary: true,
      pending_transaction: 0,
      created_on: new Date(),
      deleted_flag: false
    });

    
    const wallet = await trx("wallets").where({ id: user_id }).first();

    return {newUser, account_no: wallet.account_no};
  });
}


export default createUserService;
