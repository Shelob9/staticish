import React from "react";
//import { getWpPost } from "@staticish/wp-api-to-static";

import { withRouter } from "next/router";

//@ts-ignore
function Post({ router }) {
	console.log(router);
	return <p>{router.pathname}</p>;
}

export default withRouter(Post);
