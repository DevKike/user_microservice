const { verify, sign } = require("jsonwebtoken");
const { TOKEN } = require("../config/config");

const verifyToken = (token) => {
    try {
        return verify(token, TOKEN.jwtToken);
    } catch (error) {
        throw new Error("Error verifying token");
    }
};

const signToken = (data) => {
    try {
        return sign(data, TOKEN.jwtToken, {
            expiresIn: "24h"
        });
    } catch (error) {
        throw new Error("Error signing token");
    }
};

module.exports = { verifyToken, signToken };