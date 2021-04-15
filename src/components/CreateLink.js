import React, { useState } from "react";
import {
	Form,
	Input,
	Select,
	Dropdown,
	Button,
	Dimmer,
	Loader,
} from "semantic-ui-react";
import { useQuery, useMutation, gql } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FEED_QUERY } from "../utils/FeedQueryCache";

import "semantic-ui-css/semantic.min.css";

const CreateLink = () => {
	const [errorsMutation, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(createPostCallback, {
		title: "",
		url: "",
		description: "",
		type: "",
		tags: [],
		severity: "",
	});

	const [createPost] = useMutation(CREATE_POST, {
		variables: values,
		update(cache, result) {
			const data = cache.readQuery({
				query: FEED_QUERY,
			});

			cache.writeQuery({
				query: FEED_QUERY,
				data: {
					feed: result.data.post,
					...data.feed,
				},
			});
			values.title = "";
			values.url = "";
			values.type = "";
			values.tags = [];
			values.description = "";
			values.severity = "";
		},
		onError(err) {
			setErrors(err.graphQLErrors);
		},
	});

	// QUERYING FOR TAGS
	const { loading, error, data } = useQuery(TAGS_QUERY);
	const { loading: loadingQ, error: errorQ, data: dataQ } = useQuery(
		TYPES_QUERY
	);
	const { loading: loadingS, error: errorS, data: dataS } = useQuery(
		SEVERITY_TYPES
	);

	if (loading)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	if (error) return <p>Error occurred..</p>;

	var options_tags = [];
	if (Boolean(data)) {
		options_tags = data.tags.map((tag) => {
			return { key: tag.id, text: tag.name, value: tag.id };
		});
	} else {
		options_tags = "Yet to make Tags!";
	}
	// QUERYING FOR ENUMS

	if (loadingQ)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	if (errorQ) return <p>Error occurred..</p>;

	var options = [];
	if (Boolean(dataQ)) {
		// console.log(dataQ.__type.enumValues)
		options = dataQ.__type.enumValues.map((type) => {
			return { key: type.name, text: type.name, value: type.name };
		});
	} else {
		options = [
			{ key: "b", text: "Blog", value: "BLOG" },
			{ key: "r", text: "Report", value: "REPORT" },
			{ key: "v", text: "Video", value: "VIDEO" },
		];
	}

	// QUERYING FOR SEVERITY ENUMS
	if (loadingS)
		return (
			<p>
				<Dimmer active>
					<Loader indeterminate>loading...</Loader>
				</Dimmer>
			</p>
		);
	if (errorS) return <p>Error occurred..</p>;

	var options_severity = [];
	if (Boolean(dataS)) {
		// console.log(dataQ.__type.enumValues)
		options_severity = dataS.__type.enumValues.map((type) => {
			return { key: type.name, text: type.name, value: type.name };
		});
	} else {
		options_severity = [
			{ key: "h", text: "High", value: "HIGH" },
			{ key: "m", text: "MEDIUM", value: "MEDIUM" },
			// { key: 'l', text: 'Low', value: 'LOW' },
			// { key: 'n', text: 'None', value: 'NONE' },
		];
	}

	function createPostCallback() {
		createPost();
	}

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate>
				<h2>Make link post</h2>
				<Form.Group widths="equal">
					<Form.Input
						control={Input}
						label="Title"
						name="title"
						placeholder="Enter the title of the link"
						value={values.title}
						onChange={onChange}
					/>
					<Form.Input
						control={Input}
						label="URL"
						name="url"
						placeholder="http(s)://example.com"
						value={values.url}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field
						control={Select}
						label="Type"
						name="type"
						options={options}
						placeholder="Which type is it?"
						onChange={onChange}
						value={values.type}
					/>
					<Form.Field
						control={Select}
						label="Severity"
						name="severity"
						options={options_severity}
						placeholder="How severe is it?"
						onChange={onChange}
						value={values.severity}
					/>
					<Dropdown
						placeholder="Tags"
						label="Tags"
						name="tags"
						fluid
						multiple
						selection
						options={options_tags}
						onChange={onChange}
						value={values.tags}
					/>
				</Form.Group>
				<Form.TextArea
					label="Description"
					name="description"
					placeholder="Tell us more about the link..."
					onChange={onChange}
					value={values.description}
				/>
				<Button type="submit" fluid>
					submit
				</Button>
			</Form>
			{Object.values(errorsMutation).map((error) => (
				<div className="ui error message">{error.message}</div>
			))}
		</div>
	);
};

const TAGS_QUERY = gql`
	{
		tags {
			id
			name
		}
	}
`;

const TYPES_QUERY = gql`
	query {
		__type(name: "Type") {
			enumValues {
				name
			}
		}
	}
`;

const SEVERITY_TYPES = gql`
	query {
		__type(name: "Severity") {
			enumValues {
				name
			}
		}
	}
`;

const CREATE_POST = gql`
	mutation Post(
		$url: String!
		$description: String!
		$title: String!
		$type: Type!
		$tags: [ID!]!
		$severity: Severity!
	) {
		post(
			url: $url
			description: $description
			title: $title
			type: $type
			tags: $tags
			severity: $severity
		) {
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
			postedBy {
				id
				name
			}
			votes {
				id
				user {
					id
					name
				}
			}
			downvotes {
				id
				user {
					id
					name
				}
			}
		}
	}
`;

export default CreateLink;
