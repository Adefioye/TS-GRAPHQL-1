import { useReducer, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

export const FETCH = "FETCH";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

export const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case FETCH:
        return { ...state, loading: true };
      case FETCH_SUCCESS:
        return { ...state, data: action.payload, loading: false, error: false };
      case FETCH_ERROR:
        return { ...state, loading: false, error: true };
      default:
        throw new Error();
    }
  };

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  // const [state, setState] = useState<State<TData>>({
  //   data: null,
  //   loading: false,
  //   error: false,
  // });
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: true,
    error: false,
  });

  const fetch = useCallback(() => {
    dispatch({ type: FETCH });

    try {
      const fetchApi = async () => {
        const { data, errors } = await server.fetch({ query });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }

        dispatch({ type: FETCH_SUCCESS, payload: data });
      };

      fetchApi();
    } catch (error) {
      dispatch({ type: FETCH_ERROR });
      throw console.error(error);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
