const indexController = require("../controller/indexController");
const { jwtMiddleware } = require("../../../front/js/jwtMiddleware");

exports.indexRouter = function (app) {
  //CRUD
  //create
  app.post("/todos", jwtMiddleware, indexController.createdTodo);
  app.get("/todos", jwtMiddleware, indexController.readTodo); // //read
  app.patch("/todo", jwtMiddleware, indexController.updateTodo);
  app.delete("/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo); //delete
};
