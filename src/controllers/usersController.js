const knex = require("../database/knex");
const AppError = require("../utils/appError");
const { hash } = require("bcryptjs");
class UsersController {
  async created(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await knex("users").where({ email: email }).first();
      if (user) {
        throw new AppError("WARNING: email já existe!");
      }

      const hashedPassword = await hash(password, 8);

      await knex("users").insert({
        name,
        email,
        password: hashedPassword,
      });

      res.json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await knex("users").where({ id }).first();
    if (!user) throw new AppError("user undefined");

    return res.json({
      user,
    });
  }

  async update(req, res) {
    const { email, password, old_password } = req.body;
    const { id } = req.params;
    const emailVerify = await knex("users")
      .where({ id: id, email: email })
      .first();
    const passwordVerify = await knex("users")
      .where({ id: id, password: old_password })
      .first();

    if (!emailVerify) throw new AppError("email incorrect");
    if (!passwordVerify) throw new AppError("password incorrect");

    res.json({});
  }

  async delete(req, res) {
    const { email, password } = req.body;

    const idVerify = await await knex("users")
      .where({ email: email, password: password })
      .first();

    if (!idVerify) throw new AppError("email or password invalid");

    await knex("users").where({ email: email, password: password }).delete();

    res.json({ message: "user deleted" });
  }
}

module.exports = UsersController;
