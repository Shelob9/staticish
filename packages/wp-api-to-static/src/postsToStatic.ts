import getWpPosts from './getWpPosts';
import writeToJSON from  './writeToJson';
import {Post} from './wpTypes'
import writeToMarkDown from './writeToMarkDown';
export type contentArgs = {
  endpoint: String;
  perPage: Number;
  page: Number;
  postType: string;
};

export type writeReturn = {
  path: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};


export type wpToStaticReturn = {
  markdownPath: String;
  jsonPath: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};

export type filePathArgs = {
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


