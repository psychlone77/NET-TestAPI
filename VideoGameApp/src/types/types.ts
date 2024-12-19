import { z } from "zod";
import { VideoGameRequestSchema, VideoGameResponseSchema } from "./schemas";

export type VideoGameResponse = z.infer<typeof VideoGameResponseSchema>;

export type VideoGameRequest = z.infer<typeof VideoGameRequestSchema>;

export type QueryError = {
    message: string;
}