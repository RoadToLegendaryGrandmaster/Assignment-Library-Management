// External imports
import express, { Application, Request, Response } from "express";

// internal imports
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowBookRoutes } from "./app/controllers/borrow.controller";

// main app
const app: Application = express();

// Express middleware
app.use(express.json());

// user defined routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowBookRoutes);

// root route
app.get("/", (req: Request, res: Response) => {
  try {
    if (res.statusCode === 200) {
      res.status(200).send("Library Management System");
    } else {
      throw Error("Responce Error");
    }
  } catch (error) {
    res.status(400).json({
      message: "Server failed to start",
      success: false,
      error: error,
    });
  }
});

// 404 routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "404 Route not found",
    success: false,
    error: {
      name: "Invalid route",
      errors: 404,
    },
  });
});

export default app;
