const WPAPI = require('wpapi');
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




export default async function getWpPosts(args: contentArgs): Promise<Array<Post>> {
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
