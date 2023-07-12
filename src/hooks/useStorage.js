import { useContext } from "react";
import { StateStorage } from "../context/StateStorage";

const useStorage = () => {
  const stateStorage = useContext(StateStorage);

  return {
    ...stateStorage,
  };
};

export default useStorage;
