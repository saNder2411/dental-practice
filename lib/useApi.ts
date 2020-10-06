import { useEffect, useState } from 'react';

interface ApiState {
  response: null | Array<Object> | Object;
  error: null | Object;
  isLoading: boolean;
}

const initialState = (args?: ApiState): ApiState => {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args,
  };
};

export const useApi = (url: string, options = {}): ApiState => {
  const [state, setState] = useState(() => initialState());

  useEffect(() => {
    let canceled = false;
    const fetchData = async (isCanceled: boolean) => {
      try {
        const res = await fetch(url, {
          ...options,
        });

        if (isCanceled) return;

        setState(
          initialState({
            response: await res.json(),
            isLoading: false,
            error: null,
          })
        );
      } catch (error) {
        setState(
          initialState({
            response: null,
            isLoading: false,
            error,
          })
        );
      }
    };

    fetchData(canceled);

    return () => {
      canceled = true;
    };
  }, []);
  return state;
};
