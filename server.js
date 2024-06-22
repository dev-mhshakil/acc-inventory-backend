const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

const port = process.env.PORT || 8080;

// database connection
mongoose.connect(process.env.MONGODB_LOCAL_URL).then(() => {
  console.log(`Database connection established`.red.bold);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});
