import getWpMedia, { getWpMediaItem } from './getWpMedia';

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

  test('single item', async () => {
    const medias = await getWpMedia({
      endpoint: 'http://localhost:8121/wp-json',
      perPage: 2,
      page: 1,
      postType: 'media',
    });

    const id = medias[1].id;
    const media = await getWpMediaItem({
      endpoint: 'http://localhost:8121/wp-json',
      id,
    });
    expect(media.id).toEqual(id);
    expect(media.link).toEqual(medias[1].link);
  });
});
