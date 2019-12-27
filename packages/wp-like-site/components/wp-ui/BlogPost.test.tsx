import React from 'react';
import BlogPost from './BlogPost';
import { render } from '@testing-library/react';
import wpFactory from './factories/wpFactory';
import author from './factories/test-data/author';
import mediaItem from './factories/test-data/media';
import tag from './factories/test-data/tag';
import post from './factories/test-data/post';

describe('Blog post with factory', () => {
  const getters = {
    author: () => author,
    featured: () => mediaItem,
    tags: () => {
      //@ts-ignore
      return [tag];
    },
    published: () => post.date,
  };
  //@ts-ignore
  const factory = wpFactory(getters);
  const wpPost = factory.convertPost(post);
  test('It matches snapshot', () => {
    const { container } = render(<BlogPost post={wpPost} />);
    expect(container).toMatchSnapshot();
  });
});
