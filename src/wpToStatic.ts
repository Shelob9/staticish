const WPAPI = require( 'wpapi' );
const fs = require( 'fs');
module.exports = async function wpToStatic(endpoint: String,perPage: Number,page: Number,postType: string = 'post'){
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
        
            wp.perPage( perPage ).page( page )
        
            .get(function(  err: Error, data: Array<{
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
        }> ) {
            if ( err ) {
                reject( err );
            }
        
            resolve(data);

        });
    });

}