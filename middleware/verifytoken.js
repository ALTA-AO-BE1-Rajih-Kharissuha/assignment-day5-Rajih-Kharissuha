const jwt = require("jsonwebtoken");

const verifyRole = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "login first" });
  jwt.verify(token, "rahasia", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;

    if (req.user.roles === "user") {
      return res.sendStatus(401);
    }
    next();
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "rahasia", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, verifyRole };
