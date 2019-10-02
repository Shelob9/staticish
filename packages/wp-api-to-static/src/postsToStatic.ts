const fs = require('fs');
import getWpPosts from './getWpPosts';
import writeToJSON from  './writeToJson';

export interface Post {
  content: {
    rendered: String;
  };
  title: {
    rendered: String;
  };
  slug: String;
  link: String;
  id: Number;
  type: String;
}

type contentArgs = {
  endpoint: String;
  perPage: Number;
  page: Number;
  postType: string;
};

type writeReturn = {
  path: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};

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
async function writeToMarkDown(
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



type wpToStaticReturn = {
  markdownPath: String;
  jsonPath: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};

type filePathArgs = {
  wpJsonPath: string;
  markdownPath: string;
};

async function postToStatic( post:Post,   filePaths: filePathArgs  ) : Promise<wpToStaticReturn>{
  const { wpJsonPath, markdownPath } = filePaths;
    return new Promise( (resolve,reject)  => {
        Promise.all([
           writeToJSON(post, wpJsonPath),
           writeToMarkDown(post,markdownPath)
        ]).then( (results: Array<writeReturn>) => {
            resolve({
              markdownPath: results[1].path,
              jsonPath: results[0].path,
              id: post.id,
              slug: post.slug,
              type: post.type,
              title: post.title.rendered
            });
        }).catch( (error: Error) => reject(error) );
    });
}



export default async function postsToStatic(
  contentArgs: contentArgs,
  filePaths: filePathArgs
): Promise<Array<wpToStaticReturn>> {
    const posts = await getWpPosts(contentArgs);
    return new Promise( (resolve,reject)  => {
        Promise.all(posts.map( (post: Post) => {
            return postToStatic(post,filePaths);
        })).then( (results: Array<wpToStaticReturn>) => {
            resolve(results)
        }).catch( (error: Error) => reject(error) );
    }); 
}


