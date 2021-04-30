const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    const data = await db("users");

    return res.json({ users: data });
  },
};
