import React, { Fragment } from "react";
import { NextPageContext } from "next";
import "../../styles/index.css";
import { WpPost } from "../../components/wp-ui/wpTypes";
import { BlogPost } from "../../components/wp-ui";

type Props = {
	post: WpPost;
	endpoint: string;
	slug: string;
};
const Post = (props: Props) => {
	const [post, setPost] = React.useState<WpPost>(props.post);
	React.useEffect(() => {
		fetch(`${props.endpoint}/api/posts?slug=${props.post.slug}`)
			.then(r => r.json())
			.then(r => setPost(r[0]));
	}, [props.post.id, setPost]);

	return (
		<Fragment>
			<BlogPost post={post} />
		</Fragment>
	);
};

Post.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	const slug = ctx.query.slug ? (ctx.query.slug as string) : "";
	const endpoint = `http://localhost:3000`;
	const posts: Array<WpPost> = await fetch(
		`${endpoint}/api/posts?slug=${slug}`
	).then(r => r.json());

	return { post: posts[0], endpoint, slug };
};

export default Post;
