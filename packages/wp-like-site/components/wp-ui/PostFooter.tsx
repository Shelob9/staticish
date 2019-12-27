import React from 'react';
import PostTags from './PostTags';
import Footer from './Primative/Footer';
import { PostAuthor } from './types';
import { WpPost } from './wpTypes';
function AuthorImage(props: { author: PostAuthor; tw?: string }) {
  const { author, tw } = props;
  const { src, alt } = author.avatar;
  return (
    <img
      className={tw ? tw : 'w-10 h-10 rounded-full mr-4'}
      src={src}
      alt={alt}
    />
  );
}

/**
 * The footer of a post with its meta information
 *
 * @param props
 */
export default function PostFooter(props: { post: WpPost }) {
  const { tags, author, published } = props.post;
  return (
    <Footer tw={'flex items-center bg-gray-300 pl-4 pr-4'}>
      {tags && <PostTags tags={tags} />}
      <AuthorImage author={author} />
      <div className="text-sm">
        <p className="text-gray-900 ">{author.name}</p>
        <p className="text-gray-600">{published}</p>
      </div>
    </Footer>
  );
}
