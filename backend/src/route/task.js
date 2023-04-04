const express = require("express");
const task = require("../controller/task");
const request = require("../request/task");

const router = express.Router();

router.get("/tasks", task.all);
router.get("/tasks/:id", request.find_id, task.find_id);
router.post("/tasks", request.create, task.create);
router.put("/tasks/:id", request.update, task.update);
router.delete("/tasks/:id", request.delete, task.delete);

module.exports = router;