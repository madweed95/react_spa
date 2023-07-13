import { useQueryClient } from "react-query";

function useInvalidateQuery(queryKey) {
  const queryClient = useQueryClient();

  function invalidateQueries() {
    queryClient.invalidateQueries(queryKey);
  }

  return { invalidateQueries };
}
export default useInvalidateQuery;
