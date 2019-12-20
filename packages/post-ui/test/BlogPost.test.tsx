import React from 'react';
import BlogPost from '../src/BlogPost';
import { render } from '@testing-library/react';
import post from './test-data/post';
test('It once', () => {
  const { container } = render(<BlogPost post={post} />);
  expect(container).toMatchSnapshot();
});
