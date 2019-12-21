import { postsToStatic, wpToStatic, getWpPosts, htmlToMarkdown } from './';

test('postsToStatic is a function', () => {
  expect(typeof postsToStatic).toBe('function');
});

test('wpToStatic is a function', () => {
  expect(typeof wpToStatic).toBe('function');
});

test('getWpPosts is a function', () => {
  expect(typeof getWpPosts).toBe('function');
});

test('htmlToMarkdown is a function', () => {
  expect(typeof htmlToMarkdown).toBe('function');
});

const fs = require('fs');
function copy(oldPath: string, newPath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);
    const rejector = (e: Error) => reject(e);
    readStream.on('error', rejector);
    writeStream.on('error', rejector);
    readStream.on('close', function() {
      fs.unlink(oldPath, rejector);
      resolve(true);
    });

    readStream.pipe(writeStream);
  });
}

const wpJsonPath = __dirname + '/content/json/';
const markdownPath = __dirname + '/content/static';

describe.skip('Generate sites', () => {
  beforeAll(() => {
    if (!fs.existsSync(__dirname + '/content')) {
      fs.mkdirSync(__dirname + '/content');
    }
    if (!fs.existsSync(__dirname + '/content/posts')) {
      fs.mkdirSync(__dirname + '/content/posts');
    }
    if (!fs.existsSync(__dirname + '/content/posts/pages')) {
      fs.mkdirSync(__dirname + '/content/posts/pages');
    }
    [markdownPath, wpJsonPath].forEach(path => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      ['post', 'page'].map(p => {
        const _p = path + '/' + p;
        if (!fs.existsSync(_p)) {
          fs.mkdirSync(_p);
        }
      });
    });
  });

  test.skip('JoshPress', () => {
    wpToStatic('https://joshpress.net/wp-json', {
      wpJsonPath,
      markdownPath,
    }).then(() => {
      const postDir = markdownPath + '/post';
      const pageDir = markdownPath + '/page';

      Promise.all([
        ...[
          copy(
            `${pageDir}/contact.md`,
            __dirname + '/content/posts/pages/contact.md'
          ),
          copy(
            `${pageDir}/contact.md`,
            __dirname + '/content/posts/pages/josh.md'
          ),
          copy(
            `${pageDir}/contact.md`,
            __dirname + '/content/posts/pages/rest-api.md'
          ),
          copy(
            `${pageDir}/contact.md`,
            __dirname + '/content/posts/pages/gutenberg.md'
          ),
          copy(
            `${pageDir}/contact.md`,
            __dirname + '/content/posts/pages/writing.md'
          ),
        ],
        ...fs.readdirSync(postDir).forEach((fileName: string) => {
          copy(
            `${postDir}/${fileName}`,
            __dirname + '/content/posts/' + fileName
          );
        }),
      ]).then(() => {
        var rimraf = require('rimraf');
        [markdownPath, wpJsonPath].forEach(path => {
          ['post', 'page'].map(p => {
            rimraf(`${path}/${p}`);
          });
          rimraf(path);
        });

        expect(true).toBe(true);
      });
    });
  });
});
