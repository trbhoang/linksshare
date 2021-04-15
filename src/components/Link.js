import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Item, Label } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import VoteButton from "./VoteButton";
import DownButton from "./DownButton";
import DeleteButton from "./DeleteButton";

const Links = (props) => {
	const { link } = props;

	const { user } = useContext(AuthContext);
	if (Boolean(user && user.user)) {
		user.id = user.user.id;
		user.name = user.user.name;
	} else if (user && user.userId) {
		user.id = user.userId;
	}

	var colorText = "#c0b41d";
	if (link.severity === "MEDIUM") {
		colorText = "#c0681d";
	} else if (link.severity === "HIGH") {
		colorText = "red";
	} else if (link.severity === "NONE") {
		colorText = "Green";
	} else if (link.severity === "CRITICAL") {
		colorText = "pink";
	} else if (link.severity === "TOOL") {
		colorText = "blue";
	} else if (link.severity === "NEWS") {
		colorText = "violet";
	}

	//  THIS IS TEMP PROVISION TO HANDLE THE USER INFO coming from TOKEN and USER INFO coming from DATA

	return (
		<Item>
			<Item.Content>
				<Item.Header as={Link} to={`/links/${link.id}`}>
					{link.title}
				</Item.Header>
				&nbsp;&nbsp;
				<a href={link.url} target="_blank" rel="noreferrer">
					<i>Visit the link</i>
				</a>
				<Item.Description>{link.description}</Item.Description>
				<Item.Meta>
					<b>created:</b>&nbsp;{moment(parseInt(link.createdAt)).fromNow()}
					&nbsp;&nbsp;
					<b>Type:</b>&nbsp;{link.type}&nbsp;&nbsp;
					<b>Severity:</b>&nbsp;
					<b style={{ color: colorText }}>{link.severity}</b>
					{/* <b>Severity:</b>&nbsp;&nbsp; */}
				</Item.Meta>
				<Item.Extra>
					<b>Tags:</b>
					{link.tags.map((tag) => (
						<Label as={Link} to={`/tags/${tag.id}`} color="black" basic>
							{tag.name}
						</Label>
					))}
				</Item.Extra>
				{/* VOTE BUTTON WILL HAVE A DIFFERENT FILE */}
				<VoteButton
					user={user}
					link={{ id: link.id, votes: link.votes, votesCount: link.votesCount }}
				></VoteButton>
				{/* DOWNVOTE BUTTON WILL HAVE ITS OWN FILE AS WELL */}
				<DownButton
					user={user}
					link={{
						id: link.id,
						downvotes: link.downvotes,
						downvotesCount: link.downvotesCount,
					}}
				></DownButton>
				{/* DELETE BUTTON */}
				{user && user.id === link.postedBy.id && (
					<DeleteButton link={{ id: link.id }}></DeleteButton>
				)}
			</Item.Content>
		</Item>
	);
};

export default Links;
