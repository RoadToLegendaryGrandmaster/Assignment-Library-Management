// External imports
import mongoose, { Model, Schema, Types } from "mongoose";

// Internal imports
import { IBorrow, UserStaticMethod } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

// Defined Schemas
const borrowSchema = new Schema<IBorrow, UserStaticMethod>(
  {
    book: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Schema.Types.Date },
  },
  { versionKey: false, timestamps: true }
);

// Declaring static method
borrowSchema.static(
  "updatedBook",
  async function (bookId: Types.ObjectId, updatedData: Object) {
    // taking mongobd _id, and taking updated object that need to rewrite
    await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
  }
);

// Exports
export const Borrow = mongoose.model<IBorrow, UserStaticMethod>(
  "Borrow",
  borrowSchema
);
