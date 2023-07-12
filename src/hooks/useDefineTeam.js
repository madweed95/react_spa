import { useEffect, useState } from "react";

const useDefineTeam = (allTeams, pickedName, areNotLoaded) => {
  const [allClicks, setAllClicks] = useState(0);
  const [detectedTeam, setDetectedTeam] = useState({});
  useEffect(() => {
    if (!areNotLoaded)
      allTeams.forEach((team) => {
        if (team.team === pickedName) {
          setAllClicks(team.clicks);
          setDetectedTeam(team);
        }
      });
  }, [areNotLoaded, allTeams, pickedName]);

  return { allClicks, detectedTeam };
};

export default useDefineTeam;
