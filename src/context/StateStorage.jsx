import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StateStorage = createContext();

export const StateStorageProvider = ({ children }) => {
  const [allTeams, setAllTeams] = useState({});
  const [isLoadingAllTeams, setIsLoadingAllTeams] = useState(true);
  const [pickedName, setpickedName] = useState("");

  const storage = {
    allTeams,
    setAllTeams,
    isLoadingAllTeams,
    setIsLoadingAllTeams,
    pickedName,
    setpickedName,
  };

  return (
    <StateStorage.Provider value={storage}>{children}</StateStorage.Provider>
  );
};
StateStorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
