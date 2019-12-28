import React from "react";
import Link from "next/link";

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
export default function Author(props: { author: WpAuthor; hLevel?: number }) {
	const { author } = props;
	const hLevel = props.hLevel ? props.hLevel : 3;
	const { description } = author;
	return (
		<div className={"flex items-center bg-gray-300 pl-4 pr-4"}>
			<AuthorImage author={author} />
			<div>
				{React.createElement(
					`h${hLevel}`,
					{ className: "text-gray-900" },
					author.name
				)}
				{description && (
					<p className="text-gray-600 text-xs md:text-base">{description}</p>
				)}
				{author.link && (
					<p className="text-gray-900 ">
						<Link href={author.link.href}>
							<a title={author.link.title}>{author.link.text}</a>
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}
