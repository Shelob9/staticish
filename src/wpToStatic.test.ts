const {getWpPosts} = require( './wpToStatic');
describe( 'getWpPosts', () => {

    test( 'Limits per page', async() => {
    
        const data = await getWpPosts({
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 5,
            page : 1,
        } );
        expect( data.length ).toBe(5);
    });
    
    test( 'Gets the right post type', async ( ) => {
        
        const pages = await getWpPosts( {
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 5,
            page : 2,
            postType: 'page'
        });
        const posts = await getWpPosts( {
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 5,
            page : 1,
        } );
    
        expect( posts[0].type ).toEqual('post');
        expect( pages[0].type ).toEqual('page');
    
    });
    
    test( 'Paginates', async() => {
        const dataPage2 = await getWpPosts( {
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 5,
            page : 2,
        });
        const dataPage1 = await getWpPosts( {
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 5,
            page : 1,
        });
    
        expect( dataPage1[0].title.rendered ).not.toEqual(dataPage2[0].title.rendered);
        expect( dataPage1[0].slug ).not.toEqual(dataPage2[0].slug);
    
    })
});
