import { NextApiRequest, NextApiResponse } from "next";
const WPAPI = require("wpapi");

import { Post } from "../../../wp-api/wpTypes";

export const getWpPost = async (args: {
	endpoint: string;
	id: number;
	postType: string;
}): Promise<Array<Post>> => {
	const { id, endpoint, postType } = args;
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

		wp.id(id).get(function(err: Error, data: Array<Post>) {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const id = req.query.id ? (req.query.id as string) : "1";

	const postType = "post";
	const post = await getWpPost({
		endpoint: "http://calderaforms.com/wp-json",
		postType,
		id
	});

	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;
	res.end(JSON.stringify(post));
};
