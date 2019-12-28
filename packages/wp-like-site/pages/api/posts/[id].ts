import { NextApiRequest, NextApiResponse } from "next";
import {
	collectPost,
	fetchPostById,
	collectPosts
} from "../../../fetch/wordpress";
import { getEndpoint } from "../posts";
import { WpApiPost } from "@staticish/wp-api-to-static";
import { WpPost } from "../../../components/wp-ui/wpTypes";
type WpApiError = { code: string; message: string; data: { status: number } };
export default async function(req: NextApiResponse, res: NextApiResponse) {
	const endpoint = getEndpoint();
	//@ts-ignore
	const id: number = req.query.id;
	const post = await fetchPostById(id, endpoint);
	if (post.hasOwnProperty("code")) {
		res.status(404);
	} else {
		res.status(200);
		const wpPost = await collectPost(post, endpoint);
		res.json(wpPost);
	}

	res.end();
}
