import React, { useState, useContext } from "react";
import { Input, Button, Dimmer, Loader, Form } from "semantic-ui-react";
import { useQuery, useMutation, gql } from "@apollo/client";

import { useForm } from "../utils/hooks";
import Tags from "../components/Tags";
import { AuthContext } from "../context/auth";

const CreateTag = () => {
	const [errorsMutation, setErrors] = useState({});

	const { user } = useContext(AuthContext);

	const { onChange, onSubmit, values } = useForm(createTagCallback, {
		name: "",
		description: "",
		tips: "",
	});

	const [createTag] = useMutation(CREATE_TAG, {
		variables: values,
		update(cache, result) {
			const data = cache.readQuery({
				query: TAGS_QUERY,
			});
			cache.writeQuery({
				query: TAGS_QUERY,
				data: {
					tags: [result.data.createTags, ...data.tags],
				},
			});
			values.name = "";
			values.tips = "";
			values.description = "";
		},
		onError(err) {
			setErrors(err.graphQLErrors);
		},
	});

	function createTagCallback() {
		createTag();
	}

	let Tag_Form = (
		<Form onSubmit={onSubmit} noValidate>
			<h2>Create Tag</h2>
			<Form.Group widths="equal">
				<Form.Input
					control={Input}
					label="Name"
					name="name"
					placeholder="Enter the name of the tag."
					value={values.name}
					onChange={onChange}
				/>
			</Form.Group>
			<Form.TextArea
				label="Description"
				name="description"
				placeholder="Tell us more about the tag..."
				onChange={onChange}
				value={values.description}
			/>
			<Form.TextArea
				label="Tips"
				name="tips"
				placeholder="Any tips, which are required"
				onChange={onChange}
				value={values.tips}
			/>
			<Button type="submit" fluid>
				submit
			</Button>
		</Form>
	);

	// QUERYING FOR TAGS
	const { loading, error, data: { tags } = {} } = useQuery(TAGS_QUERY);

	if (loading)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);

	let Tags_display = [];
	if (error) {
		Tags_display = [<p>Error occurred..</p>];
	} else if (Boolean(tags)) {
		Tags_display = tags.map((tag) => <Tags key={tag.id} tag={tag} />);
	}

	return (
		<div>
			{user && Tag_Form}
			{Object.values(errorsMutation).map((error) => (
				<div className="ui error message">{error.message}</div>
			))}
			<br />
			<br />
			{Tags_display}
			<br />
			<br />
		</div>
	);
};

const TAGS_QUERY = gql`
	{
		tags {
			id
			name
			description
			tips
		}
	}
`;

const CREATE_TAG = gql`
	mutation CreateTags($name: String!, $description: String!, $tips: String!) {
		createTags(name: $name, description: $description, tips: $tips) {
			id
			name
			tips
			description
		}
	}
`;

export default CreateTag;
