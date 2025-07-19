import createUserService from "../services/user.service";
import { Request, Response } from "express";
import { CreateUserData, User } from "../interfaces/index";

const createUser = async function( req: Request<{}, {}, CreateUserData>, res: Response ) {
  const { phone_number,
    bvn,
    name,
    bvn_phone_number,
    dob,
    email,
    bank_code,
    state,
    lga,
    city,
    address,
    photo_url,
    documents } = req.body;

  if (!email || !phone_number || !bvn) {
    return res.status(400).json({ message: "Name, email, and phone are required." });
  }

  try {
    const user: User = await createUserService({ phone_number,
    bvn,
    name,
    bvn_phone_number,
    dob,
    email,
    bank_code,
    state,
    lga,
    city,
    address,
    photo_url,
    documents });
    return res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    const message: string = error.message || "Internal server error";
    const status: number = message === "User is blacklisted" || message === "Email already in use" ? 403 : 500;
    return res.status(status).json({ message });
  }
};

export default createUser;