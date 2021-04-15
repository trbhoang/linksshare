import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Label, Button, Icon } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

function VoteButton({ user, link: { id, votes, votesCount } }) {
	if (Boolean(user && user.user)) {
		user.id = user.user.id;
		user.name = user.user.name;
	} else if (Boolean(user && user.userId)) {
		user.id = user.userId;
	}

	const [voted, setVoted] = useState(false);

	useEffect(() => {
		if (
			user &&
			votes.find((vote) => (vote.user ? vote.user.id === user.id : vote))
		) {
			setVoted(true);
		} else {
			setVoted(false);
		}
	}, [user, votes]);

	const [voteLink] = useMutation(VOTE_POST_MUTATION, {
		variables: { linkId: id },
	});

	const voteButton = user ? (
		voted ? (
			<Button color="teal" size="tiny">
				<Icon name="arrow up" />
				Upvoted
			</Button>
		) : (
			<Button color="teal" size="tiny" basic>
				<Icon name="arrow up" />
				Upvote
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="teal" size="tiny" basic>
			<Icon name="arrow up" />
			Upvote
		</Button>
	);

	return (
		<Button as="div" labelPosition="right" floated="right" onClick={voteLink}>
			{voteButton}
			<Label as="a" basic color="teal" pointing="left">
				{votesCount}
			</Label>
		</Button>
	);
}

const VOTE_POST_MUTATION = gql`
	mutation voteLink($linkId: ID!) {
		vote(linkId: $linkId) {
			id
			link {
				id
				votesCount
				votes {
					id
					user {
						id
					}
				}
			}
			user {
				id
			}
		}
	}
`;

export default VoteButton;
