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
  title: ContentObject;
  content: ContentObject;
  excerpt: ContentObject;
  author: Number;
  featured_media: Number;
  parent?: Number;
  menu_order?: Number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any;
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
