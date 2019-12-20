import React from 'react';

import { Post } from '@staticish/wp-api-to-static/';

export default function BlogPost(props: { post: Post }) {
  const { post } = props;
  function createContent() {
    return { __html: post.content.rendered };
  }

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={createContent()} />
    </div>
  );
}
