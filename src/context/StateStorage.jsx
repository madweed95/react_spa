import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StateStorage = createContext();

export const StateStorageProvider = ({ children }) => {
  const [pickedName, setpickedName] = useState();
  const [myClicks, setMyClicks] = useState(0);
  const [generatedStringNewTeam, setGeneratedStringNewTeam] = useState();

  const storage = {
    generatedStringNewTeam,
    setGeneratedStringNewTeam,
    pickedName,
    setpickedName,
    myClicks,
    setMyClicks,
  };

  return (
    <StateStorage.Provider value={storage}>{children}</StateStorage.Provider>
  );
};
StateStorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
