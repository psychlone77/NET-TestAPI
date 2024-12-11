import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { VideoGame } from "./VideoGames";

const inputFieldStyles = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-black focus:shadow-lg transition-all duration-300";

export default function UpdateGameForm({ onClose, game }: { onClose: (state: boolean) => void, game: VideoGame }) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<VideoGame>({
        defaultValues: game
    });
    const mutation = useMutation((updatedGame: VideoGame) => {
        return axios.put(`https://localhost:7008/api/VideoGame/${game.id}`, updatedGame);
    });
    const mutationDelete = useMutation(() => {
        return axios.delete(`https://localhost:7008/api/VideoGame/${game.id}`);
    });

    const onSubmit: SubmitHandler<VideoGame> = (data) => {
        mutation.mutate({...data, id: game.id}, {
            onSuccess: () => {
                queryClient.invalidateQueries('videogames');
                console.log('Game updated successfully');
                onClose(false);
            },
            onError: (error) => {
                console.error('Error updating game:', error);
            }
        });
    };

    const handleDelete = () => {
        mutationDelete.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries('videogames');
                console.log('Game deleted successfully');
                onClose(false);
            },
            onError: (error) => {
                console.error('Error deleting game:', error);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="app block text-gray-700 text-sm font-bold mb-2">
                    Title
                </label>
                <input
                    className={`${inputFieldStyles} ${errors.title ? 'border-red-500' : ''}`}
                    id="title"
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                {errors.title && <p className="text-red-500 text-xs italic ml-2 mt-2">Please fill out this field.</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Platform
                </label>
                <input
                    className={`${inputFieldStyles} ${errors.platform ? 'border-red-500' : ''}`}
                    id="platform"
                    type="text"
                    placeholder="Platform"
                    {...register("platform", { required: true })}
                />
                {errors.platform && <p className="text-red-500 text-xs italic ml-2 mt-2">Please fill out this field.</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Developer
                </label>
                <input
                    className={`${inputFieldStyles} ${errors.developer ? 'border-red-500' : ''}`}
                    id="developer"
                    type="text"
                    placeholder="Developer"
                    autoComplete="on"
                    {...register("developer", { required: true })}
                />
                {errors.developer && <p className="text-red-500 text-xs italic ml-2 mt-2">Please fill out this field.</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Publisher
                </label>
                <input
                    className={`${inputFieldStyles} ${errors.publisher ? 'border-red-500' : ''}`}
                    id="publisher"
                    type="text"
                    placeholder="Publisher"
                    autoComplete="on"
                    {...register("publisher", { required: true })}
                />
                {errors.publisher && <p className="text-red-500 text-xs italic ml-2 mt-2">Please fill out this field.</p>}
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                    type="button"
                    onClick={handleDelete}
                >
                    Delete Game
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                    type="submit"
                >
                    Update Game
                </button>
            </div>
        </form>
    );
}