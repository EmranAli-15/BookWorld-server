import { TWriter } from "./writer.interface";
import { Writer } from "./writer.model";

const createWriter = async (payload: TWriter) => {
    const result = await Writer.create(payload);
    return result;
};

const updateWriter = async ({ id, body }: { id: any, body: TWriter }) => {
    const result = await Writer.findByIdAndUpdate(id, body, { new: true });
    return result;
}

export const writerService = {
    createWriter,
    updateWriter
};