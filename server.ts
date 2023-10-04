import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import applyRouters from "./helpers/applyRouters";
import seed, { fetch, fetch2, remove, update } from "./seeder";
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
    res.locals.user = user;
    res.locals.test = "test";
    next();
  });
}

app.post("/login", async (req, res) => {
  let user = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });

  if (user && user?.password === req.body.password) {
    let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
    res.send({
      token,
    });
  } else {
    res.sendStatus(300);
  }
});

app.post("/singup", async (req, res) => {
  let user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  res.send({
    token,
  });
});

app.use(authenticateToken);

app.put("/user/update", async (req, res) => {
  await prisma.user.update({
    where: {
      id: Number(res.locals.user.id),
    },
    data: {
      password: req.body.password,
    },
  });
});

app.get("/seed", async (req, res) => {
  res.send(await seed());
});
app.get("/update", async (req, res) => {
  res.send(await update());
});
app.get("/delete", async (req, res) => {
  res.send(await remove());
});
app.get("/fetch", async (req, res) => {
  res.send(await fetch());
});
app.get("/fetches", async (req, res) => {
  res.send(await fetch2());
});

applyRouters(app);

app.listen(PORT);
