const fs = require('fs');
import { WpApiPost, WpApiMedia, WpApiTaxonomy, WpApiUser } from './wpTypes';
import { writeReturn } from './postsToStatic';
import { filePath, termFilePath, userFilePath } from './writeUtil';

/**
 * Write a user to JSON
 * @param media
 * @param wpJsonPath
 */
export async function writeUserToJSON(
  user: WpApiUser,
  wpJsonPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = userFilePath(user, wpJsonPath, 'json');
    try {
      await fs.writeFileSync(path, JSON.stringify(user));
      resolve({
        path,
        id: user.id,
        slug: user.slug,
        type: 'user',
        title: user.name,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Write a taxonmy term to JSON
 * @param term
 * @param wpJsonPath
 */
export async function writeTermToJSON(
  term: WpApiTaxonomy,
  wpJsonPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = termFilePath(term, wpJsonPath, 'json');
    try {
      await fs.writeFileSync(path, JSON.stringify(term));
      resolve({
        path,
        id: term.id,
        slug: term.slug,
        type: term.taxonomy,
        title: term.name,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Write a media item to JSON
 * @param media
 * @param wpJsonPath
 */
export async function writeMediaToJSON(
  media: WpApiMedia,
  wpJsonPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(media, wpJsonPath, 'json');
    try {
      await fs.writeFileSync(path, JSON.stringify(media));
      resolve({
        path,
        id: media.id,
        slug: media.slug,
        type: media.type,
        title: media.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Write a WordPress post to JSON
 *
 * @param post
 * @param wpJsonPath
 */
export default async function writePostToJSON(
  post: WpApiPost,
  wpJsonPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(post, wpJsonPath, 'json');
    try {
      await fs.writeFileSync(path, JSON.stringify(post));
      resolve({
        path,
        id: post.id,
        slug: post.slug,
        type: post.type,
        title: post.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}
