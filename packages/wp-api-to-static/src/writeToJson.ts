const fs = require('fs');
import { WpApiPost } from './wpTypes';
import { writeReturn } from './postsToStatic';
import { filePath } from './writeUtil';

/**
 * Write a WordPress post to JSON
 *
 * @param post
 * @param wpJsonPath
 */
export default async function writeToJSON(
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
