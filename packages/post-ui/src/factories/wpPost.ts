import { WpApiPost } from '@staticish/wp-api-to-static';
import { WpPost, WpAuthor, WpMedia, WpTag } from 'src/wpTypes';

type getters = {
  author: (post: WpApiPost) => WpAuthor;
  featured: (post: WpApiPost) => WpMedia;
  tags: (post: WpApiPost) => Array<WpTag>;
};
const wpPost = (fromApi: WpApiPost, getters: getters): WpPost => {
  const { id, slug, content, title, excerpt, published } = fromApi;

  return {
    id,
    slug,
    title,
    content,
    excerpt,
    published,
    featured: getters.featured(fromApi),
    author: getters.author(fromApi),
    tags: getters.tags(fromApi),
  };
};
