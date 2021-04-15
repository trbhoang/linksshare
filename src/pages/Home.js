import React, { useContext } from "react";
import { Header, Transition } from "semantic-ui-react";
import CreateLink from "../components/CreateLink";

import { AuthContext } from "../context/auth";
import SearchLink from "../components/SearchLink";

function Home() {
	const { user } = useContext(AuthContext);
	return (
		<div>
			<Header
				as="h1"
				color="blue"
				textAlign="center"
				style={{ marginBottom: 40 }}
			>
				LinkShare
			</Header>
			{user && <CreateLink />}
			<br></br>
			<br></br>
			<Transition duration={100}>
				<SearchLink />
			</Transition>
			<br></br>
			<br></br>
		</div>
	);
}

export default Home;
