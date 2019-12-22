const WPAPI = require('wpapi');

import { WpApiMedia } from '../wpTypes';
import { contentArgs } from '../postsToStatic';

/**
 * Get all media library items of a WordPress site
 *
 *
 * @param args
 */
export default async function getWpMedia(
  args: contentArgs
): Promise<Array<WpApiMedia>> {
  const { endpoint, perPage } = args;
  const page = args.page ? args.page : 1;

  let wp = new WPAPI({ endpoint: endpoint });
  return new Promise((resolve, reject) => {
    wp.media()
      .perPage(perPage)
      .page(page)
      .get(function(err: Error, data: Array<WpApiMedia>) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}
