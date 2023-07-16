import axios from "axios";
import { useQuery } from "react-query";
import { api_url } from "../constants/api_url";

const useGetAllTeams = () => {
  const { isLoading: isLoadingTeams, data: teams } = useQuery(
    ["get_all_teams"],
    () => axios.get(`${api_url}leaderboard`),
    {
      select: (res) => res.data,

      onError: (error) =>
        console.log("Something went worng | get all teams ", error),
    }
  );

  return { isLoadingTeams, teams };
};

export default useGetAllTeams;
