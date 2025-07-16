// src/config/db.ts
const knex = require("knex");
const knexConfig = require("../knexfile.js"); 
import { Knex } from "knex";

const environment = process.env.NODE_ENV || "development";
const config: Knex.Config = knexConfig[environment];

const db = knex(config);

export default db;

