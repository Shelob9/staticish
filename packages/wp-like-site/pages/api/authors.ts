import { NextApiRequest, NextApiResponse } from "next";
import { getEndpoint } from "./posts";
import { fetchUsers, fetchUserBySlug } from "../../fetch/wordpress";
import { WpApiUser } from "@staticish/wp-api-to-static";
import { authorFromWpApi } from "../../components/wp-ui/factories/wpFactory";
import { WpAuthor } from "../../components/wp-ui/wpTypes";
export default async function(req: NextApiRequest, res: NextApiResponse) {
	const endpoint = getEndpoint();
	const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
	const slug = req.query.slug ? req.query.slug : undefined;
	let authors: Array<WpAuthor> = [];
	if (slug) {
		authors = await fetchUserBySlug(
			endpoint,
			slug as string
		).then((r: WpApiUser) => [authorFromWpApi(r)]);
	} else {
		authors = await fetchUsers(endpoint, page).then((r: Array<WpApiUser>) =>
			r.map((a: WpApiUser) => authorFromWpApi(a))
		);
	}

	res.status(authors.length ? 200 : 404);
	res.json(authors);
	res.end();
}
