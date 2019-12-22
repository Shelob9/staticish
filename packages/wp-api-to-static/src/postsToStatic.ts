import { getWpPosts, getWpMediaItem, getWpUser } from './wp-api';
import writePostToJSON, {
  writeUserToJSON,
  writeMediaToJSON,
} from './writeToJson';
import { WpApiPost } from './wpTypes';
import writePostToMarkDown, {
  writeUserToMarkDown,
  writeMediaToMarkDown,
} from './writeToMarkDown';

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

async function userToStatic(
  id: number,
  filePaths: filePathArgs,
  endpoint: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const { markdownPath, wpJsonPath } = filePaths;
    const user = await getWpUser({ endpoint, id });
    Promise.all([
      writeUserToJSON(user, wpJsonPath),
      writeUserToMarkDown(user, markdownPath),
    ])
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
}

async function mediaToStatic(
  id: number | undefined,
  filePaths: filePathArgs,
  endpoint: string
): Promise<boolean> {
  if (!id || id === undefined) {
    return new Promise(async resolve => {
      resolve(true);
    });
  }

  return new Promise(async (resolve, reject) => {
    const { markdownPath, wpJsonPath } = filePaths;
    const media = await getWpMediaItem({ endpoint, id: id as number });
    Promise.all([
      writeMediaToJSON(media, wpJsonPath),
      writeMediaToMarkDown(media, markdownPath),
    ])
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
}

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
      writePostToJSON(post, wpJsonPath),
      writePostToMarkDown(post, markdownPath),
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
  const { endpoint } = contentArgs;
  const posts = await getWpPosts(contentArgs);
  return new Promise((resolve, reject) => {
    Promise.all(
      posts.map(async (post: WpApiPost) => {
        const rData = postToStatic(post, filePaths);
        await Promise.all([
          mediaToStatic(post.featured_media, filePaths, endpoint),
          userToStatic(post.author, filePaths, endpoint),
        ]);
        return rData;
      })
    )
      .then((results: Array<wpToStaticReturn>) => {
        resolve(results);
      })
      .catch((error: Error) => reject(error));
  });
}
