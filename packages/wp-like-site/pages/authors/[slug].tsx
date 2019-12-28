import React, { Fragment } from "react";
import "../../styles/index.css";
import { NextPageContext } from "next";
import { WpAuthor, WpPost } from "../../components/wp-ui/wpTypes";
import Author from "../../components/wp-ui/Author";
import { fetchUserBySlug } from "../../fetch/wordpress";
import getConfig from "next/config";
import { WpApiUser, WpApiPost } from "@staticish/wp-api-to-static";
import { authorFromWpApi } from "../../components/wp-ui/factories/wpFactory";
import { DisplayRemotePosts } from "../../components/RemotePosts";
import { fetchPostsByAuthorId } from "../../fetch/wordpress/fetchPost";
type Props = {
	author: WpAuthor;
	endpoint: string;
};
const SingleAuthor = (props: Props) => {
	const [authorId, setAuthorId] = React.useState<number>();
	const [author, setAuthor] = React.useState<WpAuthor>(props.author);
	React.useEffect(() => {
		fetchUserBySlug(props.endpoint, props.author.slug).then((a: WpApiUser) => {
			setAuthorId(a.id);
			setAuthor(authorFromWpApi(a));
		});
	}, [props.author.slug, setAuthor, setAuthorId]);

	return (
		<Fragment>
			<Author author={author} hLevel={1} />
			<Fragment>
				<h2>Posts By {author.name}</h2>
				{authorId ? (
					<DisplayRemotePosts
						page={1}
						endpoint={props.endpoint}
						fetchPosts={(page: number) =>
							fetchPostsByAuthorId(props.endpoint, authorId, page, "posts")
						}
					/>
				) : (
					<div>Loading</div>
				)}
			</Fragment>
		</Fragment>
	);
};

SingleAuthor.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	const { serverRuntimeConfig } = getConfig();
	const { endpoint } = serverRuntimeConfig;
	const slug = ctx.query.slug ? (ctx.query.slug as string) : "";

	const author = await fetchUserBySlug(endpoint, slug).then((a: WpApiUser) =>
		authorFromWpApi(a)
	);
	return { endpoint, author };
};

export default SingleAuthor;
