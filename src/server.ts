import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import process from "process";
import "dotenv/config";

const port = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_ACCESS__URL}`);
    server = app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
