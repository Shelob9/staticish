import React from "react";
import PostTags from "./PostTags";
import Footer from "./Primative/Footer";
import { WpPost } from "./wpTypes";
import { AuthorImage } from "./Author";

/**
 * The footer of a post with its meta information
 *
 * @param props
 */
export default function PostFooter(props: { post: WpPost }) {
	const { tags, author, published } = props.post;
	return (
		<Footer tw={"flex items-center bg-gray-300 pl-4 pr-4"}>
			{tags && <PostTags tags={tags} />}
			<AuthorImage author={author} />
			<div className="text-sm">
				<p className="text-gray-900 ">{author.name}</p>
				<p className="text-gray-600">{published}</p>
			</div>
		</Footer>
	);
}
