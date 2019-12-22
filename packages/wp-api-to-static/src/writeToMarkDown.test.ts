import writePostToMarkDown from './writeToMarkDown';
import { WpApiPost } from './wpTypes';
const fs = require('fs');

const page: WpApiPost = {
  id: 118,
  date: '2013-09-11T20:47:06',
  date_gmt: '2013-09-11T20:47:06',
  guid: { rendered: 'http://make.wordpress.org/?page_id=118' },
  modified: '2014-09-05T06:52:32',
  modified_gmt: '2014-09-05T06:52:32',
  slug: 'making-wordpress-new',
  status: 'publish',
  type: 'page',
  link: 'https://make.wordpress.org/making-wordpress-new/',
  title: { rendered: 'Making WordPress [new]' },
  content: {
    rendered:
      "<h1>Whether you&rsquo;re a budding developer or <span tabindex='0' class='glossary-item-container'>UX<span class='glossary-item-hidden-content'><span class='glossary-item-header'>UX</span> <span class='glossary-item-description'>UX is an acronym for User Experience - the way the user uses the UI. Think \u2018what they are doing\u2019 and less about how they do it.</span></span></span> pro, we&rsquo;re always looking for people to join up and help make WordPress even greater.</h1>\n<h5>This new site is a work in progress, and will be your source for learning how to get involved with WordPress.  It will house blogs for each contributor group, general news, and upcoming events.</h5>\n",
    protected: false,
  },
  excerpt: {
    rendered:
      '<p>Whether you&rsquo;re a budding developer or UXUX UX is an acronym for User Experience &#8211; the way the user uses the UI. Think \u2018what they are doing\u2019 and less about how they do it. pro, we&rsquo;re always looking for people to join up and help make WordPress even greater. This new site is a work [&hellip;]</p>\n',
    protected: false,
  },
  author: 7045072,
  featured_media: 119,
  parent: 0,
  menu_order: 0,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: [{ spay_email: '' }],
  _links: {
    self: [{ href: 'https://make.wordpress.org/wp-json/wp/v2/pages/118' }],
    collection: [{ href: 'https://make.wordpress.org/wp-json/wp/v2/pages' }],
    about: [{ href: 'https://make.wordpress.org/wp-json/wp/v2/types/page' }],
    author: [
      {
        embeddable: true,
        href: 'https://make.wordpress.org/wp-json/wp/v2/users/7045072',
      },
    ],
    replies: [
      {
        embeddable: true,
        href: 'https://make.wordpress.org/wp-json/wp/v2/comments?post=118',
      },
    ],
    'version-history': [
      {
        count: 1,
        href: 'https://make.wordpress.org/wp-json/wp/v2/pages/118/revisions',
      },
    ],
    'predecessor-version': [
      {
        id: 120,
        href:
          'https://make.wordpress.org/wp-json/wp/v2/pages/118/revisions/120',
      },
    ],
    'wp:featuredmedia': [
      {
        embeddable: true,
        href: 'https://make.wordpress.org/wp-json/wp/v2/media/119',
      },
    ],
    'wp:attachment': [
      { href: 'https://make.wordpress.org/wp-json/wp/v2/media?parent=118' },
    ],
    curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
  },
};

test('export', () => {
  expect(typeof writePostToMarkDown).toBe('function');
});

describe('write to markdown', () => {
  const markdownPath = require('path').join(
    __dirname,
    '../../../tests-write-here/test-markdown/'
  );
  const pagePath: string = markdownPath + `page/${page.slug}.md`;

  let fileString = '';
  let path: String = '';
  beforeAll(async () => {
    const r = await writePostToMarkDown(page, markdownPath);
    path = r.path;
    fileString = fs.readFileSync(path).toString();
  });

  afterAll(() => {
    if (fs.existsSync(pagePath)) {
      fs.unlinkSync(pagePath);
    }
  });

  it('Writes a post to markdown', async () => {
    expect(typeof path).toEqual('string');
    expect(path).toContain('/page/making-wordpress-new.md');
    expect(fs.existsSync(path)).toBe(true);
  });

  const { title, slug, date, modified } = page;
  it('Adds title to the front matter', async () => {
    expect(fileString).toContain(`title: '${title.rendered}'`);
  });
  it('Adds slug to the front matter', async () => {
    expect(fileString).toContain(`slug: ${slug}`);
  });
  it('Adds dates to the front matter', async () => {
    expect(fileString).toContain(`date: '${date}'`);
    expect(fileString).toContain(`modified: '${modified}'`);
  });
  it('Adds excerpt to the front matter', async () => {
    expect(fileString).toContain(`excerpt: `);
  });
});
