import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import theme from "../utils/theme";
import styles from "../utils/styles";
import ReviewItem from "./ReviewItem";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";

const REVIEWS_PAGE_SIZE = 10;

const SingleRepository = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: REVIEWS_PAGE_SIZE },
    fetchPolicy: "cache-and-network",
  });

  if (loading && !data) {
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

  const repository = data.repository;
  const reviewEdges = repository.reviews.edges;
  const reviews = reviewEdges.map((edge) => edge.node);
  const pageInfo = repository.reviews.pageInfo;

  const handleNext = () => {
    const isLastLoaded = currentIndex + 1 === reviews.length;

    if (isLastLoaded && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          id,
          after: pageInfo.endCursor,
          first: REVIEWS_PAGE_SIZE,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            repository: {
              ...fetchMoreResult.repository,
              reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                  ...prevResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
              },
            },
          };
        },
      }).then(() => {
        setCurrentIndex((prev) => prev + 1);
      });
    } else if (!isLastLoaded) {
      setCurrentIndex((prev) => prev + 1);
    };
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    };
  };

  const currentReview = reviews[currentIndex];

  return (
    <View>
      <RepositoryItem item={repository} showGithubButton />
      <View style={{ marginVertical: 10 }}>
        {currentReview ? (
          <ReviewItem review={currentReview} />
        ) : (
          <Text>Reviews not found.</Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 15, marginRight: 15, marginTop: 0 },
            currentIndex === 0 && { opacity: 0.5 },
          ]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.buttonText}>Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 15, marginRight: 15, marginTop: 10 },
            !pageInfo.hasNextPage && currentIndex >= reviews.length - 1 && { opacity: 0.5 },
          ]}
          onPress={handleNext}
          disabled={
            !pageInfo.hasNextPage && currentIndex >= reviews.length - 1
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleRepository;