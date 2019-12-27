// next.config.js
const withCSS = require("@zeit/next-css");
const endpoint = "http://localhost:3100/wp-json";
module.exports = {
	...{
		serverRuntimeConfig: {
			endpoint
		},
		publicRuntimeConfig: {
			endpoint
		}
	},
	...withCSS()
};
