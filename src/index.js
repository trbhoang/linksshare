import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
	uri: "https://links-dist-server.herokuapp.com/",
});

const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
