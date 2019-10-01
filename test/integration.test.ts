


describe( 'wpToStatic', () => {
  const fs = require( 'fs');
  const path = require( 'path');
  const wpToStatic =require( '../src');
  const jsonPath = __dirname + '/test-json';
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
      if (!fs.existsSync(jsonPath)) {
        fs.mkdirSync(jsonPath);
    }
    if (!fs.existsSync(jsonPath + '/page')) {
        fs.mkdirSync(jsonPath + '/page');
    }
    if (!fs.existsSync(staticMarkdownpath+ '/post')) {
        fs.mkdirSync(jsonPath + '/post');
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
      expect( data.length )
      //2 posts and 2 pages
      .toBe(4);
  });

  test( 'Writes the right content ', async() => {
      const data = await wpToStatic({
          endpoint: 'https://calderaforms.com/wp-json',
          perPage : 1,
          page : 2,
      }, filePathArgs);
      const {title,markdownPath,jsonPath} = data[0];
      const file = fs.readFileSync(markdownPath);
      expect( file.toString() ).toContain('# ' + title);
      expect( JSON.parse( fs.readFileSync(jsonPath)).title.rendered ).toEqual(title);
  });
  
});

