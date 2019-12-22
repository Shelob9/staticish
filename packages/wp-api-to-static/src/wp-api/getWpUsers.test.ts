import getWpUsers from './getWpUsers';

describe('getWpUsers', () => {
  test('Limits per page', async () => {
    const data = await getWpUsers({
      endpoint: 'http://localhost:8121/wp-json',
      perPage: 3,
      page: 1,
      postType: 'user',
    });
    expect(data.length).toBe(3);
  });
});
