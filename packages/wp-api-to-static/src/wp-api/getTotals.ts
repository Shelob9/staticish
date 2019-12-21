const superagent = require('superagent');

/**
 * Get total number of posts of a post type on a WordPress
 *
 * @param postType
 * @param apiUrl
 */
export const getTotal = async (
  postType: string,
  apiUrl: string
): Promise<{ total: number; perPage: number }> => {
  return new Promise((resolve, reject) => {
    return superagent
      .get(`${apiUrl}/wp/v2/${postType}`)
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
 * Get totals post count for all post types of a WordPress
 *
 * LOL, only posts and page type.
 *
 * @param apiUrl
 */
export const getTotals = async (
  apiUrl: string
): Promise<{ totalPosts: number; totalPages: number; perPage: number }> => {
  return new Promise((resolve, reject) => {
    Promise.all([getTotal('posts', apiUrl), getTotal('pages', apiUrl)])
      .then((r: Array<{ total: number; perPage: number }>) => {
        resolve({
          totalPosts: r[0].total,
          totalPages: r[1].total,
          perPage: r[0].perPage,
        });
      })
      .catch(e => reject(e));
  });
};
