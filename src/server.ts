import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";

const port = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin1234@cluster0.rtszv4y.mongodb.net/LibraryManagementApp?retryWrites=true&w=majority&appName=Cluster0"
    );
    server = app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
