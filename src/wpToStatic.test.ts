const wpToStatic = require( './wpToStatic');
test( 'Limits per page', async() => {
    const data = await wpToStatic( 'https://calderaforms.com/wp-json',5,1 );
    expect( data.length ).toBe(5);
});

test( 'Paginates', async() => {
    const dataPage2 = await wpToStatic( 'https://calderaforms.com/wp-json',5,2 );
    const dataPage1 = await wpToStatic( 'https://calderaforms.com/wp-json',5,1 );

    expect( dataPage1[0].title.rendered ).not.toEqual(dataPage2[0].title.rendered);
    expect( dataPage1[0].slug ).not.toEqual(dataPage2[0].slug);

})