import React from "react";
import Article from "./Primative/Article";
import PostFooter from "./PostFooter";
import PostExcerpt from "./PostExcerpt";
import PostHeader from "./PostHeader";
import { WpPost } from "./wpTypes";
import { Image } from "./types";

/**
 * Show a preview of a post with zoomable featured image
 *
 * @param props
 */
export default function(props: { post: WpPost; tw?: string; link: string }) {
	const { post, tw, link } = props;
	const { title, excerpt } = post;
	const featured: Image = post.featured
		? post.featured
		: {
				src: "http://placekitten.com/1280/640",
				alt: "A cat"
		  };
	return (
		<Article
			tw={tw ? tw : "w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"}
		>
			<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
				<img
					src={featured.src}
					alt={featured.alt}
					className="h-64 w-full rounded-t pb-6"
				/>
				<PostHeader
					tw={"w-full font-bold text-xl text-gray-900 px-6"}
					title={title.rendered}
					level={2}
				/>

				<PostExcerpt
					excerpt={excerpt.rendered}
					tw={"w-full text-gray-600 text-xs md:text-sm px-6"}
				/>
				<PostFooter post={post} />
				<button className="max-w-lg mx-auto  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
					<a href={link}>Read More</a>
				</button>
			</div>
		</Article>
	);
}
