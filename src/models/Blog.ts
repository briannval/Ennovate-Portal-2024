import mongoose, { Schema } from "mongoose";

export interface IBlog {
  _id: string;
  mediumUrl: string;
}

mongoose.Promise = global.Promise;

const BlogSchema: Schema<IBlog> = new Schema<IBlog>({
  mediumUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const Blog =
  (mongoose.models.Blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
