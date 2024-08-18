import mongoose, { Schema } from "mongoose";

export interface ITeamMember {
  _id: string;
  name: string;
  email: string;
  title: string;
  image: string;
}

mongoose.Promise = global.Promise;

const TeamMemberSchema: Schema = new Schema<ITeamMember>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

TeamMemberSchema.index({ name: "text", title: "text" });

const TeamMember =
  (mongoose.models.TeamMember as mongoose.Model<ITeamMember>) ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
