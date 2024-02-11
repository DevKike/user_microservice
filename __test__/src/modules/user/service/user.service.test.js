const { register, findUserBy, update, destroy } = require("../../../../../src/modules/user/service/user.service");
const { models } = require("../../../../../src/db/sequelize");

jest.mock("../../../../../src/db/sequelize", () => ({
  models: {
    User: {
      create: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
  },
}));


const userData = {
  name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("USER SERVICE TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user in the db successfully", async () => {
    models.User.create.mockResolvedValueOnce({ ...userData, id: 1 });

    const result = await register(userData);

    expect(result).toEqual({ ...userData, id: 1 });
    expect(models.User.create).toHaveBeenCalledWith(userData);
  });

  it("should throw an error if register fails", async () => {

    const mockError = new Error("User register failed");
    models.User.create.mockRejectedValueOnce(mockError);

    try {
        await register(userData);
        throw new Error('Expected an error to be thrown');
    } catch (error) {
        expect(error).toBe(mockError);
    }
    expect(models.User.create).toHaveBeenCalledWith(userData);
  });

  it("should find a user by id successfully", async () => {
    const userId = 1;
    const user = { id: userId, ...userData };

    models.User.findByPk.mockResolvedValueOnce(user);

    const result = await findUserBy({ id: userId });

    expect(result).toEqual(user);
  });

  it("should find user by other properties successfully", async () => {
    const user = { id: 1, ...userData};

    models.User.findOne.mockResolvedValueOnce(user);

    const result = await findUserBy({ email: userData.email });

    expect(result).toEqual(user);
    expect(models.User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
  });

  it("should throw an error if something fails", async () => {
    const error = new Error("error");

    models.User.findByPk.mockRejectedValueOnce(error);

    await expect(findUserBy({ id: 1 })).rejects.toThrow(error);
  });

  it("should update data of a user successfully", async () => {
    const updatedUser = { id: 1, ...userData, name: "Steve Doe" };
    models.User.update.mockResolvedValueOnce([1]);

    const result = await update(updatedUser);

    expect(result).toEqual([1]);
    expect(models.User.update).toHaveBeenCalledWith({ ...updatedUser }, { where: { id: updatedUser.id } });
  });

  it("should throw an error if update fails", async () => {
    const mockError = new Error("User update failed");
    models.User.update.mockRejectedValueOnce(mockError);

    try {
      await update(userData);
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBe(mockError);
    }
    expect(models.User.update).toHaveBeenCalledWith({ ...userData }, { where: { id: userData.id } });
  });  

  it("should delete a user successfully", async () => {
    const userId = 'validUserId';
    const mockResult = { affectedRows: 1 };
  
    models.User.destroy.mockResolvedValueOnce(mockResult);

    const result = await destroy(userId);
  
    expect(models.User.destroy).toHaveBeenCalledWith({ where: { id: userId } });
  
    expect(result).toEqual(mockResult);
  });

  it('should throw an error when delete user fails', async () => {
    const userId = 'validUserId';
    const errorMessage = 'Failed to destroy user';
  
    models.User.destroy.mockRejectedValueOnce(new Error(errorMessage));
    await expect(destroy(userId)).rejects.toThrow(errorMessage);

    expect(models.User.destroy).toHaveBeenCalledWith({ where: { id: userId } });
  });
});
