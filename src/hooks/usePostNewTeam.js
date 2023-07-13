import axios from "axios";
import { useMutation } from "react-query";

const usePostNewTeam = () => {
  const { mutate: submit } = useMutation((payload) =>
    axios.post("https://klikuj.herokuapp.com/api/v1/klik", payload)
  );

  return { submit };
};

export default usePostNewTeam;
