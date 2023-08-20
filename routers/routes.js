const express = require("express");
const AuthController = require("../controller/auth.controller");
const TaskController = require("../controller/task.controller");

console.log("router");

const router = express.Router();

// Auth Service
router.post("/signup", AuthController.signupController);
router.post("/signin", AuthController.signinController);
router.post("/verifyuser", AuthController.getUserData);
router.post("/getuserbyid", AuthController.getUserById);

// task crud opr
router.get(`/gettask/:id`, TaskController.getAllTask);
router.post("/posttask", TaskController.postTask);
router.post(`/deletetask/:id`, TaskController.deleteTask);
router.post(`/update/:id`, TaskController.updateTask);

module.exports = router;
