import getWpPosts, { getWpPost } from './getWpPosts';
import getWpUsers, { getWpUser } from './getWpUsers';
import getWpTerms from './getWpTerms';
import getWpMedia, { getWpMediaItem } from './getWpMedia';

//@ts-ignore
import WPAPI from 'wpapi';

export const getWpClient = (
  endpoint: string,
  additionalArgs: any = {}
): WPAPI => {
  let wp = new WPAPI({ ...additionalArgs, endpoint: endpoint });
  return wp;
};

export {
  getWpPost,
  getWpPosts,
  getWpUsers,
  getWpUser,
  getWpTerms,
  getWpMedia,
  getWpMediaItem,
};
