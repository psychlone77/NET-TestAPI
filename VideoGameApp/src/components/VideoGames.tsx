import { useQuery } from "react-query";

interface VideoGame {
    id: number;
    title: string;
    platform: string;
    developer: string;
    publisher: string;
}

export default function VideoGamesComponent() {
    async function fetchData(): Promise<VideoGame[]> {
        const response = await fetch('https://localhost:7008/api/VideoGame');
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    }

    const { data, isLoading, isError } = useQuery<VideoGame[]>('videogames', fetchData);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    console.log(data)
    return (
        <>
            {data?.map((game) => (
                <div key={game.id}>
                    <h3>{game.title}</h3>
                    <p>{game.platform}</p>
                    <p>{game.developer}</p>
                    <p>{game.publisher}</p>
                </div>
            ))}
        </>
    );
}