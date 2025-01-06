import { useInfiniteQuery } from "react-query";
import { fetchAllVideoGamesPaginated } from "../actions/videoGameActions";
import { PaginatedResponse, VideoGameResponse } from "../types/types";
import {
  Box,
  Button,
  Grid2 as Grid,
  Skeleton,
} from "@mui/material";
import VideoGameCard from "./VideoGameCard";
import CustomCard from "./CustomCard";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";

{
  /* <div>
<button
  onClick={() => fetchNextPage()}
  disabled={!hasNextPage || isFetching}
>
  {isFetching
    ? "Loading more..."
    : hasNextPage
    ? "Load More"
    : "No More Data"}
</button>
<div>
  {data?.pages.map((page, pageIndex) => (
    <div key={pageIndex}>
      {page.videoGames.map((game) => (
        <div key={game.id}>{game.title}</div>
      ))}
    </div>
  ))}
</div>
</div> */
}

const getNextPage = (response: PaginatedResponse): number | undefined => {
  if (response.totalCount / response.pageSize > response.page) {
    return response.page + 1;
  } else {
    return undefined;
  }
};

export default function InfiniteScrollView({
  handleEditClick,
}: {
  handleEditClick: (game: VideoGameResponse) => void;
}) {
  const pageSize = 8;
  const [videoGames, setVideoGames] = useState<VideoGameResponse[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(
      "videogamesinf",
      ({ pageParam = 1 }) => fetchAllVideoGamesPaginated(pageParam, pageSize),
      {
        getNextPageParam: getNextPage,
      }
    );
  useEffect(() => {
    if (data) {
      const newGames = data.pages.map((page) => page.videoGames).flat();
      setVideoGames(newGames);
    }
  }, [data]);
  return (
    <>
      <Grid container spacing={4} columns={{ md: 3, lg: 4 }} padding={4}>
        {isLoading ? (
          <Fragment>
            {[...Array(pageSize)].map((_, index) => (
              <Grid size={{ xs: 1, md: 1 }} key={index}>
                <CustomCard onClick={() => {}}>
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: 30 }} />
                  <Skeleton animation="wave" variant="text" />
                  <Skeleton animation="wave" variant="text" />
                </CustomCard>
              </Grid>
            ))}
          </Fragment>
        ) : null}
        {videoGames?.map((game) => (
          <Grid size={{ xs: 1, md: 1 }} key={game.id}>
            <VideoGameCard onClick={() => handleEditClick(game)} game={game} />
          </Grid>
        ))}
        {/* {data && data.pages[data.pages.length - 1].videoGames.length % 2 === 0 ? (
        <Grid item xs={12} md={4}>
          <CustomCard
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: theme.palette.primary.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
          >
            <Typography variant="h1">+</Typography>
          </CustomCard>
        </Grid>
      ) : null} */}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetching
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No More Data"}
        </Button>
      </Box>
    </>
  );
}
