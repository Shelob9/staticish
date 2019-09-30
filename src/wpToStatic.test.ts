describe( 'wpToStatic', () => {
    const fs = require( 'fs');
    const path = require( 'path');
    const {wpToStatic} = require( './wpToStatic');
    const jsonPath = __dirname + '/test-json/';
    const staticMarkdownpath = __dirname + '/test-markdown';
    beforeEach( () => {
        if (!fs.existsSync(staticMarkdownpath)) {
            fs.mkdirSync(staticMarkdownpath);
        }
        if (!fs.existsSync(staticMarkdownpath + '/page')) {
            fs.mkdirSync(staticMarkdownpath + '/page');
        }
        if (!fs.existsSync(staticMarkdownpath+ '/post')) {
            fs.mkdirSync(staticMarkdownpath + '/post');
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
       await deleteDir(staticMarkdownpath + '/post');
       await deleteDir(staticMarkdownpath + '/page');
    })
    
    const filePathArgs = {
        wpJsonPath: jsonPath,
        markdownPath: staticMarkdownpath,
    }
    test( 'Limits per page', async() => {
        const data = await wpToStatic({
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 2,
            page : 2,
        }, filePathArgs);
        expect( data.length ).toBe(2);
    });

    test( 'Writes the right content ', async() => {
        const data = await wpToStatic({
            endpoint: 'https://calderaforms.com/wp-json',
            perPage : 1,
            page : 2,
            postType: 'post'
        }, filePathArgs);
        expect( data.length ).toBe(1);
        const {title,markdownPath} = data[0];
        const file = fs.readFileSync(markdownPath);
        expect( file.toString() ).toContain('# ' + title);

    });
    
    
});
