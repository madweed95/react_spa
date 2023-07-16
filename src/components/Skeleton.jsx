import React from "react";
import { StyledTableCell, StyledTableRow } from "./LeaderBoard";
import { Skeleton } from "@mui/material";

export function SkeletonRow() {
  return (
    <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <StyledTableCell component="th" scope="row">
        <Skeleton animation="wave" />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Skeleton animation="wave" />
      </StyledTableCell>
    </StyledTableRow>
  );
}
export function NoTeams() {
  return (
    <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <StyledTableCell component="th" scope="row">
        No teams yet
      </StyledTableCell>
      <StyledTableCell align="right">Please, create one</StyledTableCell>
    </StyledTableRow>
  );
}
