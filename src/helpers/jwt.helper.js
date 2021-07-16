const { sing } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function (user) {
  return sing((user) => JWT_SECRET, { expiresIn: "4h" });
};
