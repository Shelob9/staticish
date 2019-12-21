import { postsToStatic, wpToStatic, getWpPosts, htmlToMarkdown } from './';

test('postsToStatic is a function', () => {
  expect(typeof postsToStatic).toBe('function');
});

test('wpToStatic is a function', () => {
  expect(typeof wpToStatic).toBe('function');
});

test('getWpPosts is a function', () => {
  expect(typeof getWpPosts).toBe('function');
});

test('htmlToMarkdown is a function', () => {
  expect(typeof htmlToMarkdown).toBe('function');
});
