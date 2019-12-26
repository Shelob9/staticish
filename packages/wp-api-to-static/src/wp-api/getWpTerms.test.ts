import getWpTerms from './getWpTerms';

describe('getWpTerms', () => {
  test('Limits per page', async () => {
    const data = await getWpTerms({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 3,
      page: 1,
      postType: 'tags',
    });
    expect(data.length).toBe(3);
  });

  test('Gets the right taxonomy type', async () => {
    const categories = await getWpTerms({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'categories',
    });

    expect(categories[0].taxonomy).toEqual('category');
  });

  test('Can call tags tags|tag|post_tag', async () => {
    const tag = await getWpTerms({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 2,
      page: 1,
      postType: 'tag',
    });
    const tags = await getWpTerms({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'tags',
    });

    const postTag = await getWpTerms({
      endpoint: 'http://localhost:3100/wp-json',
      perPage: 5,
      page: 1,
      postType: 'post_tag',
    });
    expect(tag[0].taxonomy).toEqual('post_tag');
    expect(tags[0].taxonomy).toEqual('post_tag');
    expect(postTag[0].taxonomy).toEqual('post_tag');
  });
});
