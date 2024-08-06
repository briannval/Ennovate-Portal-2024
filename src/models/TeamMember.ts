import mongoose, { Schema, InferSchemaType } from "mongoose";

export interface ITeamMember {
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

const TeamMember =
  (mongoose.models.TeamMember as mongoose.Model<ITeamMember>) ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export type TeamMemberType = InferSchemaType<typeof TeamMemberSchema>;

export default TeamMember;
