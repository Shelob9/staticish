import { NextApiRequest, NextApiResponse } from "next";
import { collectPost, fetchPostById } from "../../../fetch/wordpress";
import { getEndpoint } from "../posts";
export default async function(req: NextApiRequest, res: NextApiResponse) {
	const endpoint = getEndpoint();
	//@ts-ignore
	const id: number = req.query.id;
	const post = await fetchPostById(id, endpoint);
	if (post.hasOwnProperty("code")) {
		res.status(404);
		res.status(404);
		res.json({
			//@ts-ignore
			message: post.hasOwnProperty("message") ? post.message : "Not Found"
		});
	} else {
		res.status(200);
		const wpPost = await collectPost(post, endpoint);
		res.json(wpPost);
	}

	res.end();
}
