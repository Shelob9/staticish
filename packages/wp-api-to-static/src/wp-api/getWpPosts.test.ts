import getWpPosts, { getWpPost } from './getWpPosts';

describe('getWpPosts', () => {
  test('Limits per page', async () => {
    const data = await getWpPosts({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'post',
    });
    expect(data.length).toBe(5);
  });

  test('Gets the right post type', async () => {
    const pages = await getWpPosts({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 2,
      postType: 'page',
    });
    const posts = await getWpPosts({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'post',
    });

    expect(posts[0].type).toEqual('post');
    expect(pages[0].type).toEqual('page');
  });

  test('Paginates', async () => {
    const dataPage2 = await getWpPosts({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 2,
      postType: 'post',
    });
    const dataPage1 = await getWpPosts({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'post',
    });

    expect(dataPage1[0].title.rendered).not.toEqual(
      dataPage2[0].title.rendered
    );
    expect(dataPage1[0].slug).not.toEqual(dataPage2[0].slug);
  });
});

describe('Single post', () => {
  it('gets a post', async () => {
    const endpoint = 'http://localhost:3100/wp-json';
    const posts = await getWpPosts({
      endpoint,
      perPage: 5,
      page: 1,
      postType: 'post',
    });
    const post = await getWpPost({ endpoint, id: posts[1].id }, 'post');
    expect(post.id).toEqual(posts[1].id);
    expect(post.title.rendered).toEqual(posts[1].title.rendered);
  });
});
