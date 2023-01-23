const db = require("./models");
const { sequelize } = require("./models");
const moment = require("moment");

sequelize
	.authenticate()
	.then(() => {
		db.transaction.bulkCreate([
			{
				hotel_name: "hotel3",
				hotel_location: "location2",
				room_price: 700000,
				room_name: "hr3t1",
				qty: 1,
				total_price: 2400000,
				checkin: "2023-01-13",
				checkout: "2023-01-16",
				expired: `${moment().add(1, "h")}`,
				status: "paid",
				room_id: 7,
				user_id: 1,
			},
		]);
	})
	.catch((error) => {
		return console.log(error);
	});
