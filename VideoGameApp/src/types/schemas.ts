import { z } from 'zod';

export const VideoGameResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    platform: z.string(),
    developer: z.string(),
    publisher: z.string(),
});

export const VideoGameRequestSchema = z.object({
    title: z.string(),
    platform: z.string(),
    developer: z.string(),
    publisher: z.string(),
});