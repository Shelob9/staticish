import { WpApiPost } from '@staticish/wp-api-to-static';
import { WpPost, WpMedia } from 'src/wpTypes';
import { tag, PostAuthor, Image } from 'src/types';
import {
  WpApiUser,
  WpApiMedia,
  WpApiTaxonomy,
} from '@staticish/wp-api-to-static/dist/wpTypes';

/**
 * Getters for data not included in the WP-API post response
 */
type getters = {
  author: (post: WpApiPost) => WpApiUser;
  featured: (post: WpApiPost) => WpApiMedia;
  tags: (post: WpApiPost) => Array<WpApiTaxonomy>;
  published: (post: WpApiPost) => string;
};

export const wpTag = (fromApi: WpApiTaxonomy): tag => {
  return {
    label: fromApi.name,
    slug: fromApi.slug,
  };
};

export const wpTags = (fromApi: Array<WpApiTaxonomy>): Array<tag> => {
  return fromApi.map(wpTag);
};
const findAvatar = (fromApi: WpApiUser): Image => {
  const avatars = fromApi.avatar_urls;
  const sizes = Object.keys(avatars).map((key: string) => parseInt(key, 10));
  const url = avatars[Math.max(...sizes)];
  return {
    src: url,
    alt: `Avatar for ${fromApi.name}`,
  };
};

/**
 * Format featured image object
 * @param fromApi
 */
export const wpFeatured = (fromApi: WpApiMedia): WpMedia => {
  return {
    src: fromApi.source_url,
    alt: fromApi.alt_text,
    height: fromApi.media_details ? fromApi.media_details.height : undefined,
    width: fromApi.media_details ? fromApi.media_details.width : undefined,
  };
};
/**
 * Prepare author objects for this UI system
 *
 * @param fromApi
 */
export const wpAuthor = (fromApi: WpApiUser): PostAuthor => {
  return {
    name: fromApi.name,
    avatar: findAvatar(fromApi),
    description: fromApi.description,
    link: {
      href: fromApi.link,
      text: name,
    },
  };
};

/**
 * Prepare post objects for this UI system
 *
 * @param fromApi
 * @param getters
 */
const wpPost = (fromApi: WpApiPost, getters: getters): WpPost => {
  const { id, slug, content, title, excerpt } = fromApi;

  return {
    id: id.toString(),
    slug,
    title,
    content,
    excerpt,
    featured: wpFeatured(getters.featured(fromApi)),
    author: wpAuthor(getters.author(fromApi)),
    published: getters.published(fromApi),
    tags: wpTags(getters.tags(fromApi)),
  };
};

export default function(
  getters: getters
): {
  convertPost(fromApi: WpApiPost): WpPost;
} {
  return {
    convertPost(fromApi: WpApiPost): WpPost {
      return wpPost(fromApi, getters);
    },
  };
}
