const { compareSync, genSaltSync, hashSync } = require("bcrypt");

const salt = genSaltSync(10);

const hash = (data) => {
    return hashSync(data, salt);
}

const compare = (plain, encrypted) => {
    return compareSync(plain, encrypted);
}

module.exports = { hash, compare };