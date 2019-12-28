import { NextApiRequest, NextApiResponse } from "next";
import { getRemotePosts, RemotePostsProps } from "../../components/RemotePosts";
import { fetchPostsByAuthorId, collectPosts } from "../../fetch/wordpress";
import getConfig from "next/config";
import { WpPost } from "../../components/wp-ui/wpTypes";
import { WpApiPost } from "@staticish/wp-api-to-static";

export default async function(req: NextApiRequest, res: NextApiResponse) {
	const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
	const authorId = req.query.author
		? parseInt(req.query.author as string, 10)
		: undefined;

	const config = getConfig();
	const endpoint =
		config && config.serverRuntimeConfig
			? config.serverRuntimeConfig.endpoint
			: "http://localhost:3100/wp-json";

	let posts: Array<WpPost> = [];

	if (authorId) {
		posts = await fetchPostsByAuthorId(
			endpoint,
			authorId,
			page
		).then((r: Array<WpApiPost>) => collectPosts(r, endpoint));
	} else {
		posts = await getRemotePosts(endpoint, page).then(
			(r: RemotePostsProps) => r.posts
		);
	}

	res.status(posts.length ? 200 : 404);
	res.json(posts);
	res.end();
}
