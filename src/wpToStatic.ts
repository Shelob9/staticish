const WPAPI = require( 'wpapi' );
const fs = require( 'fs');
module.exports = async function wpToStatic(endpoint: String,perPage: Number,page: Number){
    const wp = new WPAPI({ endpoint: endpoint});
    return new Promise( (resolve,reject) => {
        wp
            .posts()
            .page(page)
            .perPage(perPage)
            .get(function(  err: Error, data: Array<{
            content: {
                rendered: String
            },
            title: {
                rendered: String
            },
            slug: String,
            link: String
            id: Number
        }> ) {
            if ( err ) {
                reject( err );
            }
        
            resolve(data);

        });
    });

}