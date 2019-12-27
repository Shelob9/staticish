import React, { Fragment } from "react";
import getConfig from "next/config";

import { BlogPostPreview } from "./wp-ui";
import { WpPost } from "./wp-ui/wpTypes";
import { fetchPosts } from "../fetch/wordpress";
import { getRemotePost, RemotePostProps } from "./RemotePost";
import { WpApiPost, postsToStatic } from "@staticish/wp-api-to-static";

export type RemotePostsProps = {
	posts: Array<WpPost>;
	endpoint: string;
	page: number;
};

export const getRemotePosts = async (
	endpoint: string,
	page: number = 1
): Promise<RemotePostsProps> => {
	return new Promise(async resolve => {
		const _posts = await fetchPosts(endpoint, page, "post");
		const posts: Array<WpPost> = [];
		if (_posts.length) {
			_posts.forEach(async (post: WpApiPost) => {
				try {
					const wpPost = await getRemotePost(post.slug, endpoint).then(
						(r: RemotePostProps) => {
							return r.wpLikePost;
						}
					);
					posts.push(wpPost);
				} catch {
					(e: Error) => console.log(e);
				}
			});
		}

		resolve({ posts, endpoint, page });
	});
};

/**
 * Display remote posts
 *
 * @param props
 */
const RemotePosts = (props: RemotePostsProps) => {
	const [posts, setPosts] = React.useState<Array<WpPost>>(props.posts);

	//Query for updated, assuming props was queried server-side and may be out of date
	React.useEffect(() => {
		fetchPosts(props.endpoint, props.page).then((r: Array<WpApiPost>) => {
			const promises: Array<Promise<WpPost>> = [];
			r.map((post: WpApiPost) => {
				promises.push(
					getRemotePost(post.slug, props.endpoint).then(
						(r: RemotePostProps) => r.wpLikePost
					)
				);
			});
			Promise.all(promises).then((r: Array<WpPost>) => setPosts(r));
		});
	}, [props.page, setPosts]);
	const link = (post: WpPost) => `${props.endpoint}/posts/${post.slug}`;
	return (
		<Fragment>
			{posts.map((post: WpPost) => (
				<BlogPostPreview key={post.id} post={post} link={link(post)} />
			))}
		</Fragment>
	);
};

/**
 * Query server-side for remote post
 */
RemotePosts.getInitialProps = async (ctx: {
	query: { page?: number };
}): Promise<RemotePostsProps> => {
	const { serverRuntimeConfig } = getConfig();
	const { endpoint } = serverRuntimeConfig;
	const page = ctx.query.page ? ctx.query.page : 1;
	const { posts } = await getRemotePosts(endpoint, page);
	return { endpoint, posts, page };
};

export default RemotePosts;
