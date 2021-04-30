const { Router } = require("express");
const routes = Router();

require("./User")(routes);

routes.get("*", (req, res) => {
  res.send("rota nao encontrada");
});

module.exports = routes;
