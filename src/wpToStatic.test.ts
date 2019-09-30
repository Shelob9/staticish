const wpToStatic = require( './wpToStatic');
test( 'Limits per page', async() => {
    const data = await wpToStatic( 'https://calderaforms.com/wp-json',5,1 );
    expect( data.length ).toBe(5);
});

test( 'Gets the right post type', async ( ) => {
    const pages = await wpToStatic( 'https://calderaforms.com/wp-json',5,2,'page' );
    const posts = await wpToStatic( 'https://calderaforms.com/wp-json',5,1 );

    expect( posts[0].type ).toEqual('post');
    expect( pages[0].type ).toEqual('page');


});

test( 'Paginates', async() => {
    const dataPage2 = await wpToStatic( 'https://calderaforms.com/wp-json',5,2 );
    const dataPage1 = await wpToStatic( 'https://calderaforms.com/wp-json',5,1 );

    expect( dataPage1[0].title.rendered ).not.toEqual(dataPage2[0].title.rendered);
    expect( dataPage1[0].slug ).not.toEqual(dataPage2[0].slug);

})