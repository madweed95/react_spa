import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { api_url } from "../components/constants/api_url";

const useGetAllTeams = () => {
  const [allTeams, setAllTeams] = useState([{}]);
  const { isLoading: isLoadingTeams } = useQuery(
    ["get_all_teams"],
    () => axios.get(`${api_url}leaderboard`),
    {
      select: (res) => res.data,
      onSuccess: (data) => {
        setAllTeams(data);
      },
      onError: (error) =>
        console.log("Something went worng | get all teams ", error),
    }
  );

  return { isLoadingTeams, allTeams };
};

export default useGetAllTeams;
