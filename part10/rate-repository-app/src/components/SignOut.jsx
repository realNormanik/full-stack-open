import { Pressable } from "react-native";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import styles from "../utils/styles";
import AuthStorage from "../utils/authStorage";

const SignOutTab = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = new AuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <Pressable style={styles.tab} onPress={handleSignOut}>
      <Text style={styles.headerText}>Sign out</Text>
    </Pressable>
  );
};

export default SignOutTab;