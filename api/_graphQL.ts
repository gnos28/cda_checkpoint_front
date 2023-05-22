import {
  ApolloClient,
  ApolloClientOptions,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client";

let fromFrontUrl = "http://localhost:5000";

if (process.env.NEXT_PUBLIC_BACKEND_URL)
  fromFrontUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

let fromBackUrl = "http://localhost:5000";

if (process.env.NEXT_PUBLIC_BACKEND_URL)
  fromBackUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

console.log("fromFrontUrl", fromFrontUrl);

const paramsCsr: ApolloClientOptions<unknown> = {
  // uri: `${fromFrontUrl}/graphql`,
  uri: `${fromFrontUrl}`,
  cache: new InMemoryCache(),
  defaultOptions,
};

const paramsSsr: ApolloClientOptions<unknown> = {
  // uri: `${fromFrontUrl}/graphql`,
  uri: `${fromBackUrl}`,
  cache: new InMemoryCache(),
  defaultOptions,
};

// const token = localStorage.getItem("token");

// if (token) params.headers = { Authorization: "Bearer " + token };
export const api = {
  csr: new ApolloClient(paramsCsr),
  ssr: new ApolloClient(paramsSsr),
};
