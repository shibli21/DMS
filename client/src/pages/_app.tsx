import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Navbar />
        <Container maxW="7xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
