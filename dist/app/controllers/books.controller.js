"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
// External imports
const express_1 = __importDefault(require("express"));
const zod = __importStar(require("zod"));
// Internal imports
const books_model_1 = require("../models/books.model");
// Express router
exports.booksRoutes = express_1.default.Router();
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
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = BookData.parse(req.body);
        const book = yield books_model_1.Book.create(body);
        // success response
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        // Error response
        res.status(400).json({
            message: error.errorResponse.errmsg,
            success: false,
            error: error,
        });
    }
}));
// Get All Books
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // carrying all the book data
    let books = {};
    try {
        if (req.query.filter) {
            // filtering with genre
            books = yield books_model_1.Book.find({ genre: req.query.filter })
                .sort({
                createdAt: req.query.sort === "desc" ? -1 : 1,
            })
                .limit((_a = Number(req.query.limit)) !== null && _a !== void 0 ? _a : 10); // default limit 10 if the query not given
        }
        else {
            // if no query query given, default 10 data will show
            books = yield books_model_1.Book.find().limit(10);
        }
        // success response
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        // Error response
        res.status(400).json({
            message: error.errorResponse.errmsg,
            success: false,
            error: error,
        });
    }
}));
// Get Book by id
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findById(req.params.bookId);
        if (book === null)
            throw Error("Book not found");
        // Success response
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        // Error response
        res.status(400).json({
            success: false,
            message: error.message,
            error: `${req.params.bookId} not found`,
        });
    }
}));
// update book
exports.booksRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        if (book === null)
            throw Error("Book id not found");
        // Success response
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        // Error response
        res.status(400).json({
            success: false,
            message: error.message,
            error: `${req.params.bookId} not found`,
        });
    }
}));
// delete a book
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findOneAndDelete({ _id: req.params.bookId });
        if (book === null)
            throw Error("Book not found");
        // Success response
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        // Error response
        res.status(400).json({
            success: false,
            message: error.message,
            error: `${req.params.bookId} not found`,
        });
    }
}));
