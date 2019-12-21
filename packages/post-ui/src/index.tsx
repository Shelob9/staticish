import React from 'react';
import BlogPost from './BlogPost';
import BlogPostPreview from './BlogPostPreview';
const Box = (props: { children: JSX.Element; className?: string }) => (
  <div className={props.className}>{props.children}</div>
);
export { BlogPost, BlogPostPreview, Box };
