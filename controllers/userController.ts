const { createUserService } = require("../services/userService");
import { Request, Response } from "express";
import { CreateUserData, User } from "../interfaces/index";


exports.createUser = async function(
  req: Request<{}, {}, CreateUserData>,
  res: Response
) {
  const { name, email, bvn } = req.body;

  if (!name || !email || !bvn) {
    return res.status(400).json({ message: "Name, email, and BVN are required." });
  }

  try {
    const user: User = await createUserService({ name, email, bvn });
    return res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    const message: string = error.message || "Internal server error";
    const status: number = message === "User is blacklisted" || message === "Email already in use" ? 403 : 500;
    return res.status(status).json({ message });
  }
};
