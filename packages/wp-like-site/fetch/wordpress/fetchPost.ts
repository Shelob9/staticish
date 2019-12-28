import { WpApiPost } from "@staticish/wp-api-to-static";
import fetch from "isomorphic-unfetch";

/**
 * Fetch a post from a WordPress site
 *
 * @param slug
 * @param endpoint
 */
export const fetchPost = async (
	slug: string,
	endpoint: string,
	postType: string = "post"
): Promise<WpApiPost> => {
	postType = "post" === postType ? "posts" : postType;
	return fetch(`${endpoint}/wp/v2/${postType}?slug=${slug}`)
		.then(r => r.json())
		.then((r: Array<WpApiPost>) => r[0]);
};

export const fetchPostsByAuthorId = async (
	endpoint: string,
	authorId: number,
	page: number = 1,
	postType: string = "post"
): Promise<Array<WpApiPost>> => {
	postType = "post" === postType ? "posts" : postType;
	return fetch(
		`${endpoint}/wp/v2/${postType}?author=${authorId}&page=${page}`
	).then(r => r.json());
};

/**
 * Fetch a page of posts from a WordPress site
 *
 * @param slug
 * @param endpoint
 */
export const fetchPosts = async (
	endpoint: string,
	page: number = 1,
	postType: string = "post"
): Promise<Array<WpApiPost>> => {
	postType = "post" === postType ? "posts" : postType;
	return fetch(`${endpoint}/wp/v2/${postType}?page=${page}`).then(r =>
		r.json()
	);
};
