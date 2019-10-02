const fs = require('fs');
import {Post} from './wpTypes';
import {writeReturn} from './postsToStatic';
function filePath(post: Post, path: String, extension: String) {
  return `${path.replace(/\/$/, '')}/${post.type}/${
    'md' === extension ? post.slug : post.id
  }.${extension}`;
}

export default async function writeToJSON(
  post: Post,
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
