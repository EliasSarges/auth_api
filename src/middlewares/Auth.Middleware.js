const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ erro: "nenhum token fornecido!" });
  }

  const bearer = authorization.split(" ")[0];
  const token = authorization.split(" ")[1];

  if (/^Bearer$/i.test(bearer) == false) {
    return res
      .status(401)
      .send({ erro: "token malformado! esperado: Bearer [JWT_TOKEN]" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ erro: "token invalido" });
    }

    req.data = decoded;
    return next();
  });
};

module.exports = AuthMiddleware;
