import { NextApiRequest, NextApiResponse } from "next";
import { getEndpoint } from "./posts";

export default function(req: NextApiRequest, res: NextApiResponse) {
	res.end();
}
