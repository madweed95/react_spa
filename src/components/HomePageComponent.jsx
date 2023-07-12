import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LeaderBoard from "./LeaderBoard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useStorage } from "../hooks";

//let r = (Math.random() + 1).toString(36).substring(7);
//console.log("random", r);

export default function HomePageComponent() {
  const queryClient = useQueryClient();
  const { setAllTeams, setIsLoadingAllTeams } = useStorage();

  const { mutate: createNewTeam } = useMutation((payload) =>
    axios.post("https://klikuj.herokuapp.com/api/v1/klik", payload)
  );

  useQuery(
    ["get_all_teams"],
    () => axios.get("https://klikuj.herokuapp.com/api/v1/leaderboard"),
    {
      select: (res) => res.data,
      onSuccess: (data) => {
        setIsLoadingAllTeams(false);
        setAllTeams(data);
      },
      onError: (error) => console.log("Something went worng, " + error),
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
    });
    createNewTeam({
      team: "azim",
      session: "azim1",
    });
    queryClient.invalidateQueries({ queryKey: ["get_all_teams"] });
  };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            border: "2px solid #1565c0",
            borderRadius: "3%",
            padding: "10px",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            STFU and CLICK
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ height: "100%" }}
                >
                  Click
                </Button>
              </Grid>

              <Grid item xs={12} textAlign={"center"}>
                <Typography component="h1" variant="h6">
                  Top teams
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LeaderBoard />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
