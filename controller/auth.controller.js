const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");

class AuthController {
	static async signupController(req, res) {
		const { username, email, password } = req.body;

		try {
			let userExist = await User.findOne({ email });
			if (userExist) {
				return res.json({
					auth: false,
					mssg: "user already exist",
				});
			}

			let usernameExist = await User.findOne({ username });
			if (usernameExist) {
				return res.json({
					auth: false,
					mssg: "username already exist , Try Different",
				});
			}

			let user = await User({
				username: username,
				email: email,
				password: password,
			});
			user = await user.save();

			const token = await jwt.sign({ id: user._id }, "secureKey");
			req.token = token;

			return res.json({
				auth: true,
				mssg: "successfully signup",
				token,
				...user._doc,
			});
		} catch (error) {
			return res.json({
				auth: false,
				mssg: console.error(error),
			});
		}
	}

	static async signinController(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.json({
					auth: false,
					mssg: "No account found",
				});
			} else {
				if (user.password != password) {
					return res.json({
						auth: false,
						mssg: "Invalid Credential",
					});
				}

				const token = await jwt.sign({ id: user._id }, "secureKey");
				req.token = token;
				return res.json({
					auth: true,
					mssg: "successfully sigin",
					token,
					...user._doc,
				});
			}
		} catch (error) {
			console.log(error);
			return res.json({
				auth: false,
				mssg: error,
			});
		}
	}

	static async getUserData(req, res) {
		const { key } = req.body;
		try {
			const decode = jwt.verify(key, "secureKey");
			console.log("hii");
			console.log(decode);
			return res.json({
				auth: true,
				mssg: "successfully get token",
				id: decode,
			});
		} catch (error) {
			return res.json({
				auth: false,
				mssg: "Invalid Token",
			});
		}
	}

	static async getUserById(req, res) {
		const { uid } = req.body;
		try {
			const user = await User.findOne({ _id: uid });
			if (user) {
				return res.json({
					getted: true,
					...user._doc,
				});
			} else {
				return res.json({
					getted: false,
				});
			}
		} catch (error) {
			return res.json({
				getted: false,
				mssg: error,
			});
		}
	}
}

module.exports = AuthController;
