import { useEffect, useState } from "react";

const useDefineTeam = (allTeams, pickedName, isLoadingTeams) => {
  const [allClicks, setAllClicks] = useState(0);
  const [detectedTeam, setDetectedTeam] = useState({});
  useEffect(() => {
    if (!isLoadingTeams)
      allTeams.forEach((team) => {
        if (team.team === pickedName) {
          setAllClicks(team.clicks);
          setDetectedTeam(team);
        }
      });
  }, [isLoadingTeams, allTeams, pickedName]);

  return { allClicks, detectedTeam };
};

export default useDefineTeam;
