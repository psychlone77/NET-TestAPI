import axios from "axios";
import { PaginatedResponse, VideoGameRequest, VideoGameResponse } from "../types/types";
import { VideoGameRequestSchema } from "../types/schemas";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAllVideoGames(): Promise<VideoGameResponse[]> {
    const response = await axios.get(`${baseURL}/api/VideoGame`);
    return response.data;
}

export async function fetchAllVideoGamesPaginated(page: number, pageSize: number): Promise<PaginatedResponse> {
    const response = await axios.get(`${baseURL}/api/VideoGame/paginated?page=${page}&pageSize=${pageSize}`);
    return response.data;
}

export async function addVideoGame(newGame: VideoGameRequest): Promise<VideoGameResponse> {
    VideoGameRequestSchema.parse(newGame);
    return await axios.post(`${baseURL}/api/VideoGame`, newGame);
}

export async function updateVideoGame(updatedGame: VideoGameRequest, gameId: number): Promise<VideoGameResponse> {
    VideoGameRequestSchema.parse(updatedGame);
    console.log(updatedGame);
    return await axios.put(`${baseURL}/api/VideoGame/${gameId}`, updatedGame);
}

export async function deleteVideoGame(gameId : number): Promise<void> {
    return await axios.delete(`${baseURL}/api/VideoGame/${gameId}`);
}