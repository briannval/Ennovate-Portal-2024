import mongoose, { Schema } from "mongoose";

export interface IPastCompRecording {
    _id: string;
    title: string;
    month: string;
    videoUrl: string;
}

mongoose.Promise = global.Promise;

const PastCompRecordingSchema: Schema<IPastCompRecording> = new Schema<IPastCompRecording>({
    title: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
        unique: true
    }
})

const PastCompRecording = (mongoose.models.PastCompRecording as mongoose.Model<IPastCompRecording>) || mongoose.model<IPastCompRecording>("PastCompRecording", PastCompRecordingSchema);

export default PastCompRecording;