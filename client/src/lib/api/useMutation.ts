import { useReducer } from "react";
import { server } from "./server";
import {  reducer, FETCH, FETCH_ERROR, FETCH_SUCCESS } from "./useQuery";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}
type MutationType<TData, TVariables> = [
  (variables?: TVariables | null) => Promise<void>,
  State<TData>
];

export const useMutation = <TData, TVariables>(
  query: string
): MutationType<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });
  const fetch = async (variables: TVariables) => {
    try {
      dispatch({ type: FETCH });

      const { data, errors } = await server.fetch({ query, variables });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ERROR });
      throw console.error(error);
    }
  };

  return [fetch, state];
};
