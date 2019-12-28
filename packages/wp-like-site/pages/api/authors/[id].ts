import { NextApiRequest, NextApiResponse } from "next";
import { getEndpoint } from "../posts";
import {
	fetchAuthor,
	fetchPostsByAuthorId,
	collectPosts
} from "../../../fetch/wordpress";
import { authorFromWpApi } from "../../../components/wp-ui/factories/wpFactory";
import { WpApiPost } from "@staticish/wp-api-to-static";
export default async function(req: NextApiRequest, res: NextApiResponse) {
	const endpoint = getEndpoint();
	//@ts-ignore
	const id: number = req.query.id;
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const author = await fetchAuthor(id, endpoint);
	if (author.hasOwnProperty("code")) {
		res.status(404);
		res.json({
			posts: [],
			//@ts-ignore
			message: author.hasOwnProperty("message") ? author.message : "Not Found"
		});
	} else {
		const posts = await fetchPostsByAuthorId(
			endpoint,
			id,
			page
		).then((r: Array<WpApiPost>) => collectPosts(r, endpoint));
		res.status(200);
		res.json({
			author: authorFromWpApi(author),
			posts
		});
	}

	res.end();
}
