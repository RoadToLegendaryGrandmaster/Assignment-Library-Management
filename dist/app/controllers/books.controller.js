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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
// Create a book
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield books_model_1.Book.create(body);
    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: book,
    });
}));
// Get All Books
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let books = {};
    if (req.query.filter) {
        books = yield books_model_1.Book.find({ genre: req.query.filter })
            .sort({
            createdAt: req.query.sort === "desc" ? -1 : 1,
        })
            .limit((_a = Number(req.query.limit)) !== null && _a !== void 0 ? _a : 10);
    }
    else {
        books = yield books_model_1.Book.find();
    }
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
// Get Book by id
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findById(req.params.bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
}));
// update book
exports.booksRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
    });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
// delete a book
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: book,
    });
}));
