"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
// booksSchema.pre("findById", async function () {});
// booksSchema.post("findById", async function () {});
exports.Book = mongoose_1.default.model("Book", booksSchema);
