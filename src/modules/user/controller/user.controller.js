const { ROLES } = require("../../../config/config");
const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");
const { register, findUserBy, update, destroy } = require("../service/user.service");

const registerUser = async (user) => {
  try {
    const isEmailExist = await findUserBy({ email: user.email });

    if (isEmailExist) {
      throw new Error("Email already in use");
    }

    const password = hash(user.password);
    const newUser = await register({ ...user, password });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await findUserBy({ email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email or password");
    }

    const token = signToken({ userId: user.id, role: ROLES.USER });
    
    return token;
  } catch (error) {
    throw error;
  }
};

const getData = async (userId) => {
  try {
    const user = await findUserBy({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateData = async (userId, userData) => {
  try {
    const user = await getData(userId);

    if (userData?.password) {
      const password = hash(userData.password);
      userData.password = password;
    }

    const userToUpdate = {...user.toJSON(), ...userData};

    await update(userToUpdate);

    return "User was updated successfully";
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    await destroy(userId);
  } catch (error) {
    throw error;
  }
};

const validateAccess = (role, roles) => {
  const found = roles.find(item => item === role);
  if (found) return true;
  return false; 
}

module.exports = { registerUser, loginUser, getData, updateData, deleteUser, validateAccess };