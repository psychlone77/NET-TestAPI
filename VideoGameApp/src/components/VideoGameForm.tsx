import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  TextField,
  Button,
  Box,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VideoGameRequest } from "../types/types";
import { VideoGameFormProps } from "../types/interfaces";
import { addVideoGame, deleteVideoGame, updateVideoGame } from "../actions/videoGameActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function VideoGameForm({
  title,
  open,
  handleClose,
  notifySuccess,
  notifyError,
  initialValues
}: VideoGameFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoGameRequest>();
  const mutation = useMutation({
    mutationFn: initialValues
      ? (game: VideoGameRequest) => updateVideoGame(game, initialValues.id)
      : addVideoGame,
  });
  const mutationSecondary = useMutation(() => initialValues ? deleteVideoGame(initialValues?.id) : Promise.resolve())

  const onSubmit: SubmitHandler<VideoGameRequest> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries("videogames");
        notifySuccess(
          initialValues
            ? "Game updated successfully"
            : "Game added successfully"
        );
        handleClose();
      },
      onError: () => {
        notifyError(
          initialValues ? "Error updating game" : "Error adding game"
        );
      },
    });
  };

  const handleSecondaryAction = () => {
    if (mutationSecondary) {
      mutationSecondary.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries("videogames");
          notifySuccess("Game deleted successfully");
          handleClose();
        },
        onError: () => {
          notifyError("Error deleting game");
        },
      });
    }
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Box flexGrow={1}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon color="error" />
            </IconButton>
          </Box>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            defaultValue={initialValues?.title}
            error={!!errors.title}
            helperText={errors.title ? "Please fill out this field." : ""}
            {...register("title", { required: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Platform"
            variant="outlined"
            defaultValue={initialValues?.platform}
            error={!!errors.platform}
            helperText={errors.platform ? "Please fill out this field." : ""}
            {...register("platform", { required: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Developer"
            variant="outlined"
            defaultValue={initialValues?.developer}
            error={!!errors.developer}
            helperText={errors.developer ? "Please fill out this field." : ""}
            {...register("developer", { required: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Publisher"
            variant="outlined"
            defaultValue={initialValues?.publisher}
            error={!!errors.publisher}
            helperText={errors.publisher ? "Please fill out this field." : ""}
            {...register("publisher", { required: true })}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          {initialValues && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleSecondaryAction}
            >
              Delete Game
            </Button>
          )}
          <Button
            sx={{ marginLeft: "auto" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {initialValues ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
