import mongoose, { Schema } from "mongoose";

export interface IBusinessWorkshop {
  _id: string;
  name: string;
  month: string;
  slides: string;
  worksheet: string;
}

mongoose.Promise = global.Promise;

const BusinessWorkshopSchema: Schema<IBusinessWorkshop> = new Schema<IBusinessWorkshop>({
  name: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  slides: {
    type: String,
    required: true,
  },
  worksheet: {
    type: String,
    required: true,
  },
});

const BusinessWorkshop =
  (mongoose.models.BusinessWorkshop as mongoose.Model<IBusinessWorkshop>) ||
  mongoose.model<IBusinessWorkshop>("BusinessWorkshop", BusinessWorkshopSchema);

export default BusinessWorkshop;
