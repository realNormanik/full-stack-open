import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import theme from "../utils/theme";
import styles from "../utils/styles";

const formatThousands = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

const Stat = ({ value, label }) => (
  <View style={styles.statItem} testID={`statItem-${label}`}>
    <Text style={{ fontWeight: theme.fontWeights.bold }} testID={`statValue-${label}`}>
      {formatThousands(value)}
    </Text>
    <Text style={styles.statLabel} testID={`statLabel-${label}`}>{label}</Text>
  </View>
);

Stat.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

const RepositoryItem = ({ item, showGithubButton }) => {
  const handleOpenGitHub = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.box}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} testID="repositoryAvatar" />
        <View style={styles.info}>
          <Text style={styles.name} testID="repositoryName">{item.fullName}</Text>
          <Text style={styles.description} testID="repositoryDescription">{item.description}</Text>
          <Text style={styles.language} testID="repositoryLanguage">{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat value={item.stargazersCount} label="Stars" />
        <Stat value={item.forksCount} label="Forks" />
        <Stat value={item.reviewCount} label="Reviews" />
        <Stat value={item.ratingAverage} label="Rating" />
      </View>
      {showGithubButton && (
        <TouchableOpacity style={styles.button} onPress={handleOpenGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

RepositoryItem.propTypes = {
  item: PropTypes.shape({
    ownerAvatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    stargazersCount: PropTypes.number.isRequired,
    forksCount: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    ratingAverage: PropTypes.number.isRequired,
    url: PropTypes.string
  }).isRequired,
  showGithubButton: PropTypes.bool
};

export default RepositoryItem;