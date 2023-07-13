import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useGetAllTeams = () => {
  const [allTeams, setAllTeams] = useState([{}]);
  const { isLoading: isLoadingTeams } = useQuery(
    ["get_all_teams"],
    () => axios.get("https://klikuj.herokuapp.com/api/v1/leaderboard"),
    {
      select: (res) => res.data,
      onSuccess: (data) => {
        setAllTeams(data);
      },
      onError: (error) => console.log("Something went worng, " + error),
    }
  );

  return { isLoadingTeams, allTeams };
};

export default useGetAllTeams;
