const mongoose = require("mongoose");

const todoTask = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	isDone: {
		type: Boolean,
		required: true,
	},
});

const Task = mongoose.model("task", todoTask);
module.exports = Task;
