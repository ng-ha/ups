import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import RootNavigator from './src/navigators/RootNavigator';

const client = new ApolloClient({
  uri: 'http://localhost:5001/api/vocal-lynx',
  cache: new InMemoryCache(),
  connectToDevTools: false,
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
}
