import React from "react";
import { Link } from "react-router-dom";
import { Card, Grid } from "semantic-ui-react";

function Tags(props) {
	const { tag } = props;

	return (
		<Grid>
			<Grid.Row>
				<Card fluid>
					<Card.Content as={Link} to={`/tags/${tag.id}`}>
						<Card.Header style={{ marginBottom: 5 }}>{tag.name}</Card.Header>
						<Card.Meta style={{ marginBottom: 5 }}>{tag.description}</Card.Meta>
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

export default Tags;
