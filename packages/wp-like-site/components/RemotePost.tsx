import React from "react";
import getConfig from "next/config";

import { BlogPost, wpFactory } from "./wp-ui";
import { WpPost } from "./wp-ui/wpTypes";
import {
	fetchPost,
	fetchAuthor,
	fetchFeatured,
	fetchTags
} from "../fetch/wordpress";

export type RemotePostProps = {
	wpLikePost: WpPost;
	endpoint: string;
};

/**
 * Get a post by slug
 *
 * @param slug
 * @param endpoint
 */
export const getRemotePost = async (
	slug: string,
	endpoint: string
): Promise<RemotePostProps> => {
	const post = await fetchPost(slug as string, endpoint);
	const author = await fetchAuthor(post.author, endpoint);
	const featured = await fetchFeatured(post.featured_media, endpoint);
	const tags = await fetchTags(post.tags as Array<number>, endpoint);
	const published = post.date;

	const factory = wpFactory({
		author: () => author,
		featured: () => featured,
		tags: () => tags,
		published: () => published
	});

	const wpLikePost = await factory.convertPost(post);

	return { wpLikePost, endpoint };
};

/**
 * Display a remote post
 *
 * @param props
 */
const RemotePost = (props: RemotePostProps) => {
	const [post, setPost] = React.useState<WpPost>(props.wpLikePost);

	//Query for updated, assuming props was queried server-side and may be out of date
	React.useEffect(() => {
		getRemotePost(
			props.wpLikePost.slug,
			props.endpoint
		).then((r: RemotePostProps) => setPost(r.wpLikePost));
	}, [props.wpLikePost.id, setPost]);
	return <BlogPost post={post} />;
};

/**
 * Query server-side for remote post
 */
RemotePost.getInitialProps = async (ctx: { query: { slug: string } }) => {
	const { slug } = ctx.query;
	const { serverRuntimeConfig } = getConfig();
	const { endpoint } = serverRuntimeConfig;
	const { wpLikePost } = await getRemotePost(slug as string, endpoint);
	return { wpLikePost, endpoint };
};

export default RemotePost;
