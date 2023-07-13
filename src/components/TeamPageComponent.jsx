import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "react-query";
import axios from "axios";
import {
  useDefineTeam,
  useGenerateString,
  useGetAllTeams,
  useStorage,
} from "../hooks";
import TeamBoard from "./TeamBoard";
import useInvalidateQuery from "../hooks/useInvalidateQuery";
import { useNavigate } from "react-router-dom";

export default function TeamPageComponent() {
  const { generatedStringNewTeam, myClicks, setMyClicks } = useStorage();

  const { pickedName } = useStorage();
  const { allTeams, isLoadingTeams } = useGetAllTeams();
  const { allClicks } = useDefineTeam(allTeams, pickedName, isLoadingTeams);
  const { string } = useGenerateString();
  const { invalidateQueries } = useInvalidateQuery();
  const navigate = useNavigate();

  const { mutate: click } = useMutation((payload) =>
    axios.post("https://klikuj.herokuapp.com/api/v1/klik", payload)
  );

  const handleClick = (event) => {
    event.preventDefault();
    click(
      {
        team: pickedName,
        session: generatedStringNewTeam ? generatedStringNewTeam : string,
      },
      {
        onSuccess: (data) => {
          setMyClicks(data.data.your_clicks);
          invalidateQueries("get_all_teams");
        },
        onError: (err) => {
          console.log("danger", "Error in creating event", err);
        },
      }
    );
  };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
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
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ height: "100%", mt: 3 }}
                  onClick={handleClick}
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
                  value={myClicks || 0}
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
                <TeamBoard />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
