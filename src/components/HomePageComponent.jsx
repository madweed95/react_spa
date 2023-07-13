import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LeaderBoard from "./LeaderBoard";
import useInvalidateQuery from "../hooks/useInvalidateQuery";
import {
  useGenerateString,
  useGetAllTeams,
  usePostTeam,
  useStorage,
} from "../hooks";
import { useNavigate } from "react-router-dom";

export default function HomePageComponent() {
  const [valid, setValid] = useState();
  const navigate = useNavigate();
  const { invalidateQueries } = useInvalidateQuery();
  const { setGeneratedStringNewTeam, setpickedName, setMyClicks, pickedName } =
    useStorage();
  const { ranString } = useGenerateString();
  const { allTeams } = useGetAllTeams();
  const { submit } = usePostTeam();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setGeneratedStringNewTeam(ranString);

    submit(
      {
        team: data.get("name"),
        session: ranString,
      },
      {
        onSuccess: (data) => {
          setMyClicks(data.data.your_clicks);
          invalidateQueries("get_all_teams");
          navigate(`/${pickedName}`);
        },
        onError: (err) => {
          console.log("Something went wrong | create new team", err);
        },
      }
    );
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    if (pickedName) {
      const found = allTeams.some(
        (el) => el.team.toLowerCase() === pickedName.toLowerCase()
      );
      if (!found) setValid(false);
      else {
        setValid(true);
      }
    }
  }, [pickedName, allTeams]);

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
                  placeholder="Type name to start"
                  onChange={(e) => {
                    e.preventDefault();
                    setpickedName(e.currentTarget.value);
                  }}
                  error={valid}
                  helperText={valid ? "Team already exist" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ height: "100%" }}
                  disabled={!pickedName || valid}
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
