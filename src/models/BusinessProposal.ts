import mongoose, { Schema } from "mongoose";

export interface IBusinessProposal {
  name: string;
  description: string;
  drive: string;
  image: string;
}

mongoose.Promise = global.Promise;

const BusinessProposalSchema: Schema = new Schema<IBusinessProposal>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  drive: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const BusinessProposal =
  (mongoose.models.BusinessProposal as mongoose.Model<IBusinessProposal>) ||
  mongoose.model<IBusinessProposal>("BusinessProposal", BusinessProposalSchema);

export default BusinessProposal;
