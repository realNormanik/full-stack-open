import { useMutation } from "@apollo/client";

import AuthStorage from "../utils/authStorage";
import useApolloClient from "./useApolloClient";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password }
      }
    });

    const accessToken = response.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    };

    return response;
  };

  return [signIn, result];
};

export default useSignIn;