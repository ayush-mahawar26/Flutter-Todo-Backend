const Task = require("../model/taskmodel");
const taskModel = require("../model/taskmodel");

class TaskController {
	static async getAllTask(req, res) {
		try {
			const id = req.params.id;
			let tasks = await Task.find({
				id: id,
			});
			return res.json({
				getted: true,
				mssg: "task fetched successfully",
				tasks: tasks,
			});
		} catch (error) {
			return res.json({
				getted: true,
				mssg: "task fetched successfully",
				tasks: task,
			});
		}
	}

	static async postTask(req, res) {
		const { id, title, description, isDone } = req.body;
		console.log(req.body);
		try {
			let task = await taskModel({
				id: id,
				title: title,
				description: description,
				isDone: isDone,
			});

			task = await task.save();
			console.log(task);
			console.log("---- this ----");

			return res.json({
				added: true,
				mssg: "Task Added",
				...task._doc,
			});
		} catch (error) {
			return res.json({
				added: false,
				mssg: "Error in Adding whole task",
			});
		}
	}

	static async deleteTask(req, res) {
		try {
			// in params : id is the unique id of each task
			const _id = req.params.id;
			console.log(_id);
			let task = await Task.findOne({
				_id: _id,
			});
			console.log(task);
			if (task !== null) {
				await Task.deleteOne({ _id });
				return res.json({
					deleted: true,
					mssg: "Successfully Deleted",
				});
			} else {
				return res.json({
					deleted: false,
					mssg: "no document found",
				});
			}
		} catch (error) {}
	}

	static async updateTask(req, res) {
		// in params : id is the unique id of each task

		const { title, description } = req.body;
		try {
			const taskId = req.params.id;
			console.log(taskId);
			const task = await Task.updateOne(
				{
					_id: taskId,
				},
				{
					$set: {
						title: title,
						description: description,
					},
				}
			);
			console.log(task);
			return res.json({
				updated: true,
				mssg: "Task is updated",
				task,
			});
		} catch (error) {
			return res.json({
				updated: false,
				mssg: "Error in update",
			});
		}
	}
	static async updateDoneStatus(req, res) {
		// in params : id is the unique id of each task

		const { isDone } = req.body;
		try {
			const taskId = req.params.id;
			console.log(taskId);
			const task = await Task.updateOne(
				{
					_id: taskId,
				},
				{
					$set: {
						isDone: isDone,
					},
				}
			);
			return res.json({
				updated: true,
				mssg: "Task is updated",
			});
		} catch (error) {
			return res.json({
				updated: false,
				mssg: "Error in update",
			});
		}
	}
}

module.exports = TaskController;
