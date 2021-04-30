const UserController = require("../../controllers/User.controller");

module.exports = (routes) => {
  routes.get("/users", UserController.index);
};
