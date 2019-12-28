import {
  WpApiPost,
  WpApiMediaSizes,
  WpApiMedia,
  WpApiTaxonomy,
  WpApiUser,
} from './wpTypes';
import { writeReturn } from './postsToStatic';
import htmlToMarkdown from './htmlToMarkdown';
import { filePath, termFilePath, userFilePath } from './writeUtil';

const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Front matter for posts saved as markdown by this system
 */
type postFrontMatter = {
  title: string;
  slug: string;
  date: string;
  modified: string;
  excerpt: string;
};

/**
 * Front matter for media saved as markdown by this system
 */
type mediaFrontMatter = {
  title: string;
  slug: string;
  date: string;
  modified: string;
  alt: string;
  caption: string;
  description: string;
  media_type: string;
  mime_type: string;
  url: string;
  sizes: WpApiMediaSizes;
};

/**
 * Front matter for term saved as markdown by this system
 */
type termFrontMatter = {
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
};

/**
 * Create front matter for a media library item
 *
 * @param media
 */
function mediaToFrontMatterObject(media: WpApiMedia): mediaFrontMatter {
  return {
    title: media.title.rendered,
    slug: media.slug,
    date: media.date,
    modified: media.modified,
    alt: media.alt_text,
    caption: media.caption.rendered,
    description: media.description.rendered,
    url: media.source_url,
    sizes:
      media.media_details && media.media_details.sizes
        ? media.media_details.sizes
        : {},
    media_type: media.media_type,
    mime_type: media.mime_type,
  };
}

/**
 * Create front matter from a term.
 *
 * @param term
 */
function termToFrontMatterObject(term: WpApiTaxonomy): termFrontMatter {
  return {
    count: term.count,
    description: term.description,
    link: term.link,
    name: term.name,
    slug: term.slug,
    taxonomy: term.taxonomy,
  };
}

/**
 * Front matter for user saved as markdown by this system
 */
type userFrontMatter = {
  description: string;
  link: string;
  name: string;
  slug: string;
  url: string;
};

/**
 * Create front matter from a WordPress user.
 *
 * @param user
 */
function userToFrontMatter(user: WpApiUser): userFrontMatter {
  return {
    description: user.description,
    link: user.link,
    name: user.name,
    slug: user.slug,
    url: user.url,
  };
}
/**
 * Create front matter from a post.
 *
 * @param post
 */
function postToFrontMatterObject(post: WpApiPost): postFrontMatter {
  return {
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    modified: post.modified,
    excerpt: post.excerpt.rendered,
  };
}

/**
 * Write a WordPress user to markdown
 *
 * @param media
 * @param markdownPath
 */
export async function writeUserToMarkDown(
  user: WpApiUser,
  markdownPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = userFilePath(user, markdownPath, 'md');
    try {
      const string = `${yaml.safeDump(userToFrontMatter(user), {
        indent: 4,
      })}`;
      await fs.writeFileSync(path, string);
      resolve({
        path,
        id: user.id,
        slug: user.slug,
        type: 'user',
        title: user.name,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Write a WordPress term to markdown
 *
 * @param media
 * @param markdownPath
 */
export async function writeTermToMarkDown(
  term: WpApiTaxonomy,
  markdownPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = termFilePath(term, markdownPath, 'md');
    try {
      const string = `${yaml.safeDump(termToFrontMatterObject(term), {
        indent: 4,
      })}`;
      await fs.writeFileSync(path, string);
      resolve({
        path,
        id: term.id,
        slug: term.slug,
        type: term.taxonomy,
        title: term.name,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Write a WordPress media to markdown
 *
 * @param media
 * @param markdownPath
 */
export async function writeMediaToMarkDown(
  media: WpApiMedia,
  markdownPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(media, markdownPath, 'md');
    try {
      const string = `${yaml.safeDump(mediaToFrontMatterObject(media), {
        indent: 4,
      })}`;
      await fs.writeFileSync(path, string);
      resolve({
        path,
        id: media.id,
        slug: media.slug,
        type: media.type,
        title: media.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Write a WordPress post to markdown
 *
 * @param post
 * @param markdownPath
 */
export default async function writePostToMarkDown(
  post: WpApiPost,
  markdownPath: string
): Promise<writeReturn> {
  return new Promise(async (resolve, reject) => {
    const path = filePath(post, markdownPath, 'md');
    try {
      let html = await htmlToMarkdown(post.content.rendered);
      html =
        '---' +
        '\n' +
        `${yaml.safeDump(postToFrontMatterObject(post), { indent: 4 })}` +
        '---' +
        '\n\n' +
        html;
      await fs.writeFileSync(path, html);
      resolve({
        path,
        id: post.id,
        slug: post.slug,
        type: post.type,
        title: post.title.rendered,
      });
    } catch (error) {
      reject(error);
    }
  });
}
