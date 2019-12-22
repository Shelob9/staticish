const superagent = require('superagent');

/**
 * Get total number of posts or terms of a type on a WordPress
 *
 * @param contentType
 * @param apiUrl
 */
export const getTotal = async (
  contentType: string,
  apiUrl: string
): Promise<{ total: number; perPage: number }> => {
  return new Promise((resolve, reject) => {
    return superagent
      .get(`${apiUrl}/wp/v2/${contentType}`)
      .set('accept', 'json')
      .end(
        (
          err: Error,
          res: {
            headers: {
              'x-wp-total': number;
              'x-wp-totalpages': number;
            };
          }
        ) => {
          if (err) {
            reject(err);
          }
          resolve({
            total: res.headers['x-wp-totalpages'],
            perPage: res.headers['x-wp-total'],
          });
        }
      );
  });
};

/**
 * Get totals post count for all posts,pages,categories and tags
 *
 * LOL, only posts and page type.
 *
 * @param apiUrl
 */
export const getTotals = async (
  apiUrl: string
): Promise<{
  totalPosts: number;
  totalPages: number;
  totalTags: number;
  totalCategories: number;
  perPage: number;
}> => {
  return new Promise((resolve, reject) => {
    Promise.all([
      getTotal('posts', apiUrl),
      getTotal('pages', apiUrl),
      getTotal('tags', apiUrl),
      getTotal('categories', apiUrl),
    ])
      .then((r: Array<{ total: number; perPage: number }>) => {
        resolve({
          totalPosts: r[0].total,
          totalPages: r[1].total,
          totalTags: r[2].total,
          totalCategories: r[3].total,
          perPage: r[0].perPage,
        });
      })
      .catch(e => reject(e));
  });
};
