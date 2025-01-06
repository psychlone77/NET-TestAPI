import { Typography, useTheme } from "@mui/material";
import { VideoGameResponse } from "../types/types";
import CustomCard from "./CustomCard";

export default function VideoGameCard({
  onClick,
  game,
}: {
  onClick: () => void;
  game: VideoGameResponse;
}) {
  const theme = useTheme();
  return (
    <CustomCard
      onClick={onClick}
      style={{
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.5)",
          background: "linear-gradient(to bottom right,rgb(248, 128, 168),rgb(224, 3, 80))",
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
