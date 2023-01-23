const express = require("express");
const Router = express.Router();

const { hotelController } = require("../controller");

Router.get("/search", hotelController.searchHotel);
Router.get("/details/:id", hotelController.hotelDetails);

module.exports = Router;
