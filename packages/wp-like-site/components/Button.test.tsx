import Button from "./Button";
import { shallow } from "enzyme";
import React from "react";
describe("With Enzyme", () => {
	it("Renders button", () => {
		const app = shallow(<Button>Button Text</Button>);
		expect(app.find("button").text()).toEqual("Button Text");
	});
});
