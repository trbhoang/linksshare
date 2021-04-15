import React, { useState } from "react";
import { Confirm, Button, Icon } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

import { FEED_QUERY } from "../utils/FeedQueryCache";

function DeleteButton({ link: { id }, callback }) {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteLink] = useMutation(DELETE_LINK, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FEED_QUERY,
			});
			proxy.writeQuery({
				query: FEED_QUERY,
				data: {
					feed: {
						links: data.feed.links.filter((l) => l.id !== id),
					},
				},
			});
			if (callback) callback();
		},
		variables: { linkId: id },
	});

	return (
		<div>
			<Button
				as="div"
				color="red"
				floated="right"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash alternate" style={{ margin: 0 }} />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deleteLink}
			/>
		</div>
	);
}

const DELETE_LINK = gql`
	mutation deleteLink($linkId: ID!) {
		deleteLink(linkId: $linkId)
	}
`;

export default DeleteButton;
