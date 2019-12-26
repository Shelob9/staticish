import postsToStatic from './postsToStatic';

describe('postsToStatic', () => {
  const fs = require('fs');
  const path = require('path');
  const jsonPath = path.join(__dirname, '../../../tests-write-here/test-json/');
  const staticMarkdownpath = path.join(
    __dirname,
    '../../../tests-write-here/test-markdown/'
  );
  const types = ['post', 'page', 'tag', 'user', 'categories', 'media'];
  beforeEach(() => {
    if (!fs.existsSync(staticMarkdownpath)) {
      fs.mkdirSync(staticMarkdownpath);
    }

    types.forEach(type => {
      if (!fs.existsSync(staticMarkdownpath + type)) {
        fs.mkdirSync(staticMarkdownpath + type);
      }
      if (!fs.existsSync(jsonPath + type)) {
        fs.mkdirSync(jsonPath + type);
      }
    });
  });
  async function deleteDir(dir: string) {
    return fs.readdir(dir, (err: Error, files: Array<string>) => {
      if (err) throw err;
      files.forEach(file => {
        if ('.gitkeep' !== file) {
          fs.unlink(path.join(dir, file), (err: Error) => {
            if (err) throw err;
          });
        }
      });
    });
  }

  afterEach(async () => {
    types.forEach(async (type: string) => {
      await deleteDir(jsonPath + type);
      await deleteDir(staticMarkdownpath + type);
    });
  });
  const filePathArgs = {
    wpJsonPath: jsonPath,
    markdownPath: staticMarkdownpath,
  };
  test('Limits per page', async () => {
    const data = await postsToStatic(
      {
        endpoint: 'http://localhost:3100/wp-json',
        perPage: 2,
        page: 2,
        postType: 'post',
      },
      filePathArgs
    );
    expect(data.length).toBe(2);
  });

  test('Writes the right content with front matter', async () => {
    const data = await postsToStatic(
      {
        endpoint: 'http://localhost:3100/wp-json',
        perPage: 1,
        page: 2,
        postType: 'post',
      },
      filePathArgs
    );
    const { title, slug, markdownPath, jsonPath } = data[0];
    const file = fs.readFileSync(markdownPath);
    expect(file.toString()).toContain(`title:`);
    expect(file.toString()).toContain(title);
    expect(file.toString()).toContain('slug:');
    expect(file.toString()).toContain(slug);
    expect(file.toString()).toContain('---');
    expect(JSON.parse(fs.readFileSync(jsonPath)).title.rendered).toEqual(title);
  });
});
