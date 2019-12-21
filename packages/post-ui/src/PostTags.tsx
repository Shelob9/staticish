import React from "react";
import { tag } from './types';

/**
 * Display one tag from a post
 * @param props 
 */
export function PostTag(props: {
    tag: tag;
    tw?: string;
}) {
    const { tag, tw } = props;
    return (
        <span className={tw ? tw : "inline-block bg-black text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700"} >
            {tag.label}
        </span>
    );
}

/**
 * Displays a list of post/ status tags
 * 
 * @param props 
 */
export default function (props: {
    tags: Array<tag>;
    tw?: string;
}) {
    const { tags, tw } = props;
    return (
        <div className={tw ? tw : ""}>
            {tags.map(
                (t: tag) => (
                    <PostTag tag={t} key={t.slug} />
                ))}
        </div>
    );
}
