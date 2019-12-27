import React from "react";

/**
 * An "article" element
 * 
 * @param props 
 */
export default function (props: { tw?: string, children: any }) {
    const {
        children,
        tw
    } = props;
    return (
        <article
            className={tw ? tw : "max-w-sm rounded overflow-hidden shadow-lg bg-gray-200"}
        >
            {children}
        </article>
    );
}
