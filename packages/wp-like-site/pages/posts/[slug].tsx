import React from "react";
import { NextPageContext } from "next";
import getConfig from "next/config";
import RemotePost, {
	getRemotePost,
	RemotePostProps
} from "../../components/RemotePost";

const Post = (props: RemotePostProps) => {
	const [post, setPost] = React.useState(props.wpLikePost);
	React.useEffect(() => {
		const { publicRuntimeConfig } = getConfig();
		const { endpoint } = publicRuntimeConfig;
		if (!post) {
			getRemotePost(
				props.wpLikePost.slug,
				endpoint
			).then((p: RemotePostProps) => setPost(p.wpLikePost));
		}
	}, [post]);

	return <RemotePost wpLikePost={post} endpoint={props.endpoint} />;
};

Post.getInitialProps = async (ctx: NextPageContext) => {
	return RemotePost.getInitialProps({
		...ctx,
		query: {
			...ctx.query,
			slug: ctx.query.slug ? (ctx.query.slug as string) : ""
		}
	});
};

export default Post;
