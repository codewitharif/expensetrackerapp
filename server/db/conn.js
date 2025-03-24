const mongoose = require("mongoose");
const database = process.env.DATABASE_CONNECTION_URL;

try {
  mongoose
    .connect(database)
    .then((response) => console.log("database connected"))
    .catch((error) => console.log("database connection error ", error));
} catch (error) {
  console.log("database connection error ");
}
