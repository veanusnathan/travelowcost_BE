const { userRouter, hotelRouter } = require("./router");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/hotels", hotelRouter);

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);
});
