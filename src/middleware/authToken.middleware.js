const { verifyToken } = require("../util/jwtToken");

const authToken = () => {
  return (req, res, next) => {
    try {
      const authorization = req.headers?.authorization;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Token not provided");
      }

      const token = authorization.split(" ")[1];
      const decoded = verifyToken(token);

      req.user = decoded.userId;
      next();
    } catch (error) {
      res.status(403).send({
        error: "Authorization denied",
      });
    }
  };
};

module.exports = authToken;