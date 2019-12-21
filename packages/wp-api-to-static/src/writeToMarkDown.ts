import { WpApiPost } from './wpTypes';
import { writeReturn } from './postsToStatic';
import htmlToMarkdown from './htmlToMarkdown';
import { filePath } from './writeUtil';

const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Front matter for posts saved as markdown by this system
 */
type postFrontMatter = {
  title: String;
  slug: String;
  date: String;
  modified: String;
  excerpt: String;
};

/**
 * Create front matter from a post.
 *
 * @param post
 */
function postToFrontMatterObject(post: WpApiPost): postFrontMatter {
  return {
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    modified: post.modified,
    excerpt: post.excerpt.rendered,
  };
}

/**
 * Write a WordPress post to markdown
 *
 * @param post
 * @param markdownPath
 */
export default async function writeToMarkDown(
  post: WpApiPost,
  markdownPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(post, markdownPath, 'md');
    try {
      let html = await htmlToMarkdown(post.content.rendered);
      html =
        '---' +
        '\n' +
        `${yaml.safeDump(postToFrontMatterObject(post), { indent: 4 })}` +
        '---' +
        '\n\n' +
        html;
      await fs.writeFileSync(path, html);
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
