import { error } from "console";
// External import
import express, { Request, Response } from "express";
import * as zod from "zod";

// Internal import
import { Borrow } from "../models/borrow.model";
import { Book } from "./../models/books.model";
import mongoose from "mongoose";

// Extress router
export const borrowBookRoutes = express.Router();

// API
// borrow the book
borrowBookRoutes.post("/", async (req: Request, res: Response) => {
  const body = await req.body;

  try {
    const borrowBook: any = await Book.findOne({ _id: req.body.book });
    const borrowCopy: number = borrowBook.copies;
    // checking if the req ammount of book is less than or equal to actual ammount books
    if (borrowCopy >= req?.body?.quantity) {
      const updatedData: Object = {
        copies:
          borrowCopy === req?.body?.quantity
            ? 0
            : borrowCopy - req?.body?.quantity,
        available: borrowCopy === req?.body?.quantity ? false : true,
      };
      // creating borrow data
      const updatedBorrowBook = await Borrow.create(body);
      // updating book data
      Borrow.updatedBook(req.body.book, updatedData); // static method
      await updatedBorrowBook.save();

      // success status
      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: updatedBorrowBook,
      });
    } else {
      // success status
      throw Error(
        `Book has ${borrowCopy} copies, you requested ${req?.body?.quantity}`
      );
    }
  } catch (error: any) {
    // Error response
    res.status(400).json({
      success: false,
      message: "Requested ammount of books are not present",
      error: error.message,
    });
  }
});

// See all the borrowed book details and ammount od borrowed copies
borrowBookRoutes.get("/", async (req: Request, res: Response) => {
  // aggrigate function
  try {
    const borrowData = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "libraryBooksDetails",
        },
      },
      {
        $unwind: "$libraryBooksDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$libraryBooksDetails.title",
            isbn: "$libraryBooksDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    // success status
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowData,
    });
  } catch (error: any) {
    // Error responce
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
