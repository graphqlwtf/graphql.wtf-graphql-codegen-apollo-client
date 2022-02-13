import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

export const useClient = () => {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPQL_ENDPOINT,
        cache: new InMemoryCache(),
      }),
    []
  );

  return client;
};
