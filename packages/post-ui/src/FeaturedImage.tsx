import React from "react";
import { Image } from "./types";

export type renderFeaturedImage = (props: {
	featured: Image;
	tw?: string;
}) => JSX.Element;

export interface ImageComponentProps {
	featured: Image;
	tw?: string;
	renderFeatured?: renderFeaturedImage;
}
/**
 * Show a post's featured image
 *
 * @param props
 */
export default function FeaturedImage(props: ImageComponentProps) {
	const { featured, tw } = props;
	const { src, alt, height, width } = featured;
	if (props.renderFeatured) {
		return props.renderFeatured({ featured, tw });
	}
	return (
		<img
			className={props.tw ? props.tw : "w-full"}
			src={src}
			alt={alt}
			height={height}
			width={width}
		/>
	);
}
