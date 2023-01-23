"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class hotel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ hotel_image, room }) {
			// define association here
			this.hasMany(hotel_image, { foreignKey: "hotel_id", as: "hotel_image" });
			this.hasMany(room, { foreignKey: "hotel_id", as: "room" });
		}
	}
	hotel.init(
		{
			name: DataTypes.STRING,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "hotel",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return hotel;
};
