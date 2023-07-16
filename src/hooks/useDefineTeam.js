import { useEffect, useState } from "react";

const useDefineTeam = (teams, pickedName, isLoadingTeams) => {
  const [allClicks, setAllClicks] = useState(0);
  const [detectedTeam, setDetectedTeam] = useState({});
  useEffect(() => {
    if (!isLoadingTeams)
      teams.forEach((team) => {
        if (team.team === pickedName) {
          setAllClicks(team.clicks);
          setDetectedTeam(team);
        }
      });
  }, [isLoadingTeams, teams, pickedName]);

  return { allClicks, detectedTeam };
};

export default useDefineTeam;
