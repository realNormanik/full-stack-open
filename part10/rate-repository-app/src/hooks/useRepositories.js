import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword = "" }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error("Error fetching repositories:", error.message);
    return { repositories: [], loading: false, error };
  };

  const repositories = data?.repositories?.edges?.map(edge => edge.node) ?? [];

  return { repositories, loading, error: null };
};

export default useRepositories;