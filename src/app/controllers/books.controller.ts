// External imports
import express, { request, Request, Response } from "express";
import * as zod from "zod";

// Internal imports
import { Book } from "../models/books.model";

// Express router
export const booksRoutes = express.Router();

// zod, external node module, for strict typechecking
// ** zod is only using for when inserting data into database.
const BookData = zod.object({
  title: zod.string(),
  author: zod.string(),
  genre: zod.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: zod.string(),
  description: zod.string().optional(),
  copies: zod.number().nonnegative(),
  available: zod.boolean(),
});

// API
// Create a book
booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = BookData.parse(req.body);
    const book = await Book.create(body);
    // success response
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    // Error response
    res.status(400).json({
      message: error.errorResponse.errmsg,
      success: false,
      error: error,
    });
  }
});

// Get All Books
booksRoutes.get("/", async (req: Request, res: Response) => {
  // carrying all the book data
  let books: object = {};
  try {
    if (req.query.filter) {
      // filtering with genre
      books = await Book.find({ genre: req.query.filter })
        .sort({
          createdAt: req.query.sort === "desc" ? -1 : 1,
        })
        .limit(Number(req.query.limit) ?? 10); // default limit 10 if the query not given
    } else {
      // if no query query given, default 10 data will show
      books = await Book.find().limit(10);
    }

    // success response
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    // Error response
    res.status(400).json({
      message: error.errorResponse.errmsg,
      success: false,
      error: error,
    });
  }
});

// Get Book by id
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (book === null) throw Error("Book not found");
    // Success response
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    // Error response
    res.status(400).json({
      success: false,
      message: error.message,
      error: `${req.params.bookId} not found`,
    });
  }
});

// update book
booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });

    if (book === null) throw Error("Book id not found");
    // Success response
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    // Error response
    res.status(400).json({
      success: false,
      message: error.message,
      error: `${req.params.bookId} not found`,
    });
  }
});

// delete a book
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.bookId });
    if (book === null) throw Error("Book not found");
    // Success response
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    // Error response
    res.status(400).json({
      success: false,
      message: error.message,
      error: `${req.params.bookId} not found`,
    });
  }
});
