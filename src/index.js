const app = require("./app/app");
const config = require("./config/config");
const sequelize = require("./db/sequelize");

const port = config.SERVER.PORT;

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server running in port http://localhost:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
