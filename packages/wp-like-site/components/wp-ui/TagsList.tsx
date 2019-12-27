import React from "react";
import { tag } from "./types";
import { PostTag } from "./PostTags";

export default function(props: { tags: Array<tag>; tw?: string }) {
	const { tags, tw } = props;
	return (
		<div className={tw ? tw : ""}>
			{tags.map((t: tag) => (
				<PostTag tag={t} key={t.slug} />
			))}
		</div>
	);
}
