const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await db("users").first().where({ email });

      if (!password) {
        return res.status(401).json({ erro: "informe a senha!" });
      }

      if (!email) {
        return res.status(401).json({ erro: "informe o email!" });
      }

      if (!user) {
        return res.status(401).json({ erro: "usuario não encontrado!" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ erro: "dados do login incorretos!" });
      }

      user.password = undefined;

      const token = jwt.sign({ user }, process.env.SECRET);
      return res.header({ authorization: token }).status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ erro: "algo deu errado" });
    }
  },
};
