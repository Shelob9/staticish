import { PostAuthor, Image, tag } from './types';
import { ContentObject } from '@staticish/wp-api-to-static';

/**
 * Content like title, exceprt, content.
 *
 */
export type renderableContent = {
  rendered: string;
};

/**
 * A WordPress-like post.
 */
export interface WpPost {
  id: string;
  slug: string;
  title: ContentObject;
  content: ContentObject;
  excerpt: ContentObject;
  published: string;
  featured: Image;
  author: PostAuthor;
  tags?: Array<tag>;
}

export interface WpAuthor extends PostAuthor {}

export interface WpMedia extends Image {}

export interface WpTag {}
