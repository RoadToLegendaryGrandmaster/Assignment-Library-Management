// External imports
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// Internal imports
import { IBooks } from "../interfaces/books.interface";
import { Borrow } from "./borrow.model";

// Schema define
const booksSchema = new Schema<IBooks>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// hooks
// middlewere

booksSchema.pre("findOneAndDelete", async function (doc) {
  console.log("findOneAndDelete,... is executed...be carefull");
});

// post
// When delete a book then all borrowed book will delete
booksSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Borrow.deleteMany({ user: doc._id });
  }
  next();
});

// Exports
export const Book = mongoose.model<IBooks>("Book", booksSchema);
