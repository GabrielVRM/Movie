const { Router } = require("express");
const UsersController = require("../controllers/usersController");
const knex = require("../database/knex");
const AppError = require("../utils/appError");
const userRouters = Router();

function userCreatedMiddleware(req, res, next) {
  if (!req.body.name || !req.body.email || !req.body.password)
    throw new AppError("name, email and password required!");
  next();
}

async function userVerify(req, res, next) {
  const user_id = req.params.id;

  const verify = await knex("users").where({ id: user_id }).first();
  if (!verify) throw new AppError("user undefined");
  next();
}

const usersController = new UsersController();
userRouters.post("/", userCreatedMiddleware, usersController.created);

userRouters.get("/:id", usersController.show);

userRouters.put("/:id", userVerify, usersController.update);

userRouters.delete("/:id", usersController.delete);

module.exports = userRouters;
