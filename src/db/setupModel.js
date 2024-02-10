const { UserSchema, User } = require('../modules/user/model/user.model');

const setupModel = (sequelize) => {
   User.init(UserSchema, User.config(sequelize)); 
}

module.exports = setupModel;