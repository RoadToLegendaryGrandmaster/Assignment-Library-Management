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
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("./../models/books.model");
const express_1 = __importDefault(require("express"));
exports.borrowBookRoutes = express_1.default.Router();
exports.borrowBookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const body = req.body;
    console.log(body);
    try {
        const borrowBook = yield books_model_1.Book.findById(req.body.book);
        const borrowCopy = borrowBook.copies;
        if (borrowCopy >= ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.quantity)) {
            const updatedData = {
                copies: borrowCopy === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.quantity)
                    ? 0
                    : borrowCopy - ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.quantity),
                available: borrowCopy === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.quantity) ? false : true,
            };
            // creating borrow data
            yield borrow_model_1.Borrow.create(body);
            // updating book data
            borrow_model_1.Borrow.updatedBook(req.body.book, updatedData);
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: body,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Copies of book are low",
                data: body,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "error",
            data: null,
        });
    }
}));
exports.borrowBookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrowData,
    });
}));
