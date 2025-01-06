import axios from "axios";
import { PaginatedResponse, VideoGameRequest, VideoGameResponse } from "../types/types";
import { VideoGameRequestSchema } from "../types/schemas";

const baseURL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches all video games from the API.
 *
 * @returns {Promise<VideoGameResponse[]>} A promise that resolves to an array of video game responses.
 */
export async function fetchAllVideoGames(): Promise<VideoGameResponse[]> {
    const response = await axios.get(`${baseURL}/api/VideoGame`);
    return response.data;
}

/**
 * Fetches a paginated list of video games from the API.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<PaginatedResponse>} A promise that resolves to a paginated response containing video games.
 */
export async function fetchAllVideoGamesPaginated(page: number, pageSize: number): Promise<PaginatedResponse> {
    const response = await axios.get(`${baseURL}/api/VideoGame/paginated?page=${page}&pageSize=${pageSize}`);
    return response.data;
}

/**
 * Adds a new video game to the database.
 *
 * @param {VideoGameRequest} newGame - The video game data to be added.
 * @returns {Promise<VideoGameResponse>} A promise that resolves to the response of the added video game.
 * @throws Will throw an error if the video game data is invalid or the request fails.
 */
export async function addVideoGame(newGame: VideoGameRequest): Promise<VideoGameResponse> {
    VideoGameRequestSchema.parse(newGame);
    return await axios.post(`${baseURL}/api/VideoGame`, newGame);
}

/**
 * Updates a video game with the given data.
 *
 * @param {VideoGameRequest} updatedGame - The updated video game data.
 * @param {number} gameId - The ID of the video game to update.
 * @returns {Promise<VideoGameResponse>} A promise that resolves to the updated video game response.
 * @throws {ZodError} If the updatedGame data does not conform to the VideoGameRequest schema.
 */
export async function updateVideoGame(updatedGame: VideoGameRequest, gameId: number): Promise<VideoGameResponse> {
    VideoGameRequestSchema.parse(updatedGame);
    console.log(updatedGame);
    return await axios.put(`${baseURL}/api/VideoGame/${gameId}`, updatedGame);
}

/**
 * Deletes a video game by its ID.
 *
 * @param {number} gameId - The ID of the video game to delete.
 * @returns {Promise<void>} A promise that resolves when the video game is deleted.
 */
export async function deleteVideoGame(gameId : number): Promise<void> {
    return await axios.delete(`${baseURL}/api/VideoGame/${gameId}`);
}