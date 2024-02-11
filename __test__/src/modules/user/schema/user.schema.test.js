const { registerSchema, loginSchema, updateSchema } = require("../../../../../src/modules/user/schema/user.schema");

const validInput = {
  name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("USER SCHEMA TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should validate a valid registration input", () => {
    const result = registerSchema.validate(validInput);
    expect(result.error).toBeUndefined();
  });

  it("should invalidate an invalid registration", () => {
    const invalidInput = {
      email: "invalid-email",
    };
    const result = registerSchema.validate(invalidInput);
    expect(result.error).toBeDefined();
  });

  it("should validate a valid login input", () => {
    const loginInput = { email: validInput.email, password: validInput.password };
    const result = loginSchema.validate(loginInput);

    expect(result.error).toBeUndefined();
  });

  it("should validate an invalid login input", () => {
    const invalidLoginInput = { email: "invalid-email", password: "short" };
    const result = loginSchema.validate(invalidLoginInput);

    expect(result.error).toBeDefined();
  });

  it("should validate a valid update input", () => {
    const updateInput = {
      name: "UpdatedName",
      last_name: "UpdatedLastName",
      email: "updated.email@example.com",
      password: "updatedPassword",
    };

    const result = updateSchema.validate(updateInput);

    expect(result.error).toBeUndefined();
  });

  it("should validate an invalid update input", () => {
    const invalidUpdateInput = {
      name: "Up",
      last_name: "UpdatedLastName",
      email: "updated.email@example.com",
      password: "short",
    };

    const result = updateSchema.validate(invalidUpdateInput);

    expect(result.error).toBeDefined();
  });

  it("should validate a valid update input with missing fields", () => {
    const partialUpdateInput = {
      name: "UpdatedName",
      last_name: "UpdatedLastName",
    };

    const result = updateSchema.validate(partialUpdateInput);
    
    expect(result.error).toBeUndefined();
  });
});
