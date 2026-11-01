import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { OperationTypeNode } from "graphql";

const apiUrl = import.meta.env.VITE_API_URL;

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))?.token ?? null;
  } catch {
    return null;
  };
};

const authLink = new SetContextLink(({ headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
});

const wsUrl = apiUrl.replace(/^http/, "ws");

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wsUrl}/graphql`,
  })
);

const splitLink = ApolloLink.split(
  ({ operationType }) => operationType === OperationTypeNode.SUBSCRIPTION,
  wsLink,
  ApolloLink.from([authLink, httpLink])
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;