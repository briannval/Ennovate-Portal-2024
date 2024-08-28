import mongoose, { Schema } from "mongoose";

export interface IBlog {
  _id: string;
  mediumUrl: string;
  featured: boolean;
}

mongoose.Promise = global.Promise;

const BlogSchema: Schema<IBlog> = new Schema<IBlog>({
  mediumUrl: {
    type: String,
    required: true,
    unique: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Blog =
  (mongoose.models.Blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
