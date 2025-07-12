// External module imports
import { Server } from "http";
import mongoose from "mongoose";
import process from "process";
import "dotenv/config";

// internal file import
import app from "./app";

// Assigned variable
const PORT: Number = 5000;
let server: Server;

// Main function for runing server
async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_ACCESS__URL}`); // referance .env
    // Server listining at the specific PORT, PORT will be reserved during run.
    server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log({
      message: "Server failed to start",
      success: false,
      error: error.message,
    });
  }
}

main(); // calling the function
