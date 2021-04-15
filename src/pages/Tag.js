import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
	Grid,
	Card,
	Dimmer,
	Loader,
	Item,
	Header,
	Container,
} from "semantic-ui-react";

import Link from "../components/Link";

function Tag(props) {
	const tagId = props.match.params.tagId;

	const { loading, error, data } = useQuery(FETCH_LINK_QUERY, {
		variables: {
			tagIds: [tagId],
		},
	});
	const {
		loading: loading_tag,
		error: error_tag,
		data: { tag } = {},
	} = useQuery(FETCH_TAG, {
		variables: {
			tagId: tagId,
		},
	});

	// TAGS LOADING
	if (loading_tag)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);

	let Tag = "";
	if (error_tag || !tag) {
		Tag = <p>{<div className="ui error message">{error.message}</div>}</p>;
	} else {
		Tag = (
			<Grid>
				<Grid.Row>
					<Card fluid>
						<Card.Content>
							<Card.Header style={{ marginBottom: 5 }}>{tag.name}</Card.Header>
							<Card.Meta style={{ marginBottom: 5 }}>
								{tag.description}
							</Card.Meta>
							<Card.Description style={{ marginBottom: 5 }}>
								{tag.tips}
							</Card.Description>
						</Card.Content>
						<hr />
					</Card>
				</Grid.Row>
			</Grid>
		);
	}

	// LINKS LOADING
	if (loading)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	let Links = "";
	if (error || !data) {
		Links = (
			<p>{<div className="ui error message">{error_tag.message}</div>}</p>
		);
	} else {
		Links = (
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
	}

	return (
		<div>
			<Header
				as="h2"
				color="blue"
				textAlign="center"
				style={{ marginBottom: 40 }}
			>
				Tag
			</Header>
			{Tag}
			{/* Temporary work, fix it by making margin */}
			<br />
			<br />
			<hr />
			<br />
			<br />
			{Links}
			<br />
			<br />
		</div>
	);
}

const FETCH_TAG = gql`
	query getTag($tagId: ID!) {
		tag(tagId: $tagId) {
			name
			id
			description
			tips
		}
	}
`;

const FETCH_LINK_QUERY = gql`
	query FeedSearchQuery($tagIds: [ID!]) {
		feed(tagIds: $tagIds, orderBy: { createdAt: desc }) {
			count
			links {
				id
				title
				severity
				url
				type
				createdAt
				description
				tags {
					id
					name
				}
				postedBy {
					id
					name
				}
				votesCount
				downvotesCount
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						name
					}
				}
				downvotes {
					id
				}
			}
		}
	}
`;

export default Tag;
