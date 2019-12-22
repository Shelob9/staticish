import { WpApiPost } from 'wpTypes';

function stripTrailingSlash(str: string): string {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
}
/**
 * Find the file for content
 *
 * @param post The post we are getting file path for
 * @param directoryPath The directory static export type json|markdown is stored in
 * @param extension The file extension
 */
export const filePath = (
  post: WpApiPost,
  directoryPath: string,
  extension: String
): string => {
  return `${stripTrailingSlash(directoryPath)}/${post.type}/${
    'md' === extension ? post.slug : post.id
  }.${extension}`;
};
