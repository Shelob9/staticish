import React, { Fragment } from "react";
import Article from "./Primative/Article";
import Footer from "./Primative/Footer";
import PostTags from "./PostTags";
import PostContent, { renderPropForContent } from "./PostContent";
import FeaturedImage, { renderFeaturedImage } from "./FeaturedImage";
import PostHeader from "./PostHeader";
import { PostAuthor, Image } from "./types";
import { WpPost, WpAuthor } from "./wpTypes";
import Author from "./Author";

//Copypasta!
const addAuthorLink = (author: WpAuthor) => {
	return {
		...author,
		link: {
			href: `/authors/${author.slug}`,
			text: `Read More`,
			title: `All Posts By ${author.name}`
		}
	};
};

function PostTitle(props: { title: string }) {
	return (
		<PostHeader
			level={1}
			tw="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl"
			title={props.title}
		/>
	);
}

/**
 * Props for the "renderTitle" render prop.
 */
export type renderTitleProps = {
	title: string;
	post: WpPost;
};
type renderPropForTitle = (props: renderTitleProps) => JSX.Element;

export function PostTop(props: {
	post: WpPost;
	renderTitle?: (props: renderTitleProps) => JSX.Element;
	editMode?: boolean;
	onClickSettings?: () => void;
	renderBelowTitle?: () => JSX.Element;
	renderFeatured?: renderFeaturedImage;
}) {
	const { post, onClickSettings, renderFeatured } = props;
	const { title, published } = post;
	const featured: Image = post.featured
		? post.featured
		: {
				src: "http://placekitten.com/1280/640",
				alt: "A cat"
		  };
	return (
		<Fragment>
			<FeaturedImage featured={featured} renderFeatured={renderFeatured} />
			<div
				className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
				style={{ fontFamily: "Georgia,serif" }}
			>
				<div className="font-sans">
					<div className="text-base md:text-sm text-teal-500 font-bold inline-block">
						<span>
							{props.renderTitle ? (
								props.renderTitle({
									title: title.rendered,
									post
								})
							) : (
								<PostTitle title={title.rendered} />
							)}
							{props.renderBelowTitle ? (
								React.createElement(props.renderBelowTitle, {
									post
								})
							) : (
								<p className="text-sm md:text-base font-normal text-gray-600">
									Published {published}
								</p>
							)}
						</span>
					</div>
					{onClickSettings && (
						<div className={"inline-block"}>
							<button onClick={onClickSettings}>Settings</button>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}
export default function(props: {
	post: WpPost;
	renderTitle?: renderPropForTitle;
	renderContent?: renderPropForContent;
	onClickSettings?: () => void;
	renderBelowTitle?: () => JSX.Element;
	renderFeatured?: renderFeaturedImage;
}) {
	const {
		post,
		renderTitle,
		renderContent,
		onClickSettings,
		renderBelowTitle,
		renderFeatured
	} = props;
	const { tags, author, content } = post;
	return (
		<Article tw="container w-full md:max-w-3xl mx-auto pt-20">
			<hr className="border-b-2 border-gray-400 mb-8 mx-4" />
			<PostTop
				post={props.post}
				renderTitle={renderTitle}
				onClickSettings={onClickSettings}
				renderBelowTitle={renderBelowTitle}
				renderFeatured={renderFeatured}
			/>
			<PostContent content={content.rendered} renderContent={renderContent} />
			<Footer>
				{undefined !== tags && tags.length && (
					<div className="text-base md:text-sm text-gray-500 px-4 py-6">
						<PostTags tags={tags} />
					</div>
				)}
				<Author author={addAuthorLink(author)} />
			</Footer>
		</Article>
	);
}
