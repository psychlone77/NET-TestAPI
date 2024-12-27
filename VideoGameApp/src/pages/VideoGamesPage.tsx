import { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  PaginatedResponse,
  QueryError,
  VideoGameResponse,
} from "../types/types";
import VideoGameForm from "../components/VideoGameForm";
import {
  fetchAllVideoGamesPaginated,
} from "../actions/videoGameActions";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
  Grid2 as Grid,
  Pagination,
} from "@mui/material";
import CustomCard from "../components/CustomCard";
import VideoGameCard from "../components/VideoGameCard";
import { toast, ToastContainer } from "react-toastify";

export default function VideoGamesPage() {
  const pageRef = useRef(1);
  const [page, setPage] = useState(pageRef.current);
  const pageSize = 10;
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState<VideoGameResponse>({
    id: 0,
    title: "",
    platform: "",
    developer: "",
    publisher: "",
  });

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleEditClick = (game: VideoGameResponse) => {
    setSelectedGame(game);
    setShowUpdateForm(true);
  };

  const { data, isLoading, isError, error } = useQuery<PaginatedResponse>(
    ["videogames", page],
    () => fetchAllVideoGamesPaginated(page, pageSize),
    {
      staleTime: 3000,
    }
  );

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );

  if (isError)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Alert severity="error" sx={{ width: "200px", fontSize: "16px" }}>
          <Typography>{(error as QueryError).message}</Typography>
        </Alert>
      </Box>
    );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Grid container spacing={4} columns={{ md: 3, lg: 4 }} padding={4}>
        {data?.videoGames.map((game) => (
          <Grid size={{ xs: 1, md: 1 }} key={game.id}>
            <VideoGameCard onClick={() => handleEditClick(game)} game={game} />
          </Grid>
        ))}
        <Grid size={{ xs: 1, md: 1 }}>
          <CustomCard
            onClick={() => setShowForm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#000000",
                color: "white",
              },
            }}
          >
            <Typography variant="h1">+</Typography>
          </CustomCard>
        </Grid>
      </Grid>
      {showForm ? (
        <VideoGameForm
        title={"Add a Video Game"}
        open={showForm}
        handleClose={() => setShowForm(false)}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
        />
      ) : null}
      {showUpdateForm ? (
        <VideoGameForm
        title={"Update a Video Game"}
        open={showUpdateForm}
        handleClose={() => setShowUpdateForm(false)}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
        initialValues={selectedGame}
        />
      ) : null}
      <Pagination
        defaultPage={page}
        count={Math.ceil((data?.totalCount ?? 0) / pageSize)}
        onChange={(_e, value) => {setPage(value); pageRef.current = value}}
      />
    </>
  );
}
