import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/TeamPage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";
import { useQuery } from "react-query";
import "./App.css";
import { useStorage } from "./hooks";

function App() {
  const { setAllTeams, setIsLoadingAllTeams } = useStorage();
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:name" element={<AboutPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
