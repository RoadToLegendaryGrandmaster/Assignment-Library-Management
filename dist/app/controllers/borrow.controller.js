"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookRoutes = void 0;
// External import
const express_1 = __importDefault(require("express"));
// Internal import
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("./../models/books.model");
// Extress router
exports.borrowBookRoutes = express_1.default.Router();
// API
// borrow the book
exports.borrowBookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const body = yield req.body;
    try {
        const borrowBook = yield books_model_1.Book.findOne({ _id: req.body.book });
        const borrowCopy = borrowBook.copies;
        // checking if the req ammount of book is less than or equal to actual ammount books
        if (borrowCopy >= ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.quantity)) {
            const updatedData = {
                copies: borrowCopy === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.quantity)
                    ? 0
                    : borrowCopy - ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.quantity),
                available: borrowCopy === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.quantity) ? false : true,
            };
            // creating borrow data
            const updatedBorrowBook = yield borrow_model_1.Borrow.create(body);
            // updating book data
            borrow_model_1.Borrow.updatedBook(req.body.book, updatedData); // static method
            yield updatedBorrowBook.save();
            // success status
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: updatedBorrowBook,
            });
        }
        else {
            // success status
            throw Error(`Book has ${borrowCopy} copies, you requested ${(_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.quantity}`);
        }
    }
    catch (error) {
        // Error response
        res.status(400).json({
            success: false,
            message: "Requested ammount of books are not present",
            error: error.message,
        });
    }
}));
// See all the borrowed book details and ammount od borrowed copies
exports.borrowBookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // aggrigate function
    try {
        const borrowData = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        // Error responce
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
