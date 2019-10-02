
import postsToStatic, {
    contentArgs,
    filePathArgs,
    wpToStaticReturn
} from './postsToStatic';
const superagent = require('superagent');


const getTotal = async (postType:string,apiUrl:string): Promise<{total:number,perPage:number}> => {
    return new Promise( (resolve,reject) => {
      return superagent
      .get(`${apiUrl}/wp/v2/${postType}` )
      .set('accept', 'json')
      .end((err: Error, res: {
        headers: {
          'x-wp-total': number
          'x-wp-totalpages': number
        }
      }) => {
        if( err) {
            reject(err);
        }
        resolve({total:res.headers['x-wp-totalpages'],perPage:res.headers['x-wp-total']});
      });
    })

};

const getTotals = async (apiUrl:string) : Promise<{totalPosts:number,totalPages:number,perPage:number}> => {
  return new Promise( (resolve,reject) => {
      Promise.all( [
        getTotal('posts',apiUrl),
        getTotal('pages',apiUrl)
      ]).then( (r: Array<{total:number,perPage:number}>) => {
          resolve({
            totalPosts: r[0].total,
            totalPages: r[1].total,
            perPage: r[0].perPage
          })
      }).catch( e => reject(e));
  });
};

async function wpToStatic(
    apiUrl: string,
    filePathArgs:filePathArgs
) : Promise<Array<Array<wpToStaticReturn>>>  {
    return new Promise( async (resolve,reject) => {
        const totals = await getTotals(apiUrl);
        const {totalPosts,totalPages,perPage} = totals;
        const promises : Array<Promise<Array<wpToStaticReturn>>> = [];
        const makeContentArgs = (args: {postType:string,perPage:number,page:number}) : contentArgs => {
            return {
            ...args,
            endpoint: apiUrl,
            perPage: 10,
            }
        };
        for( let postsPage :number = 1; postsPage <= totalPosts; postsPage ++ ){
            promises.push(postsToStatic( makeContentArgs({
                postType: 'post',
                perPage,
                page: postsPage
            }),filePathArgs));
        }
        for( let pagePage :number = 1; pagePage <= totalPages; pagePage ++ ){
            promises.push(postsToStatic( makeContentArgs({
                postType: 'page',
                perPage,
                page: pagePage
            }),filePathArgs));
        }
        Promise
            .all(promises)
            .then( (results: Array<Array<wpToStaticReturn>>) => {
                resolve(results);
            })
            .catch( (error: Error ) => reject(error) );

    });
     
}

export {
  postsToStatic,
  wpToStatic
};
