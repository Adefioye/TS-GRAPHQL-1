import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    setState({ data: null, loading: true, error: false });

    try {
      const fetchApi = async () => {
        const { data } = await server.fetch({ query });

        setState({ data, loading: false, error: false });
      };

      fetchApi();
    } catch (error) {
      setState({ data: null, loading: false, error: true });
      console.error(error);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
