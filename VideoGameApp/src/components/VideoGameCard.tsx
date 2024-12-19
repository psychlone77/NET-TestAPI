import { Typography } from "@mui/material";
import { VideoGameResponse } from "../types/types";
import CustomCard from "./CustomCard";

export default function VideoGameCard({
  onClick,
  game,
}: {
  onClick: () => void;
  game: VideoGameResponse;
}) {
  return (
    <CustomCard
      onClick={onClick}
      style={{
        "&:hover": {
          transform: "scale(1.05)",
          background: "linear-gradient(to bottom right, #ff4081, #f50057)",
          color: "white",
        },
      }}
    >
      <Typography variant="h5" component="div" noWrap>
        {game.title}
      </Typography>
      <Typography variant="body2">{game.platform}</Typography>
      <Typography variant="body2">{game.developer}</Typography>
      <Typography variant="body2">{game.publisher}</Typography>
    </CustomCard>
  );
}
