import React from "react";

import { PostAuthor } from "./types";
import { WpAuthor } from "./wpTypes";
export function AuthorImage(props: { author: PostAuthor; tw?: string }) {
	const { author, tw } = props;
	const { src, alt } = author.avatar;
	return (
		<img
			className={tw ? tw : "w-10 h-10 rounded-full mr-4"}
			src={src}
			alt={alt}
		/>
	);
}

/**
 * The footer of a post with its meta information
 *
 * @param props
 */
export default function Author(props: { author: WpAuthor }) {
	const { author } = props;
	return (
		<div className={"flex items-center bg-gray-300 pl-4 pr-4"}>
			<AuthorImage author={author} />
			<div className="text-sm">
				<p className="text-gray-900 ">{author.name}</p>
			</div>
		</div>
	);
}
