import React from "react";
import {
	Form,
	Select,
	Dropdown,
	Button,
	Dimmer,
	Loader,
	Item,
	Input,
} from "semantic-ui-react";
import { useLazyQuery, gql, useQuery } from "@apollo/client";

import { useForm } from "../utils/hooks";
import Link from "./Link";
import LinkList from "./LinkList";

import "semantic-ui-css/semantic.min.css";

const SearchLink = () => {
	const [executeSearch, { data: data_feed }] = useLazyQuery(FEED_QUERY);
	const { onChange, onSubmit, values } = useForm(executeSearch, {
		filter: "",
		type: null,
		tagIds: [],
		// sortBy: {},
	});

	const { loading, error, data } = useQuery(TAGS_QUERY);
	const { loading: loadingQ, error: errorQ, data: dataQ } = useQuery(
		TYPES_QUERY
	);

	// QUERYING FOR TAGS
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
		options = "OPTIONS";
	}

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate widths="equal">
				<Form.Group widths="equal">
					<Form.Field
						control={Input}
						label="Search"
						name="filter"
						placeholder="type search query here"
						value={values.filter}
						onChange={onChange}
					/>
					<Form.Field
						control={Select}
						label="Type"
						name="type"
						options={options}
						placeholder="Which type is it?"
						onChange={onChange}
						value={values.type}
					/>
					<Dropdown
						placeholder="Tags"
						label="Tags"
						name="tagIds"
						fluid
						multiple
						selection
						options={options_tags}
						onChange={onChange}
						value={values.tagIds}
					/>
				</Form.Group>
				<Button type="submit" fluid>
					Search
				</Button>
			</Form>
			<Item.Group divided>
				{data_feed && data_feed !== [] ? (
					data_feed.feed.links.map((link) => <Link key={link.id} link={link} />)
				) : (
					<LinkList />
				)}
			</Item.Group>
			<br></br>
			<br></br>
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

const FEED_QUERY = gql`
	query FeedSearchQuery($filter: String!, $tagIds: [ID!], $type: Type) {
		feed(
			filter: $filter
			tagIds: $tagIds
			orderBy: { createdAt: desc }
			type: $type
		) {
			links {
				id
				title
				url
				type
				createdAt
				severity
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
				}
				downvotes {
					id
				}
			}
		}
	}
`;

export default SearchLink;
