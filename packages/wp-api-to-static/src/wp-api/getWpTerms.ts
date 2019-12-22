const WPAPI = require('wpapi');

import { WpApiPost } from '../wpTypes';
import { contentArgs } from '../postsToStatic';

/**
 * Get all terms of one taxonomy
 *
 * Only supports categories and tags though
 *
 * @param args
 */
export default async function getWpTerms(
  args: contentArgs
): Promise<Array<WpApiPost>> {
  const { endpoint, perPage } = args;
  const page = args.page ? args.page : 1;
  const taxonomy = args.postType ? args.postType : 'tag';
  let wp = new WPAPI({ endpoint: endpoint });
  return new Promise((resolve, reject) => {
    switch (taxonomy) {
      case 'tag':
        wp = wp.tags();
        break;
      default:
        wp = wp.categories();
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
