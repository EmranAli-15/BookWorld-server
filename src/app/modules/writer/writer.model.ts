import { model, Schema } from "mongoose";
import { TWriter } from "./writer.interface";

const writerSchema = new Schema<TWriter>(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        summary: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export const Writer = model("Writer", writerSchema);