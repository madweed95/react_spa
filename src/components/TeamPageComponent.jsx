import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LeaderBoard from "./LeaderBoard";
import { useMutation } from "react-query";
import axios from "axios";
import { useDefineTeam, useStorage } from "../hooks";

//let r = (Math.random() + 1).toString(36).substring(7);
//console.log("random", r);

export default function TeamPageComponent() {
  const [myClicks, setMyClicks] = useState(0);

  const { allTeams, pickedName, isLoadingAllTeams } = useStorage();

  const { allClicks } = useDefineTeam(allTeams, pickedName, isLoadingAllTeams);

  const { mutate: click } = useMutation((payload) =>
    axios.post("https://klikuj.herokuapp.com/api/v1/klik", payload)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
    });
    click({
      team: "azim",
      session: "azim1",
    });
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
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ height: "100%", mt: 3 }}
                >
                  Click
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ mt: 8, mb: 8 }}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Your clicks"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={0}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 8, mb: 8 }}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Team clicks"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={allClicks}
                />
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
