const express = require("express");

const router = express.Router();

const tasksController = require("./controllers/tasksController");
const taskmiddleware = require("./middlewares/tasksmiddleware")

router.get("/tasks", tasksController.getAll);
router.post("/tasks",  taskmiddleware.validateFieldTitle, tasksController.createTask);
router.delete("/tasks/:id",tasksController.deleteTask);
router.put("/tasks/:id",
taskmiddleware.validateFieldTitle,
taskmiddleware.validateFieldStatus,
tasksController.updateTask);

module.exports = router;
