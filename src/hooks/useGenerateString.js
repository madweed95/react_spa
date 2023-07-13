import { useEffect, useState } from "react";

const useGenerateString = () => {
  const [string, setString] = useState("");
  let ranString = (Math.random() + 1).toString(36).substring(7);
  useEffect(() => {
    setString(ranString);
  }, []);

  return { string };
};

export default useGenerateString;
