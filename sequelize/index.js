const { sequelize } = require("./models");

sequelize
	.authenticate()
	.then(() => {
		return console.log("Connected");
	})
	.then(() => {
		return sequelize.sync({ alter: true });
	})
	.then(() => {
		console.log("Database Synced");
	})
	.catch((err) => {
		console.log(err);
	});
