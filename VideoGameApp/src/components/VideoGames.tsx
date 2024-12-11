import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FormModal from "./FormModal";
import AddGameForm from "./AddGameForm";
import UpdateGameForm from "./UpdateGameForm";

export interface VideoGame {
  id: number;
  title: string;
  platform: string;
  developer: string;
  publisher: string;
}

type error = {
  message: string;
};

export default function VideoGamesComponent() {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [game, setGame] = useState<VideoGame>({
    id: 0,
    title: "",
    platform: "",
    developer: "",
    publisher: "",
  });
  async function fetchData(): Promise<VideoGame[]> {
    const response = await axios.get("https://localhost:7008/api/VideoGame");
    console.log(response);
    return response.data;
  }

  const toggleForm = (state: boolean) => {
    setShowForm(state);
  };

  const toggleUpdateForm = (state: boolean) => {
    setShowUpdateForm(state);
  };

  const handleEditClick = (game: VideoGame) => {
    setGame(game);
    setShowUpdateForm(true);
  };

  const { data, isLoading, isError, error } = useQuery<VideoGame[]>(
    "videogames",
    fetchData,
    {
        staleTime: 3000,
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <svg
          fill="#000000"
          width="64px"
          height="64px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M2.39,8.13a5.47,5.47,0,0,1,.18-1.39l.16-.66L1.42,5.74l-.17.66a7,7,0,0,0,.08,3.73l.19.65,1.3-.39-.19-.65A5.46,5.46,0,0,1,2.39,8.13Zm2.18,4.39L4,12.12l-.83,1.07.55.42a6.76,6.76,0,0,0,3.48,1.32l.67.07L8,13.64l-.67-.06A5.56,5.56,0,0,1,4.57,12.52ZM14.4,5.37A7.05,7.05,0,0,0,5.16,1.63h0A6.92,6.92,0,0,0,2.77,3.28L4,4.48A5.32,5.32,0,1,1,10,13l.68,1.6A7.06,7.06,0,0,0,14.4,5.37Z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    );

  if (isError) return <div>{(error as error).message}</div>;

  return (
    <>
      <div className="p-8 grid grid-cols-4 gap-4 w-full font-sans">
        {data?.map((game) => (
          <div
            onClick={() => handleEditClick(game)}
            className="bg-gray-50 p-5 max-w-96 rounded-xl shadow-md font-light hover:cursor-pointer hover:text-white hover:bg-gradient-to-br from-pink-500 to-red-500 transition-all duration-150 hover:scale-110"
            key={game.id}
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-normal mr-3 text-nowrap truncate">
                {game.title}
              </h3>
            </div>
            <div className="flex flex-col items-start">
              <p>{game.platform}</p>
              <p>{game.developer}</p>
              <p>{game.publisher}</p>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => toggleForm(true)}
          className="bg-gray-50 p-5 rounded-xl shadow-md max-w-96 h-40 text-5xl flex items-center justify-center hover:shadow-lg hover:bg-gray-400 hover:text-white hover:scale-105 transition-all duration-300"
        >
          +
        </button>
      </div>
      {showForm ? (
        <FormModal onClose={toggleForm}>
          <AddGameForm onClose={toggleForm} />
        </FormModal>
      ) : null}
      {showUpdateForm ? (
        <FormModal onClose={toggleUpdateForm}>
          <UpdateGameForm onClose={toggleUpdateForm} game={game} />
        </FormModal>
      ) : null}
    </>
  );
}
