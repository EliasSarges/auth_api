const AuthController = require("../../controllers/Auth.controller");
const AuthMiddleware = require("../../middlewares/Auth.Middleware");

module.exports = (routes) => {
  routes.post("/auth/login", AuthController.login);

  routes.get("/auth/verify", AuthMiddleware, (req, res) => {
    const user = req.data;

    return res.status(200).json(user);
  });
};
