import mongoose, { Model, Schema, Types } from "mongoose";
import { IBorrow, UserStaticMethod } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, UserStaticMethod>(
  {
    book: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Schema.Types.Date },
  },
  { versionKey: false, timestamps: true }
);

// static method
borrowSchema.static(
  "updatedBook",
  async function (bookId: Types.ObjectId, updatedData: Object) {
    await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
  }
);

export const Borrow = mongoose.model<IBorrow, UserStaticMethod>(
  "Borrow",
  borrowSchema
);
