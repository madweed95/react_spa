import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllTeams } from "../hooks";

export default function TeamBoard() {
  const { allTeams, isLoadingTeams } = useGetAllTeams();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#DFF1FC",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#F3F4F6",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Total clicks</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoadingTeams &&
            allTeams.map((team, i) => (
              <StyledTableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {`${team.order}. ${team.team}`}
                </StyledTableCell>
                <StyledTableCell align="right">{team.clicks}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
