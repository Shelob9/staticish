import React, { Fragment } from "react";
import "../styles/index.css";
import { NextPageContext } from "next";
import { WpAuthor } from "../components/wp-ui/wpTypes";
import Author from "../components/wp-ui/Author";
import { fetchUsers } from "../fetch/wordpress";
import getConfig from "next/config";
import { WpApiUser } from "@staticish/wp-api-to-static";
import { authorFromWpApi } from "../components/wp-ui/factories/wpFactory";

export const addAuthorLink = (author: WpAuthor) => {
	return {
		...author,
		link: {
			href: `/authors/${author.slug}`,
			text: `Read More`,
			title: `All Posts By ${author.name}`
		}
	};
};
type Props = {
	authors: Array<WpAuthor>;
	endpoint: string;
	page: number;
};
const Authors = (props: Props) => {
	return (
		<Fragment>
			{props.authors.map((author: WpAuthor) => (
				<Author key={author.name} author={addAuthorLink(author)} />
			))}
		</Fragment>
	);
};

const getRemoteAuthors = (endpoint: string, page: number = 1) => {
	return fetchUsers(endpoint, page);
};
Authors.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	const { serverRuntimeConfig } = getConfig();
	const { endpoint } = serverRuntimeConfig;
	//@ts-ignore
	const page = ctx.query.page ? (ctx.query.page as number) : 1;
	const authors = await getRemoteAuthors(
		endpoint,
		page
	).then((r: Array<WpApiUser>) => r.map((a: WpApiUser) => authorFromWpApi(a)));
	return { endpoint, page, authors };
};

export default Authors;
