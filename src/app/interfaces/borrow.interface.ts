import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

// Static Method
export interface UserStaticMethod extends Model<IBorrow> {
  updatedBook(bookId: Types.ObjectId, updatedData: Object): void;
}
