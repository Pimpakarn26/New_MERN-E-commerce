const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  jwt.verify(token, key, (err, decode) => {
    if (err) return res.status(403).json({ message: "Access Forbidden" });
    req.userId = decode.id;
    req.username = decode.username;
    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: " Require Admin Role" });
  }
  next();
};


const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
