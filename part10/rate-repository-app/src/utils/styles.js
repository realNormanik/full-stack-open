import { StyleSheet } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    gap: theme.numbers.ten,
    padding: theme.numbers.fiveTeen,
    backgroundColor: theme.colors.white
  },
  box: {
    marginBottom: theme.numbers.ten,
    flexDirection: theme.flexDirection.row
  },
  header: {
    padding: theme.numbers.fiveTeen,
    backgroundColor: theme.colors.primary,
    flexDirection: theme.flexDirection.row
  },
  scrollContainer: {
    alignItems: theme.align.center,
    flexDirection: theme.flexDirection.row
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16    
  },
  headerText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold
  },
  text: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.secondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  avatar: {
    width: theme.numbers.fifty,
    height: theme.numbers.fifty,
    borderRadius: theme.numbers.five,
    marginRight: theme.numbers.fiveTeen
  },
  info: {
    flex: 1
  },
  name: {
    marginBottom: 4,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  },
  description: {
    marginBottom: 6,
    color: theme.colors.secondary
  },
  language: {
    overflow: "hidden",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    color: theme.colors.white,
    borderRadius: theme.numbers.five,
    backgroundColor: theme.colors.blue,
    fontWeight: theme.fontWeights.bold
  },
  button: {
    padding: 12,
    alignItems: theme.align.center,
    borderRadius: theme.numbers.five,
    marginTop: theme.numbers.fiveTeen,
    backgroundColor: theme.colors.blue
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.numbers.fiveTeen,
    textTransform: theme.display.none,
    fontWeight: theme.fontWeights.bold
  },
  buttonDelete: {
    backgroundColor: theme.colors.red
  },
  stats: {
    marginTop: theme.numbers.ten,
    justifyContent: "space-around",
    flexDirection: theme.flexDirection.row
  },
  statItem: {
    alignItems: theme.align.center
  },
  statLabel: {
    color: theme.colors.secondary
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: theme.colors.blue,
    alignItems: theme.align.center,
    justifyContent: theme.align.center,
    marginRight: theme.numbers.fiveTeen
  },
  rating: {
    fontSize: 16,
    color: theme.colors.blue,
    fontWeight: theme.fontWeights.bold
  },
  info: {
    flexShrink: 1
  },
  username: {
    fontSize: 16,
    fontWeight: theme.fontWeights.bold
  },
  date: {
    marginTop: 2,
    color: theme.colors.secondary
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: theme.numbers.five
  },
  form: {
    gap: 12,
    padding: 16,
    backgroundColor: theme.colors.white
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.grey
  },
  errorInput: {
    borderColor: theme.colors.red
  },
  errorText: {
    marginTop: -8,
    marginLeft: 8,
    color: theme.colors.red
  },
  errorFetch: {
    marginTop: 8,
    marginLeft: 8,
    color: theme.colors.primary
  },
  separator: {
    marginBottom: theme.numbers.ten
  },
  indicator: {
    marginTop: theme.numbers.ten
  },
  picker: {
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: theme.colors.grey
  },
  search: {
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5
  },
  noReviews: {
    marginTop: 8,
    marginLeft: 8,
    color: theme.colors.primary
  }
});

export default styles;