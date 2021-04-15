import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Card, Dimmer, Loader, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import VoteButton from "../components/VoteButton";
import DownButton from "../components/DownButton";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";

function SingleLink(props) {
	const linkId = props.match.params.linkId;

	const { user } = useContext(AuthContext);
	if (Boolean(user && user.user)) {
		user.id = user.user.id;
		user.name = user.user.name;
	} else if (user && user.userId) {
		user.id = user.userId;
	}

	const { loading, error, data } = useQuery(FETCH_LINK_QUERY, {
		variables: {
			linkId,
		},
	});

	if (loading)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	if (error)
		return <p>{<div className="ui error message">{error.message}</div>}</p>;

	function deleteLinkCallback() {
		props.history.push("/");
	}

	let postMarkup;
	if (!data.link) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id,
			title,
			url,
			description,
			type,
			createdAt,
			tags,
			postedBy,
			votesCount,
			downvotesCount,
			severity,
			votes,
			downvotes,
		} = data.link;

		var colorText = "#c0b41d";
		if (severity === "MEDIUM") {
			colorText = "#c0681d";
		} else if (severity === "HIGH") {
			colorText = "red";
		}

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Card fluid>
						<Card.Content>
							<Card.Header href={url} style={{ marginBottom: 5 }}>
								{title}
							</Card.Header>
							<Card.Meta style={{ marginLeft: 10, marginBottom: 5 }}>
								<b>created:</b>&nbsp;{moment(parseInt(createdAt)).fromNow()}
								&nbsp;&nbsp;
								<b>Type:</b>&nbsp;{type}&nbsp;&nbsp;
								<b>Severity:</b>&nbsp;
								<b style={{ color: colorText }}>{severity}</b>
								{/* <b>Severity:</b>&nbsp;&nbsp; */}
							</Card.Meta>
							<Card.Meta style={{ marginLeft: 10, marginBottom: 5 }}>
								<b>Tags:</b>
								{tags.map((tag) => (
									<Label as={Link} to={`/tags/${tag.id}`} color="black" basic>
										{tag.name}
									</Label>
								))}
							</Card.Meta>
							<Card.Meta style={{ marginLeft: 10, marginBottom: 5 }}>
								<b>PostedBy:</b>
								<Label as="a" image>
									{postedBy.name}
								</Label>
							</Card.Meta>
							<Card.Description style={{ marginLeft: 10, marginBottom: 5 }}>
								{description}
							</Card.Description>
						</Card.Content>
						<hr />
						<Card.Content extra>
							<VoteButton
								user={user}
								link={{ id, votes, votesCount }}
							></VoteButton>
							<DownButton
								user={user}
								link={{ id, downvotes, downvotesCount }}
							></DownButton>
							{user && user.id === postedBy.id && (
								<DeleteButton
									link={{ id: id }}
									callback={deleteLinkCallback}
								></DeleteButton>
							)}
						</Card.Content>
					</Card>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
}

const FETCH_LINK_QUERY = gql`
	query GetSingleLink($linkId: ID!) {
		link(linkId: $linkId) {
			id
			title
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
			severity
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
`;

export default SingleLink;
