import { Types } from "mongoose";

export interface Borrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
