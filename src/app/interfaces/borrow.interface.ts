// External imports
import { Model, Types } from "mongoose";

// interfaces
export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

// Static Method thats extends IBorrow type interface Model
export interface UserStaticMethod extends Model<IBorrow> {
  updatedBook(bookId: Types.ObjectId, updatedData: Object): void;
}
