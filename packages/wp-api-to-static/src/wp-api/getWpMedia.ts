import { getWpClient } from '.';
import { WpApiMedia } from '../wpTypes';
import { contentArgs } from '../postsToStatic';
import { getItemArgs } from './types';

/**
 * Get a media library items of a WordPress site
 *
 *
 * @param args
 */
export async function getWpMediaItem(args: getItemArgs): Promise<WpApiMedia> {
  const { endpoint, id } = args;

  let wp = getWpClient(endpoint, {});
  return new Promise((resolve, reject) => {
    wp.media()
      .id(id)

      .get(function(err: Error, data: WpApiMedia) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}

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

  let wp = getWpClient(endpoint, {});
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
