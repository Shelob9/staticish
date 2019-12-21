import { WpApiPost } from 'wpTypes';

/**
 * Find the file for content
 *
 * @param post The post we are getting file path for
 * @param path The root prefix for this path
 * @param extension The file extension
 */
export const filePath = (post: WpApiPost, path: String, extension: String) => {
  return `${path.replace(/\/$/, '')}/${post.type}/${
    'md' === extension ? post.slug : post.id
  }.${extension}`;
};
