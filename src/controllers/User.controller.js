const db = require("../database/connection");

const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const data = await db
      .select("id", "first_name", "last_name", "email")
      .from("users");

    return res.json(data);
  },

  async create(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
      if (!first_name || !last_name || !email || !password) {
        return res
          .status(500)
          .json({ erro: "forneça todos os dados necessarios!" });
      }

      const user = {
        id: uuid(),
        first_name,
        last_name,
        email,
        password: await bcrypt.hash(password, 10),
      };

      await db("users").insert(user);
      user.password = undefined;

      const token = jwt.sign({ user }, process.env.SECRET);

      return res.header({ Authorization: token }).status(201).json(user);
    } catch (error) {
      if (error.errno == 19) {
        return res.status(500).json({ erro: "email ja cadastrado!" });
      } else {
        return res.status(500).json({ erro: "algo deu errado!" });
      }
    }
  },
};
