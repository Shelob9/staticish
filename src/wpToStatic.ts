const WPAPI = require( 'wpapi' );
const fs = require('fs');
export interface Post {
    content: {
        rendered: String
    },
    title: {
        rendered: String
    },
    slug: String,
    link: String
    id: Number,
    type: String
};

type contentArgs = {
    endpoint: String,
    perPage: Number,
    page: Number,
    postType: string
};


//REMOVE THIS USELESS ABSTRACTION
async function getContent(args: contentArgs) : Promise<Array<Post>>{
    const {
        endpoint,
        perPage,
    } = args;
    const page = args.page ? args.page : 1;
    const postType = args.postType ? args.postType  : 'post';
    let wp = new WPAPI({ endpoint: endpoint});
    return new Promise( (resolve,reject) => {

        switch( postType ){
            case 'page':
               wp = wp.pages();
                break;
            default:
                wp = wp.posts();
                break;
        }
        
            wp.
            perPage( perPage )
            .page( page )
        
            .get(function(  err: Error, data: Array<Post> ) {
            if ( err ) {
                reject( err );
            }
        
            resolve(data);

        });
    });
}

type savedFilePath = {path:String};

async function writeToJSON(post: Post,wpJsonPath: string ) : Promise<savedFilePath>{
    function jsonStaticFilePath( post: Post,wpJsonPath: string){
        return `${wpJsonPath.replace(/\/$/, "")}/${post.type}/${post.id}.json`
    }

    return new Promise( async (resolve,reject) => {
        const path = jsonStaticFilePath(post,wpJsonPath);
        try{
            await fs.writeFileSync( path,JSON.stringify(post));
            resolve({
                path
            });
        }catch(error){
            reject(error);
        }
    });
}

async function getWpPosts(contentArgs: contentArgs): Promise<Array<Post>> {
    return new Promise( async (resolve,reject) => {
        try{
            const data = await getContent(contentArgs);
            resolve(data);
        }catch(error){
            reject(error);
        }
    });


}

async function wpToStatic( contentArgs: contentArgs, filePaths: {
    wpJsonPath: string,
    markdownPath?: string
}): Promise<Array<savedFilePath>>{
    const {wpJsonPath} = filePaths;
    return new Promise( async (resolve,reject) => {
        try{
            const posts = await getWpPosts(contentArgs);
            if( posts.length ){
                Promise.all(posts.map((post: Post )=> {
                    return writeToJSON(post,wpJsonPath);               
                })).then((values: Array<savedFilePath>)=> {
                    console.log(values);
                    resolve(values)
                }).catch(e => reject(e));
            }

        }catch(err ){
            reject(err) 
        }
    });
}

module.exports = {
    getWpPosts,
    writeToJSON,
    wpToStatic
}