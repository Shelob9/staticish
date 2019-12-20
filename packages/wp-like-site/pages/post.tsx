import React, { Fragment } from "react";
import Head from "next/head";
import { Post } from "@staticish/wp-api-to-static";
import { BlogPostPreview } from "@staticish/post-ui";
import "../css/index.css";

export default function() {
	const post = {
		id: 168826,
		date: "2019-12-17T11:16:33",
		date_gmt: "2019-12-17T16:16:33",
		guid: { rendered: "https://calderaforms.com/?p=168826" },
		modified: "2019-12-17T11:51:49",
		modified_gmt: "2019-12-17T16:51:49",
		slug: "2019-holiday-update",
		status: "publish",
		type: "post",
		link: "https://calderaforms.com/2019/12/2019-holiday-update/",
		title: { rendered: "A Quick Holiday Update!" },
		content: {
			rendered: "\n<h2>Bug fixes as a present are kind of like getting",
			protected: false
		},
		excerpt: {
			rendered:
				'<p>Bug fixes as a present are kind of like getting socks for Christmas&#8230; not the most thrilling thing, but when you need socks&#8230; The holidays are often a different kind of time for teams. We want to keep moving all the things forward, but it&#8217;s also healthy to slow down and appreciate family, too. The &hellip; <a href="https://calderaforms.com/2019/12/2019-holiday-update/" class="more-link">Continue reading <span class="screen-reader-text">A Quick Holiday Update!</span></a></p>\n',
			protected: false
		},
		author: 62578,
		featured_media: 168887,
		comment_status: "open",
		ping_status: "open",
		sticky: false,
		template: "",
		format: "standard",
		categories: [174],
		tags: [],
		meta: {}
	};

	return (
		<Fragment>
			<Head>
				<title>Next.js + Jest + TypeScript</title>
			</Head>
			<BlogPostPreview post={post} />
		</Fragment>
	);
}
