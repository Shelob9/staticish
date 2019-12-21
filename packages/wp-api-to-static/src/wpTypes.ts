export interface ContentObject {
  rendered: string;
  protected?: Boolean;
  raw?: string;
}

/**
 * A WordPress post, as returned by the WordPress REST API
 */
export interface WpApiPost {
  id: Number;
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
  _links?: any;
  sticky?: boolean;
  format?: string;
  categories?: Array<number>;
  tags?: Array<number>;
}
