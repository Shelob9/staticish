import { NextApiRequest, NextApiResponse } from "next";
const WPAPI = require("wpapi");

import { Post } from "../../wp-api/wpTypes";
export type contentArgs = {
	endpoint: String;
	perPage: Number;
	page: Number;
	postType: string;
};
export const getWpPosts = async (args: contentArgs): Promise<Array<Post>> => {
	const { endpoint, perPage } = args;
	const page = args.page ? args.page : 1;
	const postType = args.postType ? args.postType : "post";
	let wp = new WPAPI({ endpoint: endpoint });
	return new Promise((resolve, reject) => {
		switch (postType) {
			case "page":
				wp = wp.pages();
				break;
			default:
				wp = wp.posts();
				break;
		}

		wp.perPage(perPage)
			.page(page)
			.get(function(err: Error, data: Array<Post>) {
				if (err) {
					reject(err);
				}

				resolve(data);
			});
	});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const page = req.query.page ? (req.query.page as string) : "1";

	const perPage = 10;
	const postType = "post";
	const posts = await getWpPosts({
		endpoint: "http://calderaforms.com/wp-json",
		page,
		postType,
		perPage
	});

	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;
	res.end(JSON.stringify(posts));
};
