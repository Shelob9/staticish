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


type wpToStaticReturn = {
    path: String,
    id: Number,
    slug: String,
    type: String,
    title: String
}

function filePath( post: Post,path: String,extension: String){
    return `${path.replace(/\/$/, "")}/${post.type}/${post.id}.${extension}`
}
async function writeToJSON(post: Post,wpJsonPath: string ) : Promise<wpToStaticReturn>{

    return new Promise( async (resolve,reject) => {
        const path = filePath(post,wpJsonPath,'json');
        try{
            await fs.writeFileSync( path,JSON.stringify(post));
            resolve({
                path,
                id: post.id,
                slug: post.slug,
                type: post.type,
                title: post.title.rendered
            });
        }catch(error){
            reject(error);
        }
    });
}



async function writeToMarkDown(post: Post,markdownPath: string ) : Promise<wpToStaticReturn>{
    const htmlToMarkdown = require( './htmlToMarkdown');

    return new Promise( async (resolve,reject) => {
        const path = filePath(post,markdownPath,'.md');
        try{
            const html = await htmlToMarkdown(post.content.rendered);

            await fs.writeFileSync( path,html);
            resolve({
                path,
                id: post.id,
                slug: post.slug,
                type: post.type
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
    markdownPath: string
}): Promise<Array<wpToStaticReturn>>{
    const {wpJsonPath,markdownPath} = filePaths;
    return new Promise( async (resolve,reject) => {
        try{
            const posts = await getWpPosts(contentArgs);
            if( posts.length ){
                Promise.all(
                    [
                        ...posts.map((post: Post )=> {
                            return writeToJSON(post,wpJsonPath);               
                        }),
                        ...posts.map((post: Post )=> {
                            return writeToMarkDown(post,markdownPath);               
                        })
                    ]
                ).then((values: Array<wpToStaticReturn>)=> {
                    resolve(values)
                }).catch(e => reject(e));
            }

        }catch(err ){
            reject(err);
        }
    });
}

module.exports = {
    getWpPosts,
    writeToJSON,
    wpToStatic
}