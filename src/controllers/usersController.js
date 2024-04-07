const knex = require("../database/knex");
const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");
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

    const user = await knex("users").where({ id: id }).first();
    const emailVerify = await knex("users")
      .where({ id: id, email: email })
      .first();

    if (!emailVerify) throw new AppError("email incorrect");

    // if (!passwordVerify) throw new AppError("password incorrect");

    if (old_password && password) {
      const checkHashPassword = await compare(old_password, user.password);

      if (!checkHashPassword) {
        throw new AppError("password incorrect!");
      }

      const newPassword = await hash(password, 8);
      console.log(newPassword);
      await knex("users").where({ id: id }).update({
        password: newPassword,
      });
    }

    res.json({});
  }

  async delete(req, res) {
    const { email, password } = req.body;

    const { id } = req.params;

    const user = await knex("users").where({ id: id }).first();
    if (!user) throw new AppError("id not exist");

    const userVerify = await await knex("users")
      .where({ email: email, password: password })
      .first();

    const passwordVerify = compare(password, user.password);
    if (!userVerify && !passwordVerify)
      throw new AppError("email or password invalid");

    await knex("users").where({ email: email }).delete();

    res.json({ message: "user deleted" });
  }
}

module.exports = UsersController;
