import React from "react";
//import { getWpPost } from "@staticish/wp-api-to-static";
import "../styles/index.css";
import RemotePosts, { RemotePostsProps } from "../components/RemotePosts";
import { NextPageContext } from "next";
const Posts = (props: RemotePostsProps) => <RemotePosts {...props} />;

Posts.getInitialProps = async (ctx: NextPageContext) => {
	return RemotePosts.getInitialProps({
		...ctx,
		query: {
			...ctx.query,
			//@ts-ignore
			page: ctx.query.page ? (ctx.query.page as number) : 1
		}
	});
};

export default Posts;
