import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axios";
import { ApiTypes, Data } from "../types/api.types";
import { toast } from "react-toastify";

const useApi = ({
  url,
  method = "get",
  body = null,
  params = null,
  autoFetch = true,
}: ApiTypes) => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method,
        url,
        data: body,
        params,
      });
      setData(response.data);
      toast.success(response.data.message);
    } catch (err: any) {
      setError(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, method, body, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
