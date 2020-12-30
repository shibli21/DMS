import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Navbar />
        <Container maxW="7xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
