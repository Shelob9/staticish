import postsHandler from "../pages/api/posts";
import { fetchPostsByAuthorId, fetchPosts } from "../fetch/wordpress";
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
});
