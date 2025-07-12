import { IBooks } from "../interfaces/books.interface";
import { Borrow } from "../models/borrow.model";
import { Book } from "./../models/books.model";
import express, { Request, Response } from "express";

export const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  try {
    const borrowBook: any = await Book.findById(req.body.book);
    const borrowCopy = borrowBook.copies;
    if (borrowCopy >= req?.body?.quantity) {
      const updatedData: Object = {
        copies:
          borrowCopy === req?.body?.quantity
            ? 0
            : borrowCopy - req?.body?.quantity,
        available: borrowCopy === req?.body?.quantity ? false : true,
      };
      // creating borrow data
      await Borrow.create(body);
      // updating book data
      Borrow.updatedBook(req.body.book, updatedData);

      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: body,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Copies of book are low",
        data: body,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "error",
      data: null,
    });
  }
});

borrowBookRoutes.get("/", async (req: Request, res: Response) => {
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

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrowData,
  });
});
