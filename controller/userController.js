const { Op } = require("sequelize");
const { hashPassword, hashMatch } = require("../lib/hash");
const { createToken } = require("../lib/jwt");

const db = require("../sequelize/models");

module.exports = {
	signUp: async (req, res) => {
		let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,10}$/;
		let { username, email, password, role } = req.body;

		if (!regex.test(password)) {
			return res.status(400).send({
				isError: true,
				message: "Password must between 6 to 10 characters and contain a number",
				data: null,
			});
		}

		try {
			await db.user.create({ username, email, password: await hashPassword(password), role });
			return res.status(201).send({
				isError: false,
				message: "Register Success",
				data: null,
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.errors[0].message,
				data: null,
			});
		}
	},
	signIn: async (req, res) => {
		let { username, password } = req.query;
		try {
			let response = await db.user.findOne({
				where: {
					[Op.or]: [{ username: username }, { email: username }],
				},
			});

			if (!response) {
				return res.status(400).send({
					isError: true,
					message: error.errors[0].message,
					data: null,
				});
			}

			let passwordMatch = await hashMatch(password, response.password);

			if (!passwordMatch) {
				return res.status(400).send({
					isError: true,
					message: "Invalid password",
					data: null,
				});
			}

			return res.status(200).send({
				isError: false,
				message: "Login Success",
				data: { token: createToken({ id: response.uuid }) },
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.errors[0].message,
				data: null,
			});
		}
	},
};
