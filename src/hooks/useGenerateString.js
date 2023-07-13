import { useEffect, useState } from "react";

const useGenerateString = () => {
  const [ranString, setRanString] = useState("");

  useEffect(() => {
    setRanString((Math.random() + 1).toString(36).substring(7));
  }, []);

  return { ranString };
};

export default useGenerateString;
