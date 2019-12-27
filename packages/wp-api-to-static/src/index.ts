import postsToStatic from './postsToStatic';
import wpToStatic from './wpToStatic';
import htmlToMarkdown from './htmlToMarkdown';
import {
  getWpPost,
  getWpPosts,
  getWpUsers,
  getWpUser,
  getWpTerms,
  getWpMedia,
  getWpMediaItem,
} from './wp-api';

export {
  WpApiPost,
  ContentObject,
  WpApiMedia,
  WpApiUser,
  WpApiTaxonomy,
} from './wpTypes';

export {
  postsToStatic,
  wpToStatic,
  htmlToMarkdown,
  getWpPost,
  getWpPosts,
  getWpUsers,
  getWpUser,
  getWpTerms,
  getWpMedia,
  getWpMediaItem,
};
