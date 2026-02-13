const { userController, registerController } = require("../controllers/userController");
const loginRoute = (app) => {
  app.post("/login", userController);
  app.post("/login", userController);
  app.post("/register", registerController);
};

module.exports = loginRoute;
