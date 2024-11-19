import mongoose, { Schema } from "mongoose";

export interface IBlog {
  _id: string;
  mediumUrl: string;
  featured: boolean;
}
export interface IBlogPopulated {
  coverImage: string;
  title: string;
  subtitle: string;
  readingTime: string;
  dateUploaded: string;
  mediumUrl: string;
  featured: boolean;
  id: string;
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
