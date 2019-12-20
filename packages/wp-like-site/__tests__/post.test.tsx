import { shallow } from "enzyme";
import React from "react";

import Post from "../pages/post";

describe("With Enzyme", () => {
	it("Renders a post", () => {
		const app = shallow(<Post />);
		expect(app.find("h2").text()).toEqual("A Quick Holiday Update!");
	});
});
