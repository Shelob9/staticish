const WPAPI = require('wpapi');

import { WpApiPost } from '../wpTypes';
import { contentArgs } from '../postsToStatic';
import { getItemArgs } from './types';

/**
 * Get a single post from a WordPress site
 *
 * @param args
 */
export async function getWpPost(
  args: getItemArgs,
  postType: 'post' | 'page'
): Promise<WpApiPost> {
  const { endpoint, id } = args;
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

    wp.id(id).get(function(err: Error, data: WpApiPost) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

export default async function getWpPosts(
  args: contentArgs
): Promise<Array<WpApiPost>> {
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
      .get(function(err: Error, data: Array<WpApiPost>) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}
