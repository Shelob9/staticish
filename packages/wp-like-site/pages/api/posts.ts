import { NextApiRequest, NextApiResponse } from "next";
import {
	fetchPostsByAuthorId,
	collectPosts,
	fetchPost,
	fetchPosts
} from "../../fetch/wordpress";
import getConfig from "next/config";
import { WpPost } from "../../components/wp-ui/wpTypes";
import { WpApiPost } from "@staticish/wp-api-to-static";

export function getEndpoint() {
	const config = getConfig();
	const endpoint =
		config && config.serverRuntimeConfig
			? config.serverRuntimeConfig.endpoint
			: "http://localhost:3100/wp-json";
	return endpoint;
}
export default async function(req: NextApiRequest, res: NextApiResponse) {
	const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
	const authorId = req.query.author
		? parseInt(req.query.author as string, 10)
		: undefined;
	const slug = req.query.slug ? req.query.slug : undefined;

	const endpoint = getEndpoint();

	let posts: Array<WpPost> = [];

	if (slug) {
		posts = await fetchPost(slug as string, endpoint).then((r: WpApiPost) =>
			collectPosts([r], endpoint)
		);
	} else if (authorId) {
		posts = await fetchPostsByAuthorId(
			endpoint,
			authorId,
			page
		).then((r: Array<WpApiPost>) => collectPosts(r, endpoint));
	} else {
		posts = await fetchPosts(endpoint, page).then((r: Array<WpApiPost>) =>
			collectPosts(r, endpoint)
		);
	}

	res.status(posts.length ? 200 : 404);
	res.json(posts);
	res.end();
}
