import React, { Fragment } from "react";
import "../styles/index.css";
import { NextPageContext } from "next";
import { WpAuthor } from "../components/wp-ui/wpTypes";
import Author from "../components/wp-ui/Author";
import { fetchUsers } from "../fetch/wordpress";
import getConfig from "next/config";
import { WpApiUser } from "@staticish/wp-api-to-static";
import { authorFromWpApi } from "../components/wp-ui/factories/wpFactory";
import fetch from "isomorphic-unfetch";

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
	const [authors, setAuthors] = React.useState<Array<WpAuthor>>(props.authors);
	React.useEffect(() => {
		fetch(`${props.endpoint}/api/authors?page=${props.page}`)
			.then(r => r.json())
			.then(r => {
				setAuthors(r);
			});
	}, [props.page]);
	return (
		<Fragment>
			{authors.map((author: WpAuthor) => (
				<Author key={author.name} author={addAuthorLink(author)} />
			))}
		</Fragment>
	);
};

Authors.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	//@ts-ignore
	const page = ctx.query.page ? (ctx.query.page as number) : 1;
	const endpoint = `http://localhost:3000/api/authors?page=${page}`;

	const authors = await fetch(
		`http://localhost:3000/api/authors?page=${page}`
	).then(r => r.json());
	return { page, endpoint, authors };
};

export default Authors;
