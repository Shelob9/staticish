import React from 'react';
import BlogPost from './BlogPost';
import BlogPostPreview from './BlogPostPreview';
import wpFactory from './factories/wpFactory';
import {
  rawHtmlToBlocks,
  renderFromRawBlocks,
} from './factories/blocksToContent';
const Box = (props: { children: JSX.Element; className?: string }) => (
  <div className={props.className}>{props.children}</div>
);
export { wpFactoryGetters } from './factories/wpFactory';
export { PostAuthor, Image, tag, link } from './types';
export { WpPost, WpAuthor, WpMedia, WpTag } from './wpTypes';

export {
  BlogPost,
  BlogPostPreview,
  Box,
  rawHtmlToBlocks,
  renderFromRawBlocks,
  wpFactory,
};
