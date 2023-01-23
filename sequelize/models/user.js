"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ room, transaction }) {
			// define association here
			this.belongsToMany(room, {
				through: { model: transaction, unique: false },
				foreignKey: "user_id",
				as: "user",
			});
		}
	}
	user.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			username: {
				type: DataTypes.STRING,
				unique: { msg: "Username not available" },
				allowNull: false,
				validate: {
					notEmpty: { msg: "Username must not be empty" },
					notNull: { msg: "User must have a username" },
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: { msg: "Email already registered" },
				allowNull: false,
				validate: {
					isEmail: { msg: "Enter a valid email address" },
					notEmpty: { msg: "User email must not be empty" },
					notNull: { msg: "User must have an email" },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: "User password must not be empty" },
					notNull: { msg: "User must have a password" },
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: "User role must not be empty" },
					notNull: { msg: "User must have a role" },
				},
			},
		},
		{
			sequelize,
			modelName: "user",
			freezeTableName: true,
		}
	);
	return user;
};
