import getWpUsers, { getWpUser } from './getWpUsers';

describe('WP API Users', () => {
  test('Limits per page', async () => {
    const users = await getWpUsers({
      endpoint: 'http://localhost:8121/wp-json',
      perPage: 2,
      page: 1,
      postType: 'user',
    });
    expect(users.length).toBe(2);
  });

  test('Gets single users', async () => {
    const users = await getWpUsers({
      endpoint: 'http://localhost:8121/wp-json',
      perPage: 3,
      page: 1,
      postType: 'user',
    });
    const id = users[1].id;
    const user = await getWpUser({
      endpoint: 'http://localhost:8121/wp-json',
      id,
    });
    expect(users[1].slug).toEqual(user.slug);
    expect(users[1].name).toEqual(user.name);
  });
});
