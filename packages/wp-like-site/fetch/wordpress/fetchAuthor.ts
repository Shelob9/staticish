import { WpApiUser } from "@staticish/wp-api-to-static";
import fetch from "isomorphic-unfetch";

/**
 * Get a page of users
 *
 * @param endpoint
 * @param page
 */
export const fetchUsers = async (
	endpoint: string,
	page: number = 1
): Promise<Array<WpApiUser>> => {
	return fetch(`${endpoint}/wp/v2/users?page=${page}`).then(r => r.json());
};

/**
 * Get one user
 *
 * @param userId
 * @param endpoint
 */
export const fetchUser = async (
	userId: number,
	endpoint: string
): Promise<WpApiUser> => {
	return fetch(`${endpoint}/wp/v2/users/${userId}`).then(r => r.json());
};

export const fetchAuthor = fetchUser;
