import getWpMedia from './getWpMedia';

describe('getWpUsers', () => {
  test('Limits per page', async () => {
    const data = await getWpMedia({
      endpoint: 'http://localhost:8121/wp-json',
      perPage: 2,
      page: 1,
      postType: 'media',
    });
    expect(data.length).toBe(2);
  });
});
