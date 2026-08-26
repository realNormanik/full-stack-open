import { format } from "date-fns";
import { useQuery, useMutation } from "@apollo/client";
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

import styles from "../utils/styles";
import theme from "../utils/theme";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network"
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({ variables: { id: reviewId } });
      await refetch();
    } catch (e) {
      console.error("Delete mutation failed:", e);
    };
  };
  

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={theme.colors.blue}
      />
    );
  };

  if (error) {
    return <Text style={styles.errorFetch}>Error: {error.message}</Text>;
  };

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node);

  if (!reviews || reviews.length === 0) {
    return <Text style={styles.noReviews}>No reviews found.</Text>;
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.separator}>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.username}>{item.repository.fullName}</Text>
                <Text style={styles.date}>{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleViewRepository(item.repository.id)}>
                  <Text style={styles.buttonText}>View repository</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={() => handleDeleteReview(item.id)}>
                  <Text style={styles.buttonText}>Delete review</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default MyReviews;