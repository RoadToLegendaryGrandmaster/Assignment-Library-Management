import { Schema, Types } from "mongoose";
import { Borrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<Borrow>({
  book: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Schema.Types.Date },
});
