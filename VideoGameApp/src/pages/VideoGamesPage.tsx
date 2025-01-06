import { useState } from "react";
import {
  VideoGameResponse,
} from "../types/types";
import VideoGameForm from "../components/VideoGameForm";
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import InfiniteScrollView from "../components/InfiniteScrollView";
import { AllInclusive, GridView } from "@mui/icons-material";
import TableView from "../components/TableView";

export default function VideoGamesPage() {
  const theme = useTheme();
  const [displayType, setDisplayType] = useState<"infinite" | "paginated">(
    "infinite"
  );
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
        theme={theme.palette.mode}
      />
      <Typography variant="h2" align="center">
        Video Games
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop={2}
        width={"100%"}
        paddingX={5}
      >
        <Button
          sx={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
          }}
          variant="contained"
          onClick={() => setShowForm(true)}
        >
          Add a Video Game
        </Button>
        <ToggleButtonGroup
          value={displayType}
          exclusive
          onChange={(_e, value) => setDisplayType(value)}
        >
          <ToggleButton value="infinite">
            <AllInclusive />
          </ToggleButton>
          <ToggleButton value="paginated">
            <GridView />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {displayType === "paginated" ? (
        <TableView handleEditClick={handleEditClick}/>
      ) : (
        <InfiniteScrollView handleEditClick={handleEditClick} />
      )}
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
    </>
  );
}
