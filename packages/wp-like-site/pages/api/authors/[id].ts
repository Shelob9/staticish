import { NextApiRequest, NextApiResponse } from "next";
import { getEndpoint } from "../posts";
import { fetchAuthor } from "../../../fetch/wordpress";
import { WpApiUser } from "@staticish/wp-api-to-static";
import { authorFromWpApi } from "../../../components/wp-ui/factories/wpFactory";
export default async function(req: NextApiRequest, res: NextApiResponse) {
	const endpoint = getEndpoint();
	//@ts-ignore
	const id: number = req.query.id;
	const author = await fetchAuthor(id, endpoint);
	if (author.hasOwnProperty("code")) {
		res.status(404);
		res.json({
			//@ts-ignore
			message: author.hasOwnProperty("message") ? author.message : "Not Found"
		});
	} else {
		res.status(200);
		res.json(authorFromWpApi(author));
	}

	res.end();
}
