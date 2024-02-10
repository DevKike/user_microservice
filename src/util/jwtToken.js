const { verify, sign } = require("jsonwebtoken");
const { TOKEN } = require("../config/config");

const verifyToken = (token) => {
    try {
        return verify(token, TOKEN.jwtToken);
    } catch (error) {
        throw new Error("Error verifying token");
    }
};

const signToken = (userId) => {
    try {
        return sign({userId}, TOKEN.jwtToken, {
            expiresIn: "24h"
        });
    } catch (error) {
        throw new Error("Error signing token");
    }
};

module.exports = { verifyToken, signToken };