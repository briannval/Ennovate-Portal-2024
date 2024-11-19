import mongoose, { Schema } from "mongoose";
import BusinessProposal, { IBusinessProposal } from "./BusinessProposal";
import Blog, { IBlogPopulated } from "./Blog";

export interface IProject {
  _id: string;
  name: string;
  description: string;
  businessProposal: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
}

export interface IProjectPopulated {
  _id: string;
  name: string;
  description: string;
  businessProposal: IBusinessProposal;
  blog: IBlogPopulated;
}

mongoose.Promise = global.Promise;

const ProjectSchema: Schema<IProject> = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  businessProposal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BusinessProposal,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Blog,
  },
});

const Project =
  (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
