import axios from "axios";
import { useMutation } from "react-query";
import { api_url } from "../components/constants/api_url";

const usePostTeam = () => {
  const { mutate: submit } = useMutation((payload) =>
    axios.post(`${api_url}klik`, payload)
  );

  return { submit };
};

export default usePostTeam;
