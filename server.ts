import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import applyRouters from "./helpers/applyRouters";
require("dotenv").config();

export const AUTHENTICATION_ERROR_401 = 401;
export const AUTHORIZATION_ERROR_403 = 403;
export const prisma = new PrismaClient();

const app = express();
const PORT = 3004;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: "*",
  })
);

// auth middleware function
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(AUTHENTICATION_ERROR_401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(AUTHORIZATION_ERROR_403);
    next();
  });
}

applyRouters(app);

app.listen(PORT);
