import postsHandler from "../pages/api/posts";
import postHandler from "../pages/api/posts/[id]";
import authorsHandler from "../pages/api/authors";
import authorHandler from "../pages/api/authors/[id]";

import {
	fetchPostsByAuthorId,
	fetchPosts,
	fetchPostById,
	fetchUser,
	fetchUsers,
	fetchUserBySlug
} from "../fetch/wordpress";
const endpoint = "http://localhost:3100/wp-json";
class Response {
	statusCode;
	theJson;
	status(code) {
		this.statusCode = code;
	}

	getStatusCode() {
		return this.statusCode;
	}

	json(json) {
		this.theJson = json;
	}

	getTheJson() {
		return this.theJson;
	}
	end() {}
}
describe("/api/posts handler", () => {
	test("Can get a page of posts", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			page: 1
		};

		const res = new Response();
		const postsShouldBe = await fetchPosts(endpoint, 1);
		await postsHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().length).toBe(postsShouldBe.length);
	});

	test("Gets a post by slug", async () => {
		const post = await fetchPostById(endpoint, 1);
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			slug: post.slug
		};
		const res = new Response();
		await postsHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().length).toBe(1);
		expect(res.getTheJson().title.rendered).toBe(post.title.rendered);
	});

	test("Query by author", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			page: 1,
			author: 2
		};
		const authorPosts = await fetchPostsByAuthorId(endpoint, 2);
		const res = new Response();
		await postsHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().length).toBe(authorPosts.length);
	});

	test("Get single post", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			id: 1
		};
		const post = await fetchPostById(1, endpoint);
		const res = new Response();
		await postHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().title.rendered).toBe(post.title.rendered);
	});

	test("Gets 404 for non-existant post", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			id: 2
		};
		const post1 = await fetchPostById(1, endpoint);

		const post = await fetchPostById(2, endpoint);

		//This is the logic the 404 vs 200 depends on internally
		expect(post1.hasOwnProperty("code")).toBe(false);
		expect(post.hasOwnProperty("code")).toBe(true);
		const res = new Response();
		await postHandler(req, res);
		expect(res.getStatusCode()).toBe(404);
		expect(res.getTheJson().hasOwnProperty("message")).toBe(true);
	});
});

describe("/api/authors handler", () => {
	test("GET authors", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			page: 1
		};

		const res = new Response();
		const authorsShouldBe = await fetchUsers(endpoint, 1);
		await authorsHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().length).toBe(authorsShouldBe.length);
	});
	test("GET author", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			id: 1
		};

		const res = new Response();
		const authorsShouldBe = await fetchUser(1, endpoint);
		await authorHandler(req, res);
		expect(res.getStatusCode()).toBe(200);
		expect(res.getTheJson().name).toBe(authorsShouldBe.name);
	});
	test("404 when GET by author", async () => {
		let req = {};
		req.cookies = {};
		req.body = {};
		req.query = {
			id: 90000
		};

		const res = new Response();
		await authorHandler(req, res);
		expect(res.getStatusCode()).toBe(404);
		expect(res.getTheJson().hasOwnProperty("message")).toBe(true);
	});
});
