import {
  Button,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchAllVideoGamesPaginated } from "../actions/videoGameActions";
import { PaginatedResponse } from "../types/types";
import { useState } from "react";
import { Edit } from "@mui/icons-material";

export default function TableView({
  handleEditClick,
}: {
  handleEditClick: (game: any) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading } = useQuery<PaginatedResponse>(
    ["videogames", page],
    () => fetchAllVideoGamesPaginated(page, pageSize),
    {
      staleTime: 3000,
    }
  );
  return (
    <TableContainer sx={{ marginTop: 5 }} component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{fontSize: 40}}>
            <TableCell>Game Title</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {isLoading ? (
                [...Array(pageSize)].map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="rectangular" width={64} height={36}/>
                        </TableCell>
                    </TableRow>
                ))
            ) : null}
          {data?.videoGames.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.platform}</TableCell>
              <TableCell>{game.developer}</TableCell>
              <TableCell>{game.publisher}</TableCell>
              <TableCell>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleEditClick(game)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        sx={{ display: "flex", justifyContent: "end", marginX: 5, marginY: 2 }}
        defaultPage={page}
        count={Math.ceil((data?.totalCount ?? 0) / pageSize)}
        onChange={(_e, value) => {
          setPage(value);
        }}
      />
    </TableContainer>
  );
}
