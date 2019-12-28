import postsHandler from "../pages/api/posts";
import postHandler from "../pages/api/posts/[id]";
import {
	fetchPostsByAuthorId,
	fetchPosts,
	fetchPostById
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
		expect(post1.hasOwnProperty("code")).toBe(false);

		expect(post.hasOwnProperty("code")).toBe(true);
		const res = new Response();
		await postHandler(req, res);
		expect(res.getStatusCode()).toBe(404);
	});
});
