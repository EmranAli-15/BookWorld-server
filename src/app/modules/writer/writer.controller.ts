import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { writerService } from "./writer.service";

const createWriter = handleAsync(async (req: Request, res: Response) => {
    const result = await writerService.createWriter(req.body);

    res.status(201).json({
        message: "Writer created.",
        data: result
    })
});

const updateWriter = handleAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = await writerService.updateWriter({ id, body });

    res.status(201).json({
        message: "Writer updated.",
        data: result
    })
});


export const writerController = {
    createWriter,
    updateWriter
};