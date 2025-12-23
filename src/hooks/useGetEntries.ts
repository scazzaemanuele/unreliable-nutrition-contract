import { useQueries } from "@tanstack/react-query";

const fetchEntries = (source: string) =>
  fetch(`http://localhost:3001/entries?source=${source}`).then((res) =>
    res.json()
  );

export const useGetEntries = () => {
  return useQueries({
    queries: ["a", "b", "c", "d"].map((source) => ({
      queryKey: ["entries", source],
      queryFn: () => fetchEntries(source),
    })),
  });
};
