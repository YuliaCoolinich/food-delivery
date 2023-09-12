import { useState, useCallback } from "react";

const DEFAULT_ERROR_MESSAGE = "Something went wrong!";
const FETCH_ERROR_MESSAGE = "Request failed!";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestParams, applyDataCallback) => {
    try {
      setIsLoading(true);
      setError(null);

      const { url, method, headers, body } = requestParams;
      const response = await fetch(url, {
        method: method ? method : "GET",
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(response.statusText || FETCH_ERROR_MESSAGE);
      }
      const data = await response.json();

      applyDataCallback(data);
      
    } catch (error) {
      setError(error.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
