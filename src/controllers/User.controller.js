const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    res.send("user controller");
  },
};
