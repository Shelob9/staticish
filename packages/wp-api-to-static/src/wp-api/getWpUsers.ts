const WPAPI = require('wpapi');

import { WpApiUser } from '../wpTypes';
import { contentArgs } from '../postsToStatic';
import { getItemArgs } from './types';

/**
 * Get a user of a WordPress site
 *
 * @param args
 */
export async function getWpUser(args: getItemArgs): Promise<WpApiUser> {
  const { endpoint, id } = args;
  let wp = new WPAPI({ endpoint: endpoint });
  return new Promise((resolve, reject) => {
    wp.users()
      .id(id)
      .get(function(err: Error, data: WpApiUser) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}

/**
 * Get all users of a WordPress site
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
