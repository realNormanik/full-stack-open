import { Component, useState } from "react";
import { useNavigate } from "react-router-native";
import { FlatList, ActivityIndicator, Pressable } from "react-native";

import theme from "../utils/theme";
import styles from "../utils/styles";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "../utils/utils";
import useRepositories from "../hooks/useRepositories";
import RepositoryListHeader from "./RepositoryListHeader";

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } = this.props;

    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;

    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  };
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = require("use-debounce").useDebounce(searchKeyword, 500);

  const getOrderVariables = () => {
    switch (selectedOrder) {
      case "highest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    };
  };

  const { orderBy, orderDirection } = getOrderVariables();

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

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
    return (
      <Text style={styles.errorFetch}>Error: {error.message}</Text>
    );
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;