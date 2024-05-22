import { useState, useEffect } from "react";

export default function useFetch(initialData, fetchFn) {
  const [data, setData] = useState(initialData);
  const [fetchError, setFetchError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetchFn();
        // console.log(res);
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setFetchError({
          message: error.message || "Failed to fetch data",
        });
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    data,
    fetchError,
    setFetchError,
    isLoading,
  };
}
