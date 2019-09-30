describe( 'wpToStatic', () => {
    const fs = require( 'fs');
    const path = require( 'path');
    const {wpToStatic} = require( './wpToStatic');
    const jsonPath = __dirname + '/test-json/';
    const markdownPath = __dirname + '/test-markdown';
    beforeEach( () => {
        if (!fs.existsSync(markdownPath)) {
            fs.mkdirSync(markdownPath);
        }
    });

    async function deleteDir(dir:string){
        return fs.readdir(dir, (err: Error, files: Array<string>) => {
            if (err) throw err;
            files.forEach( file => {
                if( '.gitkeep' !== file ){
                    fs.unlink(path.join(dir, file), (err:Error) => {
                        if (err) throw err;
                    });
                }
            })
            
        });
    }

    afterEach(async () => {
       await deleteDir(jsonPath + '/post');
       await deleteDir(jsonPath + '/page');
    })
    
    const filePathArgs = {
        wpJsonPath: jsonPath,
        markdownPath,
    }
    test( 'Limits per page', async() => {
        const data = await wpToStatic({
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 2,
            page : 1,
        }, filePathArgs);
        expect( data.length ).toBe(2);
    });

    test( 'Writes the right content ', async() => {
        const data = await wpToStatic({
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 1,
            page : 1,
            postType: 'page'
        }, filePathArgs);
        expect( data.length ).toBe(1);
        const {path,slug} = data[0];
        expect( typeof path).toBe( 'string');
        expect( JSON.parse( fs.readFileSync(path)).slug ).toEqual(slug);

    });
    
    
});
