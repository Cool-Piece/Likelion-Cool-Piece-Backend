import mongoose from "mongoose";
import createError from "http-errors";

mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    createError(500, "mongodb connection error");
  }
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB  can not connect", error);

db.once("open", handleOpen);
db.on("error", handleError);

db.on("disconnected", () => {
  console.log("❌ DB  can not connect", error);
  createError(500), "Database Disconnected, so we try to connect again";
  this.connect();
});
