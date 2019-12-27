import React from "react";

/**
 * An "footer" element
 * 
 * @param props 
 */
export default function (props: { tw?: string, children: any }) {
    const {
        children,
        tw
    } = props;
    return <footer className={tw ? tw : "px-6 py-4"}>{children}</footer>;
}
