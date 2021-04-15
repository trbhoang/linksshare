import { gql } from "@apollo/client";

export const FEED_QUERY = gql`
	{
		feed(orderBy: { createdAt: desc }) {
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
	}
`;
