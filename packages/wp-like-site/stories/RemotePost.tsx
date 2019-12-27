import * as React from "react";
import { storiesOf } from "@storybook/react";
import RemotePost, { getRemotePost } from "../components/RemotePost";

const stories = storiesOf("WordPress Blog Post", module);
const endpoint = "http://localhost:3100/wp-json";
const Post = () => {
	const [slug] = React.useState("cats");
	const [post, setPost] = React.useState();
	React.useEffect(() => {
		getRemotePost(slug, endpoint).then(r => setPost(r.wpLikePost));
	}, [slug, setPost]);
	if (post) {
		return <RemotePost wpLikePost={post} endpoint={endpoint} />;
	}
	return <div>Spinner</div>;
};
stories.add("RemotePost", () => <Post />);
