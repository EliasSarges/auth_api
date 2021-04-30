const UserController = require("../../controllers/User.controller");

module.exports = (routes) => {
  routes.get("/user", UserController.index);
};
