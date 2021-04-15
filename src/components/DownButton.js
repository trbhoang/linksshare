import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Label, Button, Icon } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

function DownVoteButton({ user, link: { id, downvotes, downvotesCount } }) {
	if (Boolean(user && user.user)) {
		user.id = user.user.id;
		user.name = user.user.name;
	} else if (Boolean(user && user.userId)) {
		user.id = user.userId;
	}

	const [downvoted, setDownVoted] = useState(false);

	useEffect(() => {
		if (
			user &&
			downvotes.find((downvote) =>
				downvote.user ? downvote.user.id === user.id : downvote
			)
		) {
			setDownVoted(true);
		} else {
			setDownVoted(false);
		}
	}, [user, downvotes]);

	const [downvoteLink] = useMutation(DOWNVOTE_POST_MUTATION, {
		variables: { linkId: id },
	});

	const downVoteButton = user ? (
		downvoted ? (
			<Button color="red" size="tiny">
				<Icon name="arrow down" />
				DownVoted
			</Button>
		) : (
			<Button color="red" size="tiny" basic>
				<Icon name="arrow down" />
				DownVote
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="red" size="tiny" basic>
			<Icon name="arrow down" />
			DownVote
		</Button>
	);

	return (
		<Button
			as="div"
			labelPosition="right"
			floated="right"
			onClick={downvoteLink}
		>
			{downVoteButton}
			<Label as="a" basic color="red" pointing="left">
				{downvotesCount}
			</Label>
		</Button>
	);
}

const DOWNVOTE_POST_MUTATION = gql`
	mutation downvoteLink($linkId: ID!) {
		downvote(linkId: $linkId) {
			id
			link {
				id
				downvotesCount
				downvotes {
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

export default DownVoteButton;
