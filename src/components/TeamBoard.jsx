import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllTeams, useStorage } from "../hooks";
import { SkeletonRow } from "./Skeleton";

export default function TeamBoard() {
  const { pickedName } = useStorage();
  const { allTeams, isLoadingTeams } = useGetAllTeams();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#DFF1FC",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#F3F4F6",
    },
  }));

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
          {isLoadingTeams ||
          (allTeams &&
            allTeams.length === 1 &&
            allTeams[0].team === undefined) ? (
            <SkeletonRow />
          ) : (
            allTeams.map((team, i) => (
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
