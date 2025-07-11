import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowBookRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowBookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Library Management System");
});

export default app;
