import React from "react";
import { useQuery } from "@apollo/client";
import { Container, Item, Dimmer, Loader } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import Link from "./Link";

import { FEED_QUERY } from "../utils/FeedQueryCache";

const LinkList = () => {
	const { loading, error, data } = useQuery(FEED_QUERY);

	if (loading)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	if (error) return <p>Error occurred..</p>;

	return (
		<Container>
			<Item.Group divided>
				{data.feed.links.map((link) => (
					<Link key={link.id} link={link} />
				))}
			</Item.Group>
			<br></br>
			<br></br>
		</Container>
	);
};

export default LinkList;
