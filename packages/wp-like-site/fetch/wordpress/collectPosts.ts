import { WpApiPost } from "@staticish/wp-api-to-static";
import { RemotePostProps, getRemotePost } from "../../components/RemotePost";
import { WpPost } from "../../components/wp-ui/wpTypes";

/**
 * Given a WP API Post, collect all data to make a WpPost
 *
 * @param post
 * @param endpoint
 */
export const collectPost = async (post: WpApiPost, endpoint: string) => {
	return getRemotePost(post.slug, endpoint).then((r: RemotePostProps) => {
		return r.wpLikePost;
	});
};

/**
 * Given an array of WP API Posts, collect all data to make a WpPost
 *
 * @param posts
 * @param endpoint
 */
export const collectPosts = async (
	posts: Array<WpApiPost>,
	endpoint: string
): Promise<Array<WpPost>> => {
	return Promise.all(
		posts.map((post: WpApiPost) => collectPost(post, endpoint))
	);
};
