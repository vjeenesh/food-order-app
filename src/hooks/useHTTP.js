import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Something went wrong.");
  }

  return resData;
}

export default function useHTTP(url, config, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const res = await sendHttpRequest(url, { ...config, body: data });
        setData(res);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  function clearData() {
    setData(initialData);
  }

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
