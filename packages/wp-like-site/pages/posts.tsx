import React, { Fragment } from "react";
import "../styles/index.css";
import { NextPageContext } from "next";
import { WpPost } from "../components/wp-ui/wpTypes";
import { BlogPostPreview } from "../components/wp-ui";
import fetch from "isomorphic-unfetch";
type Props = {
	posts: Array<WpPost>;
	endpoint: string;
	page: number;
};

const Posts = (props: Props) => {
	const [posts, setPosts] = React.useState<Array<WpPost>>(props.posts);
	const link = (post: WpPost) => `/posts/${post.slug}`;
	React.useEffect(() => {
		fetch(`${props.endpoint}/api/posts?page=${props.page}`)
			.then(r => r.json())
			.then((r: Array<WpPost>) => setPosts(r));
	}, [props.posts.length]);
	return (
		<Fragment>
			{posts.map((post: WpPost) => (
				<BlogPostPreview key={post.id} post={post} link={link(post)} />
			))}
		</Fragment>
	);
};

Posts.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	//@ts-ignore
	const page = ctx.query.page ? (ctx.query.page as number) : 1;
	const endpoint = `http://localhost:3000`;
	const posts = await fetch(`${endpoint}/api/posts?page=${page}`).then(r =>
		r.json()
	);
	return { endpoint, page, posts };
};

export default Posts;
