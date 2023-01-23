"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ room_image, user, transaction, hotel }) {
			// define association here
			this.hasMany(room_image, { foreignKey: "room_id", as: "room_image" });
			this.belongsToMany(user, {
				through: { model: transaction, unique: false },
				foreignKey: "room_id",
				as: "room",
			});
			this.belongsTo(hotel, { foreignKey: "hotel_id" });
		}
	}
	room.init(
		{
			type: DataTypes.STRING,
			price: DataTypes.INTEGER,
			total_room: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "room",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return room;
};
