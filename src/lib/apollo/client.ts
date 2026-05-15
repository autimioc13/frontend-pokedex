import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
})
