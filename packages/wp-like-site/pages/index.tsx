import * as React from "react";
import "../styles/index.css";
import Home from "../components/Sample";
import { Box } from "@staticish/post-ui";
export default () => (
	<Box
		className="
      flex
      flex-col
      column
      justify-center 
      bg-blue-darkest 
      h-screen 
      items-center 
      text-white
    "
	>
		<Home message="nextjs-typescript-tailwindcss-starter" />
	</Box>
);
