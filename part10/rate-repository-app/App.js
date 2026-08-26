import { View, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import theme from './src/utils/theme';
import Main from './src/components/Main';
import createApolloClient from './src/client';

const client = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <View style={styles.container}>
          <Main />
        </View>
      </NativeRouter>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  }
});

export default App;