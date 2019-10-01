const WPAPI = require('wpapi');
const fs = require('fs');
export interface Post {
  content: {
    rendered: String;
  };
  title: {
    rendered: String;
  };
  slug: String;
  link: String;
  id: Number;
  type: String;
}

type contentArgs = {
  endpoint: String;
  perPage: Number;
  page: Number;
  postType: string;
};

type writeReturn = {
  path: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};

function filePath(post: Post, path: String, extension: String) {
  return `${path.replace(/\/$/, '')}/${post.type}/${
    'md' === extension ? post.slug : post.id
  }.${extension}`;
}
async function writeToJSON(
  post: Post,
  wpJsonPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(post, wpJsonPath, 'json');
    try {
      await fs.writeFileSync(path, JSON.stringify(post));
      resolve({
        path,
        id: post.id,
        slug: post.slug,
        type: post.type,
        title: post.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function writeToMarkDown(
  post: Post,
  markdownPath: string
): Promise<writeReturn> {
  const htmlToMarkdown = require('./htmlToMarkdown');

  return new Promise(async (resolve, reject) => {
    const path = filePath(post, markdownPath, 'md');
    try {
      let html = await htmlToMarkdown(post.content.rendered);
      html = `# ${post.title.rendered}` + html;
      await fs.writeFileSync(path, html);
      resolve({
        path,
        id: post.id,
        slug: post.slug,
        type: post.type,
        title: post.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function getWpPosts(args: contentArgs): Promise<Array<Post>> {
  const { endpoint, perPage } = args;
  const page = args.page ? args.page : 1;
  const postType = args.postType ? args.postType : 'post';
  let wp = new WPAPI({ endpoint: endpoint });
  return new Promise((resolve, reject) => {
    switch (postType) {
      case 'page':
        wp = wp.pages();
        break;
      default:
        wp = wp.posts();
        break;
    }

    wp.perPage(perPage)
      .page(page)

      .get(function(err: Error, data: Array<Post>) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}

type wpToStaticReturn = {
  markdownPath: String;
  jsonPath: String;
  id: Number;
  slug: String;
  type: String;
  title: String;
};

type filePathArgs = {
  wpJsonPath: string;
  markdownPath: string;
};

async function wpToStatic(
  contentArgs: contentArgs,
  filePaths: filePathArgs
): Promise<Array<wpToStaticReturn>> {
  const { wpJsonPath, markdownPath } = filePaths;

  async function postTypeToStatic(
    postType: string
  ): Promise<Array<wpToStaticReturn>> {
    return new Promise(async (resolve, reject) => {
      try {
        const posts = await getWpPosts({
          ...contentArgs,
          postType,
        });
        if (posts.length) {
          Promise.all(
            posts.map((post: Post) => {
              return writeToJSON(post, wpJsonPath).then((p: writeReturn) => {
                const jsonPath = p.path;
                return writeToMarkDown(post, markdownPath).then(
                  (p: writeReturn) => {
                    return {
                      markdownPath: p.path,
                      jsonPath: jsonPath,
                      id: post.id,
                      slug: post.slug,
                      type: post.type,
                      title: post.title.rendered,
                    };
                  }
                );
              });
            })
          )
            .then((values: Array<wpToStaticReturn>) => {
              resolve(values);
            })
            .catch(e => reject(e));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  return new Promise(async (resolve, reject) => {
    Promise.all([postTypeToStatic('post'), postTypeToStatic('page')])
      .then((values: Array<Array<wpToStaticReturn>>) => {
        let r: Array<wpToStaticReturn> = [];
        if (values[0].length) {
          values[0].forEach(v => r.push(v));
        }
        if (values[1].length) {
          values[1].forEach(v => r.push(v));
        }
        resolve(r);
      })
      .catch(e => reject(e));
  });
}

module.exports = {
  getWpPosts,
  writeToJSON,
  wpToStatic,
};
