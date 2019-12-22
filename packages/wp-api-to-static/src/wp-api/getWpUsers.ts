const WPAPI = require('wpapi');

import { WpApiUser } from '../wpTypes';
import { contentArgs } from '../postsToStatic';

/**
 * Get all users of a WordPress site
 *
 *
 * @param args
 */
export default async function getWpUsers(
  args: contentArgs
): Promise<Array<WpApiUser>> {
  const { endpoint, perPage } = args;
  const page = args.page ? args.page : 1;

  let wp = new WPAPI({ endpoint: endpoint });
  return new Promise((resolve, reject) => {
    wp.users()
      .perPage(perPage)
      .page(page)
      .get(function(err: Error, data: Array<WpApiUser>) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}
