import React from 'react';

import { Post } from '@staticish/wp-api-to-static/';

export default function BlogPostPreview(props: { post: Post }) {
  const { post } = props;
  function createContent() {
    return { __html: post.excerpt.rendered };
  }

  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <div dangerouslySetInnerHTML={createContent()} />
    </div>
  );
}
