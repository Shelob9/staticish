import React from "react";

/**
 * Display a post's excerpt
 * 
 * @param props 
 */
export default function PostExcerpt(props: {
    excerpt: string;
    tw?: string;
}) {
    const { excerpt, tw } = props;

    function createMarkup() {
        return { __html: excerpt };
    }

    return (
        <div
            className={tw ? tw : "text-gray-700 text-base"}
            dangerouslySetInnerHTML={createMarkup()}
        />
    );
}
