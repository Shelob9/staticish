/**
 * One tag for a post/ status.
 */
export type tag = {
  label: string;
  slug: string;
};

/**
 * An image
 */
export interface Image {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export type link = {
  href: string;
  text: string;
  title?: string;
};

/**
 * A post's author
 */
export interface PostAuthor {
  name: string;
  avatar: Image;
  description?: string;
  link?: link;
}
