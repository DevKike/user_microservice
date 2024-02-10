const { models } = require("../../../db/sequelize");

const register = async (data) => {
  try {
    const user = await models.User.create(data);

    return user;
  } catch (error) {
    throw error;
  }
};

const findUserBy = async (user) => {
  try {
    if (user.id) {
      return await models.User.findByPk(user.id);
    } else {
      return await models.User.findOne({ where: { ...user } });
    }
  } catch (error) {
    throw error;
  }
};

const update = async (user) => {
  try {
    return await models.User.update({ ...user }, { where: { id: user.id } });
  } catch (error) {
    throw error;
  }
};

const destroy = async (userId) => {
  try {
    return await models.User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

module.exports = { register, findUserBy, update, destroy };