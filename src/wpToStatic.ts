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


function jsonStaticFilePath( post: Post,wpJsonPath: string){
    return `${wpJsonPath}/${post.type}/${post.id}`
}
async function writeToJSON(post: Post,wpJsonPath: string ){
    return new Promise( async (resolve,reject) => {
        try{
           const result = fs.writeFileSync( jsonStaticFilePath(post,wpJsonPath) );
            resolve(result);
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

module.exports = {
    getWpPosts,
    writeToJSON
}