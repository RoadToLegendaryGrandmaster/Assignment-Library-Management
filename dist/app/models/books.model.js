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
exports.Book = void 0;
// External imports
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const borrow_model_1 = require("./borrow.model");
// Schema define
const booksSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        uppercase: true,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
// hooks
// middlewere
booksSchema.pre("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("findOneAndDelete,... is executed...be carefull");
    });
});
// post
// When delete a book then all borrowed book will delete
booksSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.Borrow.deleteMany({ user: doc._id });
        }
        next();
    });
});
// Exports
exports.Book = mongoose_1.default.model("Book", booksSchema);
