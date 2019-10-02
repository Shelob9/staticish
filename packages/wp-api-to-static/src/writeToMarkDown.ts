const fs = require('fs');
import {Post} from './wpTypes'
import {writeReturn} from './postsToStatic';

function filePath(post: Post, path: String, extension: String) {
    return `${path.replace(/\/$/, '')}/${post.type}/${
      'md' === extension ? post.slug : post.id
    }.${extension}`;
  }
    
  
  type postFrontMatter = {
    title: String,
    slug: String,
  }
  function postToFrontMatterObject(post: Post ): postFrontMatter{
    return {
      title: post.title.rendered,
      slug: post.slug
    }
  }


  export default async function writeToMarkDown(
    post: Post,
    markdownPath: string
  ): Promise<writeReturn> {
    const htmlToMarkdown = require('./htmlToMarkdown');
    const yaml = require('js-yaml');
    
  
    return new Promise(async (resolve, reject) => {
      const path = filePath(post, markdownPath, 'md');
      try {
        let html = await htmlToMarkdown(post.content.rendered);
        html = '---' + "\n" + `${yaml.safeDump(postToFrontMatterObject(post),{indent: 4})}` + '---' + "\n\n" + html;
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