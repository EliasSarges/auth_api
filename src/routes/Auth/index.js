const AuthController = require("../../controllers/Auth.controller");

module.exports = (routes) => {
  routes.post("/auth", AuthController.login);
};
