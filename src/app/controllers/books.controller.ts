import express, { request, Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

// Create a book
booksRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(200).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

// Getb All Books
booksRoutes.get("/", async (req: Request, res: Response) => {
  let books: object = {};
  if (req.query.filter) {
    books = await Book.find({ genre: req.query.filter })
      .sort({
        createdAt: req.query.sort === "desc" ? -1 : 1,
      })
      .limit(Number(req.query.limit) ?? 10);
  } else {
    books = await Book.find();
  }

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// Get Book by id
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.bookId);

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// update book
booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

// delete a book
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.bookId);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: book,
  });
});
