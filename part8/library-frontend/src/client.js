import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `http://${import.meta.env.VITE_API_URL}/graphql`
});

const wsLink = new GraphQLWsLink(createClient({
  url: `ws://${import.meta.env.VITE_API_URL}/graphql`
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;