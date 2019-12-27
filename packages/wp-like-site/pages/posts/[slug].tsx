import React from "react";
import { NextPageContext } from "next";
import getConfig from "next/config";
import RemotePost, { RemotePostProps } from "../../components/RemotePost";
import "../../styles/index.css";

const Post = (props: RemotePostProps) => (
	<RemotePost wpLikePost={props.wpLikePost} endpoint={props.endpoint} />
);

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
