import React, { Fragment } from "react";
import "../../styles/index.css";
import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";
import { WpAuthor, WpPost } from "../../components/wp-ui/wpTypes";
import Author from "../../components/wp-ui/Author";
import { BlogPostPreview } from "../../components/wp-ui";
type Props = {
	author: WpAuthor;
	endpoint: string;
	slug: string;
	posts: Array<WpPost>;
	id: number;
};
const SingleAuthor = (props: Props) => {
	const [posts, setPosts] = React.useState<Array<WpPost>>(props.posts);
	const [author, setAuthor] = React.useState<WpAuthor>(props.author);
	React.useEffect(() => {
		fetch(`${props.endpoint}/api/authors/${props.id}`)
			.then(r => r.json())
			.then(r => {
				setPosts(r.posts);
				setAuthor(r.author);
			});
	}, [props.slug, setAuthor, setPosts]);
	const link = (post: WpPost) => `/posts/${post.slug}`;

	return (
		<Fragment>
			{author && (
				<Fragment>
					<Author author={author} hLevel={1} />
					<Fragment>
						<h2>Posts By {author.name}</h2>
						{posts.length && (
							<Fragment>
								{posts.map((post: WpPost) => (
									<BlogPostPreview
										key={post.id}
										post={post}
										link={link(post)}
									/>
								))}
							</Fragment>
						)}
					</Fragment>
				</Fragment>
			)}
		</Fragment>
	);
};

SingleAuthor.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	const slug = ctx.query.slug ? (ctx.query.slug as string) : "";
	const endpoint = `http://localhost:3000`;
	const authors = await fetch(`${endpoint}/api/authors?slug=${slug}`).then(r =>
		r.json()
	);
	const id = authors[0].id;
	const posts = await fetch(`${endpoint}/api/posts?author=${id}`).then(r =>
		r.json()
	);

	return { endpoint, author: authors[0], posts, slug, id };
};

export default SingleAuthor;
