import getWpPosts from './wp-api/getWpPosts';
import writeToJSON from './writeToJson';
import { WpApiPost } from './wpTypes';
import writeToMarkDown from './writeToMarkDown';

/**
 * Arguments for writing content
 */
export type contentArgs = {
  endpoint: string;
  perPage: number;
  page: number;
  //Post type or content type being stored
  postType: string;
};

/**
 * Object returned after writing a bit of content
 */
export type writeReturn = {
  path: string;
  id: number;
  slug: string;
  type: string;
  title: string;
};

/**
 *
 */
export type wpToStaticReturn = {
  markdownPath: string;
  jsonPath: string;
  id: number;
  slug: string;
  type: string;
  title: string;
};

/**
 * Arguments for base paths for writing static content to
 */
export type filePathArgs = {
  //Directory to write JSON files
  wpJsonPath: string;
  // Directory to write markdown files
  markdownPath: string;
};

/**
 * Convert one post to static
 *
 * @param post
 * @param filePaths
 */
async function postToStatic(
  post: WpApiPost,
  filePaths: filePathArgs
): Promise<wpToStaticReturn> {
  const { wpJsonPath, markdownPath } = filePaths;
  return new Promise((resolve, reject) => {
    Promise.all([
      writeToJSON(post, wpJsonPath),
      writeToMarkDown(post, markdownPath),
    ])
      .then((results: Array<writeReturn>) => {
        resolve({
          markdownPath: results[1].path,
          jsonPath: results[0].path,
          id: post.id,
          slug: post.slug,
          type: post.type,
          title: post.title.rendered,
        });
      })
      .catch((error: Error) => reject(error));
  });
}

/**
 * Convert all posts of a post type on a WordPress site to static
 *
 * @param contentArgs
 * @param filePaths
 */
export default async function postsToStatic(
  contentArgs: contentArgs,
  filePaths: filePathArgs
): Promise<Array<wpToStaticReturn>> {
  const posts = await getWpPosts(contentArgs);
  return new Promise((resolve, reject) => {
    Promise.all(
      posts.map((post: WpApiPost) => {
        return postToStatic(post, filePaths);
      })
    )
      .then((results: Array<wpToStaticReturn>) => {
        resolve(results);
      })
      .catch((error: Error) => reject(error));
  });
}
