const { userController, registerController } = require("../controllers/userController");
const loginRoute = (app) => {
  app.get("/login", userController);
  app.post("/login", userController);
  app.post("/register", registerController);
};

module.exports = loginRoute;
