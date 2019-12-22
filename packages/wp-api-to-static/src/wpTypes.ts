export interface ContentObject {
  rendered: string;
  protected?: Boolean;
  raw?: string;
}

/**
 * The _links key of WP API response
 */
type WpApi_links = Array<{ [key: string]: { href: string } }>;

type id = number;

/**
 * A WordPress post, as returned by the WordPress REST API
 */
export interface WpApiPost {
  id: id;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  status: string;
  type: string;
  link: string;
  author: number;
  title: ContentObject;
  content: ContentObject;
  excerpt: ContentObject;
  comment_status: string;
  ping_status: string;
  meta: Array<any>;
  featured_media: number;
  parent?: number;
  menu_order?: number;
  template: string;
  slug: string;
  guid: { rendered: string };
  _links?: WpApi_links | any;
  sticky?: boolean;
  format?: string;
  categories?: Array<number>;
  tags?: Array<number>;
}

/**
 * A WordPress taxonomy, as returned by the WordPress REST API
 */
export interface WpApiTaxonomy {
  id: id;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta?: Array<any>;
  _links?: WpApi_links;
}

type avatars = { [key: number]: string };

/**
 * A WordPress user, as returned by the WordPress REST API
 */
export interface WpApiUser {
  avatar_urls: avatars;
  id: id;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
}

type sizes = {
  [key: string]: {
    width: number;
    height: number;
    mime_type: string;
    file: string;
    source_url: string;
  };
};

/**
 * An item in WordPress media library, as returned by the WordPress REST API
 */
export interface WpApiMedia {
  id: id;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  status: string;
  type: string;
  link: string;
  author: number;
  post?: number;
  title: ContentObject;
  description: ContentObject;
  caption: ContentObject;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_detials?: {
    width: number;
    height: number;
    file: string;
    sizes?: sizes;
  };
  image_meta?: any;
}
