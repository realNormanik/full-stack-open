import { useQuery } from "@apollo/client";
import { Link } from "react-router-native";
import { View, ScrollView } from "react-native";

import Text from "./Text";
import SignOut from "./SignOut";
import styles from "../utils/styles";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data?.me;

  return (
    <View style={styles.header}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={true}
      >
        <Link to="/" style={styles.tab}>
          <Text style={styles.headerText}>Repositories</Text>
        </Link>

        {authorizedUser ? (
          <>
            <Link to="/create-review" style={styles.tab}>
              <Text style={styles.headerText}>Create a review</Text>
            </Link>

            <Link to="/my-reviews">
              <Text style={styles.headerText}>My reviews</Text>
            </Link>

            <SignOut />
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.tab}>
              <Text style={styles.headerText}>Sign in</Text>
            </Link>

            <Link to="/signup" style={styles.tab}>
              <Text style={styles.headerText}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;