import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllTeams, useStorage } from "../hooks";
import { SkeletonRow } from "./Skeleton";
import { StyledTableCell, StyledTableRow } from "./LeaderBoard";

export default function TeamBoard() {
  const { pickedName } = useStorage();
  const { teams, isLoadingTeams } = useGetAllTeams();

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Total clicks</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoadingTeams ? (
            <SkeletonRow />
          ) : (
            teams.map((team, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={
                    team.team === pickedName && {
                      fontSize: 18,
                      fontWeight: "bold",
                    }
                  }
                >
                  {`${team.order}. ${team.team}`}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={
                    team.team === pickedName && {
                      fontSize: 18,
                      fontWeight: "bold",
                    }
                  }
                >
                  {team.clicks}
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
