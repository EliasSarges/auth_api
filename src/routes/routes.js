const { Router } = require("express");
const routes = Router();

// importação das rotas
require("./User")(routes);
require("./Auth")(routes);

// rota fallback
routes.get("*", (req, res) => {
  res.send("rota nao encontrada");
});

module.exports = routes;
