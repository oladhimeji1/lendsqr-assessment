const db = require("../config/db");
const { isBlacklisted } = require("../utils/karma");
import { CreateUserData, User } from "../interfaces/index";

async function createUserService(data: CreateUserData): Promise<User> {
  const { name, email, bvn } = data;

  const blacklisted: boolean = await isBlacklisted(bvn);
  if (blacklisted) {
    throw new Error("User is blacklisted");
  }

  const existingUser: User | undefined = await db("users").where({ email }).first();
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const [newUser]: User[] = await db("users").insert(
    { name, email, bvn },
    ["id", "name", "email", "bvn", "balance"]
  );

  return newUser;
}

module.exports = { createUserService };
