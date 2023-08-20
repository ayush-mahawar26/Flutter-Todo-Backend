const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.DBLINK;

mongoose
	.connect(url)
	.then(() => console.log("Connected"))
	.catch(() => console.log("Error Occured"));
