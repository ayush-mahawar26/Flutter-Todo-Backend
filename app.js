const connectDB = require("./dbconfig/dbconf");
const express = require("express");
const dotenv = require("dotenv").config();

console.log(process.env.PORT);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routers/routes"));

app.listen(process.env.PORT, () => {
	console.log("Server is Rocking!! ");
});
